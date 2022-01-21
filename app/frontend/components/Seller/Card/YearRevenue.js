import SellerCard from "components/Seller/Card"
import { ResponsiveCalendar } from "@nivo/calendar"
import ResponsiveLine from 'components/Seller/ResponsiveLine'
import styles from "styles/Seller/index.module.css"

export default function YearRevenue({ revenueOverview, ...props }) {
  const data = revenueOverview ? revenueOverview.map(({ _id, count }) => ({
    y: count,
    x: new Date(_id.year, _id.month, _id.day).toLocaleDateString('en-GB').slice(0, 5),
  })) : []
  const curr = new Date()
  const data2 = [{"data":data}];
  console.log(data)
  return <SellerCard className={styles.panel_revenue_cal} title={"Yearly Sales Overview"} {...props}>
    <ResponsiveLine data={data2}></ResponsiveLine>
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