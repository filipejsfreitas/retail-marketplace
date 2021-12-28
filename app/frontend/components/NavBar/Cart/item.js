import { Container } from "react-bootstrap"
import { BsXLg } from "react-icons/bs"
import Image from "next/dist/client/image"

import styles from "styles/NavBar/Cart/item.module.css"


const Item = (props) => {

    const quantity = props.quantity
    const price = props.quantity * props.price
    const title = props.title

    return (
        <Container className="d-flex my-3">
            <Container className={styles.itemImg}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_HOST}/${props.image}`}
                    alt=""
                    width={110}
                    height={110}
                    layout="responsive"
                    />
            </Container> 
            <div className={styles.productInfo}>
                <div className="d-flex flex-row">
                    <div className={styles.productTitle}> {`${title}`} </div>
                    <BsXLg onClick={props.deleteHandler} size={14} className={styles.close}/>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <div className={styles.productQuantity}>
                        {`Quantity: ${quantity}`} 
                    </div>
                    <div className={styles.productPrice}>
                        {`${price}€`}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Item