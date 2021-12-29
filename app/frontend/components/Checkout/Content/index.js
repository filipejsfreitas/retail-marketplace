import { useState } from "react";

import State from "./State";
import styles from "styles/Checkout/Content/Content.module.css"
import Basket from "./Basket";
import Summary from "./Summary";
import Addreses from "./Addresses";


// This function filters products with 0 stock and returns the quantity of products in the cart
function calcQuantity(state) {
    if ( state.length == 0)
        return 0;
    return state.filter(item => item.stock > 0).map( item => item.quantity ).reduce( (prev,next) => prev + next )
}

// This function filters products with 0 stock and returns total price of the products in the cart
function calcTotalForProducts(state) {
    if ( state.length == 0)
        return 0;
    return state.filter(item => item.stock > 0).map( item => ({quantity:item.quantity, price:item.price}) ).reduce( (acc,item) => acc + item.quantity*item.price, 0)
}

// This function filters products with 0 stock and returns shipping costs
function calcShipping(state) {
    if ( state.length == 0)
        return 0;
    return state.filter(item => item.stock > 0).map( item => item.shipping ).reduce( (prev,next) => prev + next )
}


export default function Content(props) {

    const [step,setStep] = props.step
    const [address,setAddress] = useState(undefined);

    return (
        <div className="page_content">
            <div className={styles.top}>
                <div className={styles.edge}>Checkout</div>
                <State state={props.step}/>
                <div className={styles.edge}></div>
            </div>
            <div className={step === 3 ? styles.bot_payment : styles.bot}>
                {step === 1 && <Basket quantity={calcQuantity(props.basket[0])} basket={props.basket}/>}
                {step === 2 && <Addreses state={[address,setAddress]}/>}
                { (step === 1 || step === 2 )&& <div className={styles.margin}></div>}
                <Summary state={props.step} total={calcTotalForProducts(props.basket[0])} quantity={calcQuantity(props.basket[0])} shippingCost={calcShipping(props.basket[0])} shippingTo={address}/>
            </div>
        </div>
    )
}