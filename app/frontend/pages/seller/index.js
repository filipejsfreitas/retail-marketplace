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
import usePanelRecommendedCategories from "hooks/Seller/usePanelRecommendedCategories"

import styles from "styles/Seller/index.module.css"
import useWeekStatistics from "hooks/Seller/useWeekStatistics"
import useLowStockProposals from "hooks/Seller/useLowStockProposals"
import useAlerts from "hooks/Seller/useAlerts"

export default function Home() {

  const { orderStatistics, salesStatistics } = useWeekStatistics()
  const { ordersOverview, loading: loadingOrdersOverview } = usePanelOrdersOverview()
  const { revenueOverview, loading: loadingRevenueOverview } = usePanelRevenueOverview()
  const { lowStockProposals, loading: loadingLowStockProposals } = useLowStockProposals()
  const { recommendedCategories, loading: loadingRecommendedCategories } = usePanelRecommendedCategories()
  const { activeAlerts, removeAlert, loading: loadingAlerts } = useAlerts()

  return <Layout sidebar={SELLER_SIDEBAR}>
    <div className={styles.content}>
      <SimpleCard titleRight={"SALES"} titleLeft={"SALES FORECAST"}
        descriptionLeft={"from last week"} descriptionRight={"forecasted next week"}
        valueToString={(v) => `${v}€`} icon={<BsTruck />}
        {...salesStatistics} className={styles.simple_panel_left} />
      <SimpleCard titleRight={"ORDERS"} titleLeft={"ORDERS FORECAST"}
        descriptionLeft={"from last week"} descriptionRight={"forecasted next week"}
        valueToString={v => v} icon={<BsBoxSeam />}
        {...orderStatistics} className={styles.simple_panel_right} />
      <HomeAlerts alerts={activeAlerts} removeAlert={removeAlert} loading={loadingAlerts}/>
      <DailyRevenue revenueOverview={revenueOverview} loading={loadingRevenueOverview} />
      <YearRevenue revenueOverview={revenueOverview} loading={loadingRevenueOverview} />
      <OrdersPie ordersOverview={ordersOverview} loading={loadingOrdersOverview} />
      <LowStockProposals lowStockProposals={lowStockProposals} loading={loadingLowStockProposals} />
      <RecommendedCategories recommendedCategories={recommendedCategories} loading={loadingRecommendedCategories} />
    </div>
  </Layout>
}
