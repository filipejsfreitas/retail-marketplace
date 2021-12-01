import { Container, ListGroup, Button, Table, Row, Col } from "react-bootstrap"
import React, {useEffect} from "react"
import Layout from "../components/Layout"
import styles from "../styles/product.module.css"
import RecomendedProducts from "../components/Carousel2"
import CarouselComponent from "../components/Carousel"
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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

function ProductPage(){

    const product = {
        "name": "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
        photo: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        stars: 3.5,
        price: 45.69,
        retailer: "Retailer name",
        reviews: 500,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
                     tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
                     s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
                     Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
                     tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
                     eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
                     n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
                     c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
                     finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
                     neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
                     d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.',
        seller: "Jorge Programador",
        info:{
            "Color": "Black",
            "Size": "200cm",
            "Weigth":"40 kg",
            "Cenas": "Nice2",
            "Cenas2": "Nice"
        }

    }
    useEffect(() => {
    },[])


    return(
        <Layout>

            <Row md={12}>
                <Col md={6}>
                    <Row>
                        <Container className={styles.carousel}> 
                            <CarouselComponent/>
                        </Container>
                        
                    </Row>
                    <Row>
                        <Container className={styles.carousel}>
                            <h3>Also Recomended:</h3>
                            <RecomendedProducts/>
                        </Container>
                    </Row>
                </Col>
                <Col md={6}>
                    <Container className={styles.panel}>
                        <div className={styles.productName}>{product.name}</div>
                        <Container>
                            <Row>
                                <Col>
                                    <span className={styles.stars}>{computeStars(product.stars)}</span> 
                                    <span className={styles.reviews}>{product.reviews} reviews</span>
                                    <div>Seller: {product.seller}</div>
                                    <div className={styles.price}>{product.price}€</div>
                                </Col>
                                <Col>
                                    <Button type="submit" variant="secundary" size="lg" className={styles.button}>
                                    ADD TO CARD
                                    </Button>
                                </Col>
                            </Row>
                        </Container>

                        <Container className={styles.table1}>
                            <Table responsive borderless >
                                <tbody>
                                    <th>
                                        {Object.keys(product.info).map((key, value) => (
                                          <tr key={value}>{key}</tr>
                                        ))}
                                    </th>
                                    <td>
                                        {Object.values(product.info).map((key, value) => (
                                            <tr key={value}>{key}</tr>
                                        ))}
                                    </td>
                                </tbody>
                            </Table>
                        </Container>

                        <div>{product.description}</div>
                    </Container> 
                </Col>   
            </Row>
    
            <Row md={12}>
                <Container className={styles.panel}>
                        <h1>Reviews</h1>
                </Container> 
            </Row>
            
        </Layout>
    )
}

export default ProductPage