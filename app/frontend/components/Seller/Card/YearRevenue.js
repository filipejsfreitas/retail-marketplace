import SellerCard from "components/Seller/Card"
import { ResponsiveCalendar } from "@nivo/calendar"
import ResponsiveLine from 'components/Seller/ResponsiveLine'
import styles from "styles/Seller/index.module.css"

export default function YearRevenue({ revenueOverview, ...props }) {
  const curr = new Date()
  const data = []
  for (var i = 0; i < 12; i++) {
    const date = new Date(curr)
    date.setMonth(date.getMonth() - 11 + i)
    data[i] = { y: 0, x: date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }), date: date }
  }

  (revenueOverview ?? []).forEach(({_id, count}) => {
    const acc = data.find(({ date }) => date.getFullYear() === _id.year && date.getMonth() + 1 === _id.month)
    if (acc)
      acc.y += count
  })

  return <SellerCard className={styles.panel_revenue_cal} title={"Yearly Sales Overview"} {...props}>
    <ResponsiveLine data={[{ id:"cenas", data: data }]}/>
  </SellerCard>
}

//<ResponsiveCalendar
    //  data={data}
    //  from={`${curr.getFullYear() - 1}`}
    //  to={`${curr.getFullYear()}`}
    //  emptyColor="#eeeeee"
    //  colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    //  margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    //  yearSpacing={40}
    //  monthBorderColor="#ffffff"
    //  dayBorderWidth={2}
    //  dayBorderColor="#ffffff"
    ///>