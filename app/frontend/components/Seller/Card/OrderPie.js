import ResponsivePie from 'components/Seller/ResponsivePie'
import SellerCard from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"

export default function OrdersPie({ ordersOverview }) {
  const data = [
    { "id": "processing", "label": "Processing", "value": ordersOverview.processing },
    { "id": "sent", "label": "Sent", "value": ordersOverview.sent },
  ]
  return <SellerCard className={styles.panel_orders} title={"Orders State"}>
    <ResponsivePie data={data} />
  </SellerCard>
}