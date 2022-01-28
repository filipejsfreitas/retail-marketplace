import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchData from "hooks/useFetchData";
import useFetchAuth from "./useFetchAuth";

export default function useAddress() {
    const { fetchAuth: fetch } = useFetchAuth()
    const { data: addresses, setData: setAddresses, loading, setLoading }
        = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/address/client`, { default: [] })

    const [pending, setPending] = useState(0)

    const wrapPending = fn => async (arg0, arg1) => {
        setPending(v => v + 1)
        const ret = await fn(arg0, arg1)
        setPending(v => v - 1)
        return ret
    }

    const remove = async (id) => {
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/address/${id}`, {
            method: 'DELETE',
        })
        if (rep.ok) {
            setAddresses(adds => adds.filter(add => add._id != id))
        }
        return rep
    }

    const add = async (address) => {
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/address/`, {
            method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        })
        if (rep.ok) {
            const json = await rep.json()
            setAddresses(adds => [...adds, json.data])
        }
        return rep
    }

    const edit = async (id, address) => {
        var rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/address/${id}`, {
            method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(address)
        })
        if (rep.ok) {
            const json = await rep.json()
            setAddresses(adds => [...adds.filter(add => add._id !== id), json.data])
        }
        return rep
    }

    return {
        addresses: addresses,
        remove: wrapPending(remove),
        add: wrapPending(add),
        edit: wrapPending(edit),
        loading: loading, // has completed initial loading
        pending: pending, // amount of pending add/remove requests
    }
}