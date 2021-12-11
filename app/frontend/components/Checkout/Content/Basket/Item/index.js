import Image from "next/image";

import styles from "styles/Checkout/Content/Basket/Item/Item.module.css"
import Seller from "components/Checkout/Content/Basket/Item/Seller";
import Status from "components/common/Status";
import { BsXLg } from "react-icons/bs";
import { useState, useEffect } from "react";

function adjustQuantity(id,quantity,[curentState,setCurrentState]){
    const newState = curentState.slice().map(item =>
        item.id === id ? { ...item, quantity: (quantity < 1 ? 1 : quantity) } : item
    );
    setCurrentState(newState)
}

function getQuantityOpts(max_quantity) {
    let opts = []
    for (let i = 1; i <= max_quantity; i++) {
        opts.push(i)
    }
    return opts
}

function deleteFromBasket(id,[curentState,setCurrentState]){
    setCurrentState(curentState.filter(item => item.id !== id))
}


export default function Item({id,basket,img,title,price,quantity,categorie,stock,seller,max_quantity}) {
    
    const [value,setValue] = useState(quantity)
    const [state,setState] = basket


    useEffect(()=> {
    }, [state]);

    if (stock <=0){
        return (<></>);
    
    }

    return (
        <div className={styles.box}>
            <div className={styles.itemImg}>
                <Image
                    src={`${img}`}
                    alt=""
                    width={130}
                    height={130}
                    layout="fixed"
                    />
            </div>
            <div className={styles.itemInfoWrapper}>
                <div className={styles.itemInfo}>
                    <div className={styles.title} >{`${title}`}</div>
                    <div className={styles.categorie}>{`${categorie}`}</div>
                    <div className={styles.soldBy}>Sold and shipped by:</div>
                    <Seller name={seller.name}/>
                    <span className={styles.status}><Status stock={stock}/></span>
                </div>
                <div className={styles.priceWrapper}>
                    <div className={styles.price}>
                        {`${(price/100)}`}€
                    </div>
                    <div className={styles.quantity}>
                        <button onClick={ () => deleteFromBasket(id,basket) }><BsXLg size={24} className={styles.cross}/></button>
                        <div>
                            <input className={styles.form_select} value={value} onChange={ (e) => {setValue(e.target.value);adjustQuantity(id,e.target.value,basket)}} type="text" name="product" list="productName"/>
                            <datalist id="productName">
                                {getQuantityOpts(max_quantity).map( x => (<option key={`key-${x}`} value={`${x}`}>{`${x}`}</option>) )}
                            </datalist>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}