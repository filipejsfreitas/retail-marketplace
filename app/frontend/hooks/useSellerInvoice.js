import useFetchData from "hooks/useFetchData"
import { useState } from "react"
import useFetchAuth from "./useFetchAuth"

export default function useSellerInvoice() {
    const { fetchAuth: fetch } = useFetchAuth()

    const { data, setData, loading } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/seller/invoice`, { default: {} })
    const [pending, setPending] = useState(0)

    const setInvoiceState = async (id, state) => {
        setPending(p => p + 1)
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/seller/invoice/${id}`, {
            method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: state })
        })
        if (rep.ok){
            setData(d => d.map(v => v._id === id ? { ...v, state: state } : v))
        }
        setPending(p => p - 1)
        return rep
    }

    return {
        invoices: data,
        pending: pending,
        loading: loading,
        setInvoiceState: setInvoiceState,
    }
}