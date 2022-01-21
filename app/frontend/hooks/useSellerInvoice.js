import useFetchData from "hooks/useFetchData"
import { useState, useEffect } from "react"
import useFetchAuth from "./useFetchAuth"
import Fuse from 'fuse.js'

export default function useSellerInvoice() {
    const { fetchAuth: fetch } = useFetchAuth()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(0)
    const [search, setSearch] = useState(() => (str) => [])

    const sortData = d => {
        d.sort((x1, x2) => x1.date < x2.date)
        return d
    }

    const setInvoiceState = async (id, state) => {
        setPending(p => p + 1)
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/seller/invoice/${id}`, {
            method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: state })
        })
        if (rep.ok) {
            setData(d => sortData(d.map(v => v._id === id ? { ...v, state: state } : v)))
        }
        setPending(p => p - 1)
        return rep
    }

    useEffect(async () => {
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/seller/invoice`)
        if (!rep.ok){
            setLoading(false)
            return
        }
        const json = await rep.json()
        setData(() => sortData(json.data))
        setLoading(false)

    }, [])

    useEffect(() => {
        if (!data) return
        const fuse = new Fuse(data.map(d => {
            d.date_str = new Date(d.date).toLocaleDateString("en-GB")
            return d
        }), {
            keys: ['_id', 'state', 'date_str']
        })
        setSearch(() => (str) => {
            if (str === "") return data
            return fuse.search(str).map(o => o.item)
        })
    }, [data])

    return {
        invoices: data,
        pending: pending,
        loading: loading,
        search: search,
        setInvoiceState: setInvoiceState,
    }
}