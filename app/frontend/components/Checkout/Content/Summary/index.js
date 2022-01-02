import CartContext from "components/NavBar/Cart/context";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsBasket, BsCashCoin, BsTruck } from "react-icons/bs";

import styles from "styles/Checkout/Content/Summary/Summary.module.css";

export default function Summary({
  total,
  quantity,
  shippingCost,
  state,
  shippingTo,
}) {
  const router = useRouter();
  const [step, setStep] = state;

  const context = useContext(CartContext);

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false), router.push("account/order");
  };
  const handleShow = () => setShow(true);

  const validateBasket = () => {
    setStep(2);
  };

  const toPayment = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/cart/lock`, { method: "POST" }).then(
      () => setStep(3)
    );
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you bought a product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            GREAT!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
