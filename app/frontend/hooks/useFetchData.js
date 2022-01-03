import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "./useFetchAuth";

export default function useFetchData(url, params = {}) {
    const def = params.default ?? undefined
    const when = params.when ?? true
    const router = useRouter()
    const [data, setData] = useState(def)
    const [loading, setLoading] = useState(true)
    const { fetchAuth } = useFetchAuth()
    useEffect(async () => {
        if (!router.isReady || !when) return
        fetchAuth(url instanceof Function ? url() : url)
            .then(res => res.json())
            .then(json => json.data)
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, [router.isReady, when]);
    return { data: data, setData: setData, loading: loading, setLoading }
}