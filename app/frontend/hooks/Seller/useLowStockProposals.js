import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useLowStockProposals() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState(undefined)
  const [lowStockProposals, setLowStockProposals] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/alerts`)
      .then(rep => rep.json())
      .then(alerts => {
        setLoading(false)
        setAlerts(alerts)
      })
  }, [isReady])

  useEffect(async () => {
    setLowStockProposals((alerts ?? {}).lowStockProposals)
  }, [alerts])


  return {
    alerts: alerts,
    loading: loading,
    lowStockProposals: lowStockProposals,
  }
}