import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";
import Fuse from 'fuse.js'

export default function useSellerProposals(seller_id) {
	const { fetchAuth: fetch } = useFetchAuth()
	const { isReady } = useRouter()
	const [proposals, setProposals] = useState(undefined)
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState(() => (str) => [])

	useEffect(async () => {
		if (!seller_id) return
		if (!isReady) return

		const json = await fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/seller/${seller_id}`).then(rep => rep.json())
		if (!json || !json.data) {
			setLoading(false)
			return
		}

		const props = await Promise.all(json.data.map(async proposal => {
			const product = await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${proposal.product_id}`)
				.then(rep => rep.json()).then(json => json.data)
			if (!product) return undefined

			const category = await fetch(`${process.env.NEXT_PUBLIC_HOST}/category/${product.category_id}`)
				.then(rep => rep.json()).then(json => json.data)
			if (!category) return undefined

			return {
				...proposal,
				product: { ...product, category: { ...category } },
			}
		}))

		setProposals(props.filter(prop => prop !== undefined))
		setLoading(false)
	}, [seller_id, isReady])

	useEffect(() => {
		if(!proposals) return
  	const fuse = new Fuse(proposals, {
  	  keys: ['product.name', 'product.category.name']
  	})
		setSearch(() => (str) => {
			if(str === "") return proposals
			return fuse.search(str).map(o => o.item)
		})
	}, proposals)

	return {
		proposals: proposals,
		search: search,
		loading: loading,
	}
}