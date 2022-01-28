import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";
import useSellerInvoice from "hooks/useSellerInvoice";

export default function usePanelRevenueOverview() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [revenueOverview, setRevenueOverview] = useState(undefined)
  const { invoices, loading: loadingInvoices } = useSellerInvoice()

  useEffect(async () => {
    if (!isReady || loadingInvoices) return
    const overview = {}
    invoices.forEach(({ date, items }) => {
      const dateKey = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
      items.forEach(({ price, quantity, shipping }) => {
        overview[dateKey] = (overview[dateKey] ?? 0) + (price + shipping) * quantity
      })
    });
    const revenueOverview = Object.entries(overview).map(([date, count]) => {
      const [month, day, year] = date.split("/")
      return {
        _id: { year: parseInt(year), month: parseInt(month), day: parseInt(day) },
        count: count,
      }
    })
    setLoading(false)
    setRevenueOverview(revenueOverview)
    //await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/revenueOverview`)
    //  .then(rep => rep.json())
    //  .then(revenue => {
    //    setLoading(false)
    //    setRevenueOverview(revenue)
    //  })
  }, [isReady, loadingInvoices])

  return {
    revenueOverview: revenueOverview,
    loading: loading,
  }
}