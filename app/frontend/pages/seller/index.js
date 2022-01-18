import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchAuth from "hooks/useFetchAuth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import "react-multi-carousel/lib/styles.css";

import RecommendedCategories from "components/Seller/Card/RecommendedCategories"
import LowStockProposals from "components/Seller/Card/LowStockProposals"
import OrdersPie from "components/Seller/Card/OrderPie"
import DailyRevenue from "components/Seller/Card/DailyRevenue"
import YearRevenue from "components/Seller/Card/YearRevenue"
<<<<<<< HEAD
import { SimpleCard } from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"
import { BsTruck, BsBank, BsBoxSeam } from "react-icons/bs"

=======

import styles from "styles/Seller/index.module.css"
>>>>>>> 85d675e (refactor to files)

export default function Home() {
  const { fetchAuth: fetch } = useFetchAuth()
  const { isReady } = useRouter()
  const [panel, setPanel] = useState(undefined)

  useEffect(() => {
    if (!isReady) return
    fetch(`${process.env.NEXT_PUBLIC_HOST}/sellerPanel`)
      .then(rep => rep.json())
      .then(p => setPanel(p))
  }, [isReady])
  console.debug(panel)

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={panel === undefined}>
    {panel && <div className={styles.content}>
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={30} newvalue={40} description={"this week"} className={styles.simple_panel} icon={<BsTruck/>}/>
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={40} newvalue={30} description={"this week"} className={styles.simple_panel} icon={<BsBank/>}/>
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={33} newvalue={30} description={"this week"} className={styles.simple_panel} icon={<BsBoxSeam/>}/>
      <DailyRevenue revenueOverview={panel.revenueOverview} />
      <YearRevenue revenueOverview={panel.revenueOverview} />
      <OrdersPie ordersOverview={panel.ordersOverview} />
      <RecommendedCategories recommendedCategories={panel.recommendedCategories} />
      <LowStockProposals lowStockProposals={panel.alerts.lowStockProposals} />
    </div>}
  </Layout>
}