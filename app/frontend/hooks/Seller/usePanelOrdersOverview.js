import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function usePanelOrdersOverview() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [ordersOverview, setOrdersOverview] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/ordersOverview`)
      .then(rep => rep.json())
      .then(orders => {
        setLoading(false)
        if(orders && orders.processing && orders.sent)
          setOrdersOverview(orders)
      })
  }, [isReady])

  return {
    ordersOverview: ordersOverview,
    loading: loading,
  }
}