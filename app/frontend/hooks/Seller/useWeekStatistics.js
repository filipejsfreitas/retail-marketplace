import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useWeekStatistics() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [currentWeekSales, setCurrentWeekSales] = useState({ loading: true })
  const [currentWeekOrders, setCurrentWeekOrders] = useState({ loading: true })

  useEffect(async () => {
    if (!isReady) return
    const statsBackend = await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/amountsSoldInLast7Days`)
      .then(r => r.json())
    
    const currentWeekSales = (statsBackend.totals && {
      current: statsBackend.totals.lastXDays,
      previous: statsBackend.totals.previousXDays,
      loading: false
    }) || { loading: false }
    setCurrentWeekSales(() => currentWeekSales)

    const currentWeekOrders = (statsBackend.counts && {
      current: statsBackend.counts.lastXDays,
      previous: statsBackend.counts.previousXDays,
      loading: false
    }) || { loading: false }
    setCurrentWeekOrders(() => currentWeekOrders)
  }, [isReady])

  return {
    currentWeekOrders,
    currentWeekSales,
  }
}