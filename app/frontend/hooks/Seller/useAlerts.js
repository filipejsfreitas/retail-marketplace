import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function useAlerts() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState(undefined)
  const [activeAlerts, setActiveAlerts] = useState(undefined)

  const removeAlert = (_id) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/alerts/${_id}`, {
      method: 'DELETE'
    }).then(() => setAlerts(alerts => alerts.map(alert =>
      alert._id === _id ? { ...alert, dismissed: true } : alert)))
  }

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/alerts/today/`)
      .then(rep => rep.json())
      .then(alerts => {
        setAlerts(alerts.data)
      })
  }, [isReady])

  useEffect(() => {
    setActiveAlerts(() => alerts && alerts.filter(({ dismissed }) => dismissed === false))
    setLoading(false)
  }, [alerts])

  return {
    alerts: alerts,
    activeAlerts: activeAlerts,
    removeAlert: removeAlert,
    loading: loading,
  }
}