import useFetchData from "hooks/useFetchData"
import { useState } from "react"
import useFetchAuth from "./useFetchAuth"

export default function useClientInfo() {
    const { fetchAuth: fetch } = useFetchAuth()
    const { data, setData, loading } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/client`, { default: {} })
    const [pending, setPending] = useState(0)

    const edit = async (info) => {
        setPending(p => p + 1)
        const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/client`, {
            method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
        if (rep.ok) {
            setData(oldInfo => ({...oldInfo, ...info}))
        }
        setPending(p => p - 1)
        return rep
    }

    return {
        clientInfo: data,
        edit: edit,
        loading: loading,
        pending: pending,
    }
}