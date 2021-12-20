import Checkout from "components/Checkout";
import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

import styles from 'styles/checkout.module.css'

export default function Home() {

  return (
    <div className={styles.main}>
      <Checkout/>
    </div>
  )
}
