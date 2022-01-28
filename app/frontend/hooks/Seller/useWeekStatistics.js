import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useWeekStatistics() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [salesStatistics, setSalesStatistics] = useState({ loading: true })
  const [orderStatistics, setOrderStatistics] = useState({ loading: true })

  useEffect(async () => {
    if (!isReady) return
    const [statsBackend, statsForecast] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/amountsSoldInLast7Days`)
        .then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/amountsSoldOverLastYear`)
        .then(r => r.json()),
    ])


    const currentWeekSales = (statsBackend.totals && statsForecast && {
      next: statsForecast.sales,
      current: statsBackend.totals.lastXDays,
      previous: statsBackend.totals.previousXDays,
      loading: false
    }) || { loading: false }
    setSalesStatistics(() => currentWeekSales)

    const currentWeekOrders = (statsBackend.counts && statsForecast && {
      next: statsForecast.orders,
      current: statsBackend.counts.lastXDays,
      previous: statsBackend.counts.previousXDays,
      loading: false
    }) || { loading: false }
    setOrderStatistics(() => currentWeekOrders)
  }, [isReady])

  return {
    orderStatistics,
    salesStatistics,
  }
}