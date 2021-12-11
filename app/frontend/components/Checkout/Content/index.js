import State from "./State";

import styles from "styles/Checkout/Content/Content.module.css"
import Basket from "./Basket";
import Summary from "./Summary";


// This function filters products with 0 stock
function calcQuantity(state) {
    return state.filter(item => item.stock > 0).map( item => item.quantity ).reduce( (prev,next) => prev + next )
}

// This function filters products with 0 stock
function calcTotalForProducts(state) {
    return state.filter(item => item.stock > 0).map( item => ({quantity:item.quantity, price:item.price}) ).reduce( (acc,item) => acc + item.quantity*item.price, 0) / 100
}

// This function filters products with 0 stock
function calcShipping(state) {
    return state.filter(item => item.stock > 0).map( item => item.shipping ).reduce( (prev,next) => prev + next ) / 100
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