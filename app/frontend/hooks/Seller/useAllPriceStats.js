import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useAllPriceStats() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [priceStats, setPriceStats] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/priceStats`)
      .then(rep => rep.json())
      .then(stats => {
        setLoading(false)
        setPriceStats(stats)
      })
  }, [isReady])

  return {
    priceStats: priceStats,
    loading: loading,
  }
}