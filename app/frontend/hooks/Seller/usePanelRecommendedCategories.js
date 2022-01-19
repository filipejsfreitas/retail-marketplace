import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchAuth from "/hooks/useFetchAuth";

export default function usePanelRecommendedCategories() {
  const { isReady } = useRouter()
  const { fetchAuth: fetch } = useFetchAuth()

  const [loading, setLoading] = useState(true)
  const [recommendedCategories, setRecommendedCategories] = useState(undefined)

  useEffect(async () => {
    if (!isReady) return
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel/recommendCategories`)
      .then(rep => rep.json())
      .then(cats => {
        setLoading(false)
        if(cats && cats.categories)
          setRecommendedCategories(cats.categories)
      })
  }, [isReady])

  return {
    recommendedCategories: recommendedCategories,
    loading: loading,
  }
}