import { useState } from "react";
import { Container } from "react-bootstrap";

import State from 'components/Checkout/Internals/State'
import OrderSummary from "components/Checkout/Internals/OrderSummary";
import Cart from 'components/Checkout/Internals/Cart/Cart'

import styles from 'styles/Checkout/Checkout.module.css'

const testBag = [
  {
    id:0,
    img: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    desc: "Very Nice and Long name",
    price: 10,
    quantity: 10,
  },
  {
    id:1,
    img: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    desc: "Very Nice and Long name",
    price: 10,
    quantity: 10,
  },
  {
    id:2,
    img: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    desc: "Very Nice and Long name",
    price: 10,
    quantity: 10,
  },
];

function calcQuantity(state) {
    return state.map( item => item.quantity ).reduce( (prev,next) => prev + next )
}

function calcTotal(state) {
    return state.map( item => ({quantity:item.quantity, price:item.price}) ).reduce( (acc,item) => acc + item.quantity*item.price, 0)
}


export default function Checkout(props) {

    // This state probably wil come from outside when this
    // the API supports the checkout functionality
    const [itemsInBag,setItemsInBag] = useState(testBag);
    
    const [step,setStep] = useState(1)

    return (
      <Container className={styles.box}>
        <Container className={styles.cart}>
          <State state={[step, setStep]} />
          <Cart state={[itemsInBag, setItemsInBag]} />
        </Container>
        <OrderSummary
          total={calcTotal(itemsInBag)}
          products={calcQuantity(itemsInBag)}
          className={styles.orderSum}
          state={[step, setStep]}
          bag={itemsInBag}
        />
      </Container>
    );
}