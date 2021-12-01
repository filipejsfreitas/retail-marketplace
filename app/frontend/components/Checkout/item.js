import { Container } from "react-bootstrap"
import Image from "next/dist/client/image"

import styles from "styles/Checkout/item.module.css"


const Item = (props) => {

    const quantity = props.quantity
    const price = props.quantity * props.price
    const title = props.title

    return (
        <Container className="d-flex my-3">
        <Container className={styles.itemImg}>
            <Image
                src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                alt=""
                width={110}
                height={110}
                layout="responsive"
                />
        </Container> 
        <div className={styles.productInfo}>
            <div className={styles.productTitle}> {`${title}`} </div>
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