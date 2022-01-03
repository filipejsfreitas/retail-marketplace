import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "./useFetchAuth";

export default function useFetchData(url, params = {}) {
    const def = params.default
    const when = "when" in params ? params.when : true
    const router = useRouter()
    const [data, setData] = useState(def)
    const [loading, setLoading] = useState(true)
    const { fetchAuth } = useFetchAuth()
    useEffect(async () => {
        console.debug(when)
        if (!router.isReady || !when || when == undefined) return
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