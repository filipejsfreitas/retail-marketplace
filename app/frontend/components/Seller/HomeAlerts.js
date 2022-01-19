import { BsFillExclamationTriangleFill, BsPlusSquare, BsXSquare } from "react-icons/bs";

import styles from "styles/Seller/index/alerts.module.css"

function AlertItem({ index, text }) {
  return <div className={`${styles.alerts_item} ${index % 2 === 0 ? styles.alerts_item_even : styles.alerts_item_odd}`}>
    {text}
    <div className={styles.alerts_buttons}>
      <BsPlusSquare />
      <BsXSquare />
    </div>
  </div>

}

export default function HomeAlerts({ }) {
  const alerts = [
    "HP Pavilon Gaming Desktop is low on stock! It has 8 items in stock but we expect the demand for tomorrow to be 20 items. Consider adding more products for sale!",
    "HP Pavilon Gaming Desktop is low on stock! It has 8 items in stock but we expect the demand for tomorrow to be 20 items. Consider adding more products for sale!",
    "HP Pavilon Gaming Desktop is low on stock! It has 8 items in stock but we expect the demand for tomorrow to be 20 items. Consider adding more products for sale!",
    "HP Pavilon Gaming Desktop is low on stock! It has 8 items in stock but we expect the demand for tomorrow to be 20 items. Consider adding more products for sale!",
  ]
  return <div className={styles.alerts}>
    <div className={styles.alerts_top}>
      <BsFillExclamationTriangleFill />
    </div>
    <div className={styles.alerts_content}>
      {alerts.map((alert, i) => <AlertItem key={i} text={alert} index={i} />)}
    </div>
    <div className={styles.alerts_bottom}></div>
  </div>
}