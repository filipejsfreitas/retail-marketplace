import { ResponsiveBar } from "@nivo/bar";
import SellerCard from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"

export default function RevenueOverviewBar({ revenueOverview, ...props }) {
  const data = revenueOverview ? revenueOverview.slice(-15).map(({ _id, count }) => ({
    date: new Date(_id.year, _id.month, _id.day).toLocaleDateString('en-GB'),
    revenue: count,
  })) : []

  return <SellerCard className={styles.panel_revenue} title={"Daily Sales"} {...props}>
    <ResponsiveBar
      data={data}
      keys={["revenue"]}
      indexBy="date"
      margin={{ top: 25, right: 25, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      label={d => `${d.value}€`}
    />
  </SellerCard>
}