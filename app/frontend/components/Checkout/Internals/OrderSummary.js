import { Container, Button } from "react-bootstrap";

import styles from 'styles/Checkout/Internals/OrderSummary.module.css'

function handleFinish(){

}

export default function OrderSummary({products,total,state}) {
    const [step,setStep] = state
    

    return (
        <Container className={styles.box}>
           <div className={styles.summaryBox}>
               OrderSummary
                <div className={styles.summary}>
                    <div>
                        Products: <div>{` ${products}`}</div>
                    </div>
                    <div>
                        Total: <div>{` ${total}€`}</div>
                    </div>
                </div>
           </div>
           <div className={styles.buttonBox}>
               {step !== 1 && <Button onClick={ () => setStep((step-1)) } variant="secondary">Back</Button>}
               {step !== 3 && <Button onClick={ () => setStep((step+1)) }variant="secondary">Next</Button>}
               {step === 3 && <Button onclick={ () => handleFinish() } variant="secondary">Finish</Button>}
           </div>
        </Container>
    )
}