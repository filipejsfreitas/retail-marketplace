import { Container, Row, Col } from "react-bootstrap"
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";

import styles from "styles/product_preview.module.css"

function computeStars(stars) {
    var r = []
    for(var i=0; i<5; i++, stars--){
        if(stars <= 0) r[i] = <BsStar key={"star-" + i}/>
        else if(stars <= 0.5) r[i] = <BsStarHalf key={"star-" + i}/>
        else r[i] = <BsFillStarFill key={"star-" + i}/>
    }
    return <>
        {r}
    </>
}

export default function ProductPreview() {
    const product = {
        name: "A very nice and big product name",
        photo: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        stars: 3.5,
        price: 45.69,
        retailer: "Retailer name",
    }
    return <Container className={styles.frame}>
            <img className={styles.img} src={product.photo} alt="Product Photo" />
            <h6 className={styles.product_name}> {product.name} </h6>
            <h6 className={styles.product_name}> {product.price + "€"} </h6>
            <h6 className={styles.product_name}> {product.retailer} </h6>
            <Container className={styles.product_name}>{computeStars(product.stars)}</Container>
        </Container>
}