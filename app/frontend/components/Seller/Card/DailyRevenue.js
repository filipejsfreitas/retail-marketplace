import { ResponsiveBar } from "@nivo/bar";
import SellerCard from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"

export default function RevenueOverviewBar({ revenueOverview, ...props }) {
  const currDate = new Date()
  const data = []
  for (var i = 0; i < 7; i++) {
    const date = new Date(new Date(currDate).setDate(currDate.getDate() - 6 + i))
    const { count } = (revenueOverview ?? [])
      .find(({ _id }) => _id.year === date.getFullYear() && _id.month === date.getMonth() + 1 && _id.day === date.getDate()) ??
      { count: 0 }
    data[i] = { date: date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }), revenue: count }
  }

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