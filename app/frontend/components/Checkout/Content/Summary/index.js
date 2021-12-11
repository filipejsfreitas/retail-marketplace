import { Button } from "react-bootstrap";
import { BsBasket, BsCashCoin, BsTruck } from "react-icons/bs";

import styles from "styles/Checkout/Content/Summary/Summary.module.css";

export default function Summary({total,quantity,shipping}) {
  const products_plus_shipping = Number(total) + Number(shipping);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Summary</div>
      <div className={styles.box}>
        <div>
          <div>
            <BsBasket className={styles.basket} size={24} />
            <span className={styles.left}>
              Basket
              <span className={styles.grey}>&nbsp;{`(${quantity})`}</span>
            </span>
          </div>
          <div>{`${total}`}€</div>
        </div>
        <div className={styles.line}></div>
        <div>
          <div>
            <BsTruck size={24} />
            <span className={styles.left}>
              Shipping
              <span className={styles.smallerGrey}>&nbsp;(estimative)</span>
            </span>
          </div>
          <div>{`${shipping}`}€</div>
        </div>
        <div className={styles.line}></div>
        <div>
          <div>
            <BsCashCoin size={24} />
            <span className={styles.left}>
              Total
              <span className={styles.smallerGrey}>&nbsp;(after tax)</span>
            </span>
          </div>
          <div className={styles.total}>{`${(products_plus_shipping).toFixed(2)}`}€</div>
        </div>
        <Button variant="secondary">Validate the basket</Button>
      </div>
    </div>
  );
}
