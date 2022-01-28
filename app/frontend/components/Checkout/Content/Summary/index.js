import CartContext from "components/NavBar/Cart/context";
import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { BsBasket, BsCashCoin, BsTruck } from "react-icons/bs";
import useFetchAuth from "hooks/useFetchAuth"

import SucessModal from "./SucessModal";

import styles from "styles/Checkout/Content/Summary/Summary.module.css";
import NoAddressModal from "./NoAddressModal";

export default function Summary({
  total,
  quantity,
  shippingCost,
  state,
  shippingTo,
}) {
  const { fetchAuth: fetch } = useFetchAuth()
  const [step, setStep] = state;

  const context = useContext(CartContext);

  // Modal
  // 1 - success
  // 0 - Hidden
  // -1 - Error
  const [show, setShow] = useState(0);

  const handleShow = () => setShow(1);

  const validateBasket = () => {
    setStep(2);
  };

  const toPayment = () => {
    if (shippingTo) {
      fetch(`${process.env.NEXT_PUBLIC_HOST}/cart/lock`, {
        method: "POST",
      }).then(() => setStep(3));
    }
    else {
      setShow(-1)
    }
  };

  const pay = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/cart/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address_id: shippingTo,
      }),
    }).then(() => {
      context.reloadCart();
      handleShow();
    });
  };

  const products_plus_shipping = Number(total) + Number(shippingCost);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={step === 3 ? styles.title_payment : styles.title}>
          Summary
        </div>
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
            <div>{`${shippingCost}`}€</div>
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
            <div className={styles.total}>
              {`${products_plus_shipping.toFixed(2)}`}€
            </div>
          </div>
          {step === 1 && (
            <Button onClick={() => validateBasket()} variant="secondary">
              Validate the basket
            </Button>
          )}
          {step === 2 && (
            <Button onClick={() => toPayment()} variant="secondary">
              Proceed to payment
            </Button>
          )}
          {step === 3 && (
            <Button onClick={() => pay()} variant="secondary">
              Finish Payment
            </Button>
          )}
        </div>
      </div>
      <SucessModal state={[show, setShow]}/>
      <NoAddressModal state={[show, setShow]}/>
    </>
  );
}
