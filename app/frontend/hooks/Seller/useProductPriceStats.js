import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useProductPriceStats(product_id) {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [priceStats, setPriceStats] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/priceStats/${product_id}`)
      .then(rep => rep.json())
      .then(stats => {
        setLoading(false)
        if(stats && stats.data)
            setPriceStats(stats.data)
      })
  }, [isReady])

  return {
    priceStats: priceStats,
    loading: loading,
  }
}