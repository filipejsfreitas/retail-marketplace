import Image from "next/image";

import styles from "styles/Checkout/Content/Basket/Item/Item.module.css"
import Seller from "components/Checkout/Content/Basket/Item/Seller";
import Status from "components/common/Status";
import { BsXLg } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import CartContext from "components/NavBar/Cart/context";

function getQuantityOpts(max_quantity) {
    let opts = []
    for (let i = 1; i <= max_quantity; i++) {
        opts.push(i)
    }
    return opts
}


export default function Item({id,basket,img,title,price,quantity,category,stock,seller,max_quantity}) {

    const cartContext = useContext(CartContext)
    
    const [value,setValue] = useState(quantity)
    const [state,_] = basket


    useEffect(()=> {
    }, [state]);

    if (stock <=0){
        return (<></>);
    
    }

    return (
        <div className={styles.box}>
            <div className={styles.itemImg}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_HOST}/${img}`}
                    alt=""
                    width={130}
                    height={130}
                    layout="fixed"
                    />
            </div>
            <div className={styles.itemInfoWrapper}>
                <div className={styles.itemInfo}>
                    <div className={styles.title} >{`${title}`}</div>
                    <div className={styles.category}>{`${category}`}</div>
                    <div className={styles.soldBy}>Sold and shipped by:</div>
                    <Seller id={seller.id} name={seller.name} rating={seller.rating}/>
                    <span className={styles.status}><Status stock={stock}/></span>
                </div>
                <div className={styles.priceWrapper}>
                    <div className={styles.price}>
                        {`${(price)}`}€
                    </div>
                    <div className={styles.quantity}>
                        <button onClick={ () => cartContext.deleteItem(id) }><BsXLg size={24} className={styles.cross}/></button>
                        <div>
                            <input className={styles.form_select} value={value} onChange={ (e) => {setValue(e.target.value);cartContext.updateItem(id,Number(e.target.value))}} type="text" name="product" list={`options-${id}`}/>
                            <datalist id={`options-${id}`}>
                                {getQuantityOpts(max_quantity).map( x => (<option key={`key-${id}-${x}`} value={`${x}`}>{`${x}`}</option>) )}
                            </datalist>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}