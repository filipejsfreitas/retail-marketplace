import ResponsivePie from 'components/Seller/ResponsivePie'
import SellerCard from "components/Seller/Card"

import styles from "styles/Seller/index.module.css"

export default function OrdersPie({ ordersOverview, ...props }) {
  const data = ordersOverview ? [
    { "id": "processing", "label": "Processing", "value": ordersOverview.processing },
    { "id": "sent", "label": "Sent", "value": ordersOverview.sent },
  ] : []
  return <SellerCard className={styles.panel_orders} title={"Orders State"} {...props}>
    <ResponsivePie data={data} />
  </SellerCard>
}