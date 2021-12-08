import { useState } from "react";

import TopBanner from "./TopBanner";
import Content from "./Content";

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
    
    const step = useState(1)

    return (
      <div className={styles.bg}>
        <TopBanner/>
        <Content step={step} />
      </div>
    );
}