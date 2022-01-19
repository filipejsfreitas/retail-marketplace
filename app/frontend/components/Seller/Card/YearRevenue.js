import SellerCard from "components/Seller/Card"
import { ResponsiveCalendar } from "@nivo/calendar"

import styles from "styles/Seller/index.module.css"

export default function YearRevenue({ revenueOverview }) {
  const data = revenueOverview.map(({ _id, count }) => ({
    value: count,
    day: new Date(_id.year, _id.month, _id.day).toJSON().slice(0, 10),
  }))
  const curr = new Date()

  return <SellerCard className={styles.panel_revenue_cal} title={"Yearly Sales Overview"}>
    <ResponsiveCalendar
      data={data}
      from={`${curr.getFullYear()-1}`}
      to={`${curr.getFullYear()}`}
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  </SellerCard>
}