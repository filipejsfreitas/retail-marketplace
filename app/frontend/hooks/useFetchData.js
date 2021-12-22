import { useState, useEffect } from "react";

export default function useGetData(url, def) {
    const [data, setData] = useState(def)
    const [loading, setLoading] = useState(true)
    useEffect(async () => {
        fetch(url).then(res => res.json())
            .then(json => json.data)
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }, []);
    return [[data, loading], setData]
}