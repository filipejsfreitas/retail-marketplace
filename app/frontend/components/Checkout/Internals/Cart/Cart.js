import { Container } from "react-bootstrap";

import Item from 'components/Checkout/Internals/Cart/Item'
import styles from 'styles/Checkout/Internals/Cart/Cart.module.css'

export default function Checkout({state}) {

    const [bag_state,set_bagState] = state

    return (
      <Container className={styles.box}>
        <Container className={styles.title}>
          <div className={styles.titleProd}>Product</div>
          <div className={styles.titleDesc}>Description</div>
          <div className={styles.titlePrice}>Price</div>
          <div className={styles.titleQuant}>Quantity</div>
          <div className={styles.titleTotal}>Total</div>
        </Container>
        <Container className={styles.items}>
          {bag_state.map(({ id, img, desc, price, quantity }) => (
            <Item
              state={[bag_state,set_bagState]}
              key={id}
              id={id}
              img={img}
              desc={desc}
              price={price}
              quantity={quantity}
            />
          ))}
        </Container>
      </Container>
    );
}