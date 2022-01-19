import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function usePanelRevenueOverview() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [revenueOverview, setRevenueOverview] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/revenueOverview`)
      .then(rep => rep.json())
      .then(revenue => {
        setLoading(false)
        setRevenueOverview(revenue)
      })
  }, [isReady])

  return {
    revenueOverview: revenueOverview,
    loading: loading,
  }
}