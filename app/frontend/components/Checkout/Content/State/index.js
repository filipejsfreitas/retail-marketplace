import { Container } from "react-bootstrap";

import styles from 'styles/Checkout/Content/State/State.module.css'

export default function State({state}) {
    const [step,setStep] = state

    switch(step) {
        case (3):
            return (
                <Container className={styles.outside}>
                    <div className={styles.box}>
                        <span onClick={() => (setStep(1))} className={styles.wrapper}>
                            <span className={styles.step}>1</span>
                            <span className={styles.basket}> Basket </span>
                        </span>
                        <span onClick={() => setStep(2)} className={styles.wrapper}>
                            <span className={styles.step}>2</span>
                            <span className={styles.ship}> Shipping </span>
                        </span>
                        <span className={styles.wrapper}>
                            <span className={styles.step}>3</span>
                            <span className={`${styles.pay} ${styles.selected}`}> Payment </span>
                        </span>
                    </div>
                    <div className={styles.lines}>
                        <div className={styles.stepLine}></div>
                        <div className={styles.stepLine}></div>
                        <div id={styles.state2} className={styles.stepLine}></div>
                        <div className={styles.stepLine}></div>
                    </div>
                </Container>
            )
        case (2):
            return (
                <Container className={styles.outside}>
                    <div className={styles.box}>
                        <span onClick={() => setStep(1)} className={styles.wrapper}>
                            <span className={styles.step}>1</span>
                            <span className={styles.basket}> Basket </span>
                        </span>
                        <span className={styles.wrapper}>
                            <span className={styles.step}>2</span>
                            <span className={`${styles.ship} ${styles.selected}`}> Shipping </span>
                        </span>
                        <span className={styles.wrapper}>
                            <span className={styles.notStep}>3</span>
                            <span className={styles.pay}> Payment </span>
                        </span>
                    </div>
                    <div className={styles.lines}>
                        <div className={styles.stepLine}></div>
                        <div className={styles.stepLine}></div>
                        <div id={styles.state2} className={styles.stepLine}></div>
                        <div className={styles.notStepLine}></div>
                    </div>
                </Container>
            )
        default:
            return (
                <Container className={styles.outside}>
                    <div className={styles.box}>
                        <span className={styles.wrapper}>
                            <span className={styles.step}>1</span>
                            <span className={`${styles.basket} ${styles.selected}`}> Basket </span>
                        </span>
                        <span onClick={() => setStep(2)} className={styles.wrapper}>
                            <span className={styles.notStep}>2</span>
                            <span className={styles.ship}> Shipping </span>
                        </span>
                        <span className={styles.wrapper}>
                            <span className={styles.notStep}>3</span>
                            <span className={styles.pay}> Payment </span>
                        </span>
                    </div>
                    <div className={styles.lines}>
                        <div className={styles.stepLine}></div>
                        <div className={styles.notStepLine}></div>
                        <div id={styles.state2} className={styles.notStepLine}></div>
                        <div className={styles.notStepLine}></div>
                    </div>
                </Container>
            )
    }
}