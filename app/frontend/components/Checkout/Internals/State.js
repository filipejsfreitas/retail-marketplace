import { Container } from "react-bootstrap";

import styles from 'styles/Checkout/Internals/State.module.css'

export default function Checkout({state}) {
    const [step,setStep] = state

    return (
        <Container className={styles.box}>
            <div onClick={() => setStep(1)} className={`${styles.step} ${ step==1 && styles.selected}`}>1.Cart</div>
            <div onClick={() => setStep(2)} className={`${styles.step} ${ step==2 && styles.selected}`}>2.Shipping</div>
            <div onClick={() => setStep(3)} className={`${styles.step} ${ step==3 && styles.selected}`}>3.Payment</div>
        </Container>
    )
}