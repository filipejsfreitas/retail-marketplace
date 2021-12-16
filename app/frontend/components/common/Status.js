import { BsCheckLg, BsExclamationCircleFill, BsXCircleFill } from "react-icons/bs"

import styles from "styles/Checkout/Content/Basket/Item/Status.module.css"


function computeStatus(stock) {
  switch (true) {
    case stock <= 10 && stock > 0:
      return (
        <span className={styles.lastUnits}>
          <BsExclamationCircleFill size={16} />
          <span className={styles.lastUnitsTxt}>Last units</span>
        </span>
      );
    case stock <= 0:
      return (
        <span className={styles.outOfStock}>
          <BsXCircleFill size={16} />
          <span className={styles.outOfStockTxt}>Out of Stock</span>
        </span>
      );
    default:
      return (
        <span className={styles.available}>
          <BsCheckLg size={16} />
          <span className={styles.availableTxt}>Available</span>
        </span>
      );
  }
}



export default function Status({stock}) {
    return (
        computeStatus(stock)
    )
}