import { Container } from "react-bootstrap";
import { BsPlusLg, BsDashLg } from "react-icons/bs"

import Image from "next/image";


import styles from 'styles/Checkout/Internals/Cart/Item.module.css'

function adjustQuantity(id,quantity,[curentState,setCurrentState]){
    const newState = curentState.slice().map(item =>
        item.id === id ? { ...item, quantity: (quantity <= 0 ? 0 : quantity) } : item
    );
    setCurrentState(newState)
}


export default function Checkout({id,img,desc,price,quantity,state}) {

    return (
        <Container className={styles.box}>
            <Container className={styles.itemImg}>
                <Image
                    src={img}
                    alt=""
                    width={140}
                    height={140}
                    layout="responsive"
                    />
            </Container> 
            <Container className={styles.itemDesc}>
                    {`${desc}`}
            </Container>
            <Container className={styles.itemPrice}>
                    {`${price}€`}
            </Container>
            <Container className={styles.itemQuantity}>
                    <div>
                        <button onClick={ () => adjustQuantity(id,quantity-1,state) }><BsDashLg size={10}/></button>
                            {`${quantity}`} 
                        <button onClick={ () => adjustQuantity(id,quantity+1,state) }><BsPlusLg size={10}/></button>
                    </div>
            </Container>
            <Container className={styles.itemTotal}>
                    {`${price*quantity}€`}
            </Container>
        </Container>
    )
}