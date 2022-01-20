import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";
import Fuse from 'fuse.js'

function flattenCategories(categories, acc = undefined) {
    if (acc === undefined) {
        acc = new Object()
        flattenCategories(categories, acc)
        return acc
    }
    categories.forEach(category => {
        acc[category._id] = category
        flattenCategories(category.children, acc)
    })
}

export default function useSellerProposals() {
    const { fetchAuth: fetch } = useFetchAuth()
    const { isReady } = useRouter()

    const [products, setProducts] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(() => (str) => [])

    useEffect(async () => {
        if (!isReady) return

        const [prods, cats] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_HOST}/product/list`).then(rep => rep.json()).then(j => j.data),
            fetch(`${process.env.NEXT_PUBLIC_HOST}/category`).then(rep => rep.json()).then(j => j.data),
        ])
        if (!prods || !cats) {
            setLoading(false)
            return
        }
        const flatCats = flattenCategories(cats)
        prods.forEach(prod => {
            prod["category"] = flatCats[prod.category_id]
        })
        setProducts(prods)
        setLoading(false)
    }, [isReady])

    useEffect(() => {
        if (!products) return
        const fuse = new Fuse(products, {
            keys: ['name', 'category.name']
        })
        setSearch(() => (str) => {
            if (str === "") return products
            return fuse.search(str).map(o => o.item)
        })
    }, [products])

    return {
        products: products,
        search: search,
        loading: loading,
    }
}