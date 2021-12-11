import State from "./State";

import styles from "styles/Checkout/Content/Content.module.css"
import Basket from "./Basket";
import Summary from "./Summary";

function calcQuantity(state) {
    return state.map( item => item.quantity ).reduce( (prev,next) => prev + next )
}

function calcTotalForProducts(state) {
    return state.map( item => ({quantity:item.quantity, price:item.price}) ).reduce( (acc,item) => acc + item.quantity*item.price, 0) / 100
}

function calcShipping(state) {
    return state.map( item => item.shipping ).reduce( (prev,next) => prev + next ) / 100
}


export default function Content(props) {



    return (
        <div className="page_content">
            <div className={styles.top}>
                <div className={styles.edge}>Checkout</div>
                <State state={props.step}/>
                <div className={styles.edge}></div>
            </div>
            <div className={styles.bot}>
                <Basket quantity={calcQuantity(props.basket[0])} basket={props.basket}/>
                <div className={styles.margin}></div>
                <Summary total={calcTotalForProducts(props.basket[0])} quantity={calcQuantity(props.basket[0])} shipping={calcShipping(props.basket[0])}/>
            </div>
        </div>
    )
}