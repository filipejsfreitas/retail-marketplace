import { useState } from "react";

import TopBanner from "./TopBanner";
import Content from "./Content";

import styles from 'styles/Checkout/Checkout.module.css'

const testBag = [
  {
    id:0,
    img: "https://images.samsung.com/is/image/samsung/p6pim/pt/qe85q60aauxxc/gallery/pt-qled-tv-qe85q60aauxxc-front-black-thumb-457270227?$480_480_PNG$",
    title: "Pokémon Sword - Nintendo Switch",
    categorie: "Nintendo Switch",
    price: 5999,
    quantity: 1,
    max_quantity: 30,
    stock: 0,
    shipping: 499,
    seller: {
      name: "Nintendo",
      rating: 3
    }
  },
  {
    id:1,
    img: "https://images.samsung.com/is/image/samsung/p6pim/pt/qe85q60aauxxc/gallery/pt-qled-tv-qe85q60aauxxc-front-black-thumb-457270227?$480_480_PNG$",
    title: "Console Nintendo Switch Neon",
    categorie: "Console - Nintendo",
    price: 27999,
    quantity: 2,
    max_quantity: 10,
    stock: 11,
    shipping: 0,
    seller: {
      name: "Worten",
      rating: 2.3
    }
  },
  {
    id:2,
    img: "https://images.samsung.com/is/image/samsung/p6pim/pt/qe85q60aauxxc/gallery/pt-qled-tv-qe85q60aauxxc-front-black-thumb-457270227?$480_480_PNG$",
    title: "Smart Tv Samsung QLED UHD 4K 85Q60A 216cm",
    categorie: "4K - TVs - Samsung",
    price: 224999,
    quantity: 1,
    max_quantity: 2,
    stock: 1,
    shipping: 0,
    seller: {
      name: "Samsung",
      rating: 4.1
    }
  },
  {
    id:3,
    img: "https://images.samsung.com/is/image/samsung/p6pim/pt/qe85q60aauxxc/gallery/pt-qled-tv-qe85q60aauxxc-front-black-thumb-457270227?$480_480_PNG$",
    title: "Pokémon Sword - Nintendo Switch",
    categorie: "Nintendo Switch",
    price: 5999,
    quantity: 1,
    max_quantity: 30,
    stock: 30,
    shipping: 499,
    seller: {
      name: "Nintendo",
      rating: 3
    }
  }
];

export default function Checkout(props) {

    // This state probably wil come from outside when this
    // the API supports the checkout functionality
    const basket = useState(testBag);
    
    const step = useState(1)

    return (
      <div className={styles.bg}>
        <TopBanner/>
        <Content step={step} basket={basket} />
      </div>
    );
}