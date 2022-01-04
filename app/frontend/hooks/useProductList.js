import { useState, useEffect } from "react";
import useFetchAuth from "./useFetchAuth";

export default function useAddress(params = {}) {
    const { fetchAuth: fetch } = useFetchAuth()
    const [reload, setReload] = useState(params.skipInit)
    const [products, setProducts] = useState("default" in params ? params.default : [])
    const [query, setQuery] = useState({ limit: 25 })

    const modifyQuery = (params) => {
        setQuery(query => {
            var ret = { ...query }
            Object.entries(params).forEach(([key, value]) => {
                if (value === undefined) delete ret[key]
                else ret[key] = value
            })
            return ret
        })
        setReload(true)
    }

    useEffect(async () => {
        if (!reload) return

        const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/product/list`)
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]))

        fetch(url).then(rep => rep.json()).then(json => {
            setProducts(json.data)
            setReload(false)
        })
    }, [reload])

    return {
        products: products,
        loading: reload,
        query: query,
        modifyQuery: modifyQuery,
    }
}
