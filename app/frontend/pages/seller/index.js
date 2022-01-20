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
import { SimpleCard } from "components/Seller/Card"
import HomeAlerts from "components/Seller/HomeAlerts"

import { BsTruck, BsBank, BsBoxSeam } from "react-icons/bs"
import usePanelOrdersOverview from "hooks/Seller/usePanelOrdersOverview"
import usePanelRevenueOverview from "hooks/Seller/usePanelRevenueOverview"
import usePanelAlerts from "hooks/Seller/usePanelAlerts"
import usePanelRecommendedCategories from "hooks/Seller/usePanelRecommendedCategories"
import useAllPriceStats from "hooks/Seller/useAllPriceStats"

import styles from "styles/Seller/index.module.css"

export default function Home() {

  const { ordersOverview, loading: loadingOrdersOverview } = usePanelOrdersOverview()
  const { revenueOverview, loading: loadingRevenueOverview } = usePanelRevenueOverview()
  const { lowStockProposals, loading: loadingAlerts } = usePanelAlerts()
  const { recommendedCategories, loading: loadingRecommendedCategories } = usePanelRecommendedCategories()

  return <Layout sidebar={SELLER_SIDEBAR}>
    <div className={styles.content}>
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={30} newvalue={40} description={"this week"} className={styles.simple_panel} icon={<BsTruck />} />
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={40} newvalue={30} description={"this week"} className={styles.simple_panel} icon={<BsBank />} />
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={31} newvalue={30} description={"this week"} className={styles.simple_panel} icon={<BsBoxSeam />} />
      <SimpleCard title={"SALES"} value={"30.234€"} oldvalue={31} newvalue={30} description={"this week"} className={styles.simple_panel} icon={<BsBoxSeam />} />
      <HomeAlerts/>
      <DailyRevenue revenueOverview={revenueOverview} loading={loadingRevenueOverview} />
      <YearRevenue revenueOverview={revenueOverview} loading={loadingRevenueOverview} />
      <OrdersPie ordersOverview={ordersOverview} loading={loadingOrdersOverview} />
      <LowStockProposals lowStockProposals={lowStockProposals} loading={loadingAlerts} />
      <RecommendedCategories recommendedCategories={recommendedCategories} loading={loadingRecommendedCategories} />
    </div>
  </Layout>
}