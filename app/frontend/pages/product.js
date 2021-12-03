import { Container, ListGroup, Button, Table, Row, Col, ListGroupItem } from "react-bootstrap"
import React, {useEffect} from "react"
import Layout from "../components/Layout"
import styles from 'styles/Product/product.module.css'
import RecomendedProducts from "../components/Product/Carousel2"
import CarouselComponent from "../components/Product/Carousel"
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Reviews from "../components/Product/Review"

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
        name : "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
        photo: ["https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"],
        stars: 3.5,
        price: 45.69,
        retailer: "Retailer name",
        nreviews: 500,
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
        },
        techDescription:[
            "Operador: Livre",
            "Dual SIM: Sim, Dual SIM (Nano-SIM, dual stand-by)",
            "Rede: 4G LTE",
            "Sistema Operativo: Android 11",
            "Chipset: Qualcomm Snapdragon 860 (7 nm)",
            "Processador: Octa-core (1x2.96 GHz Kryo 485 Gold & 3x2.42 GHz Kryo 485 Gold & 4x1.78 GHz Kryo 485 Silver)",
            "Gráficos: Adreno 640",
            "Armazenamento: 256GB (espaço utilizável será inferior) - expansível via microSD (utilizando um dos slots SIM)",
            "Memória RAM: 8GB",
            "Sensores: Impressão digital (montado na lateral), acelerômetro, giroscópio, proximidade, bússola",
            "Câmara Frontal: 20 MP, f/2.2, (wide), 1/3.4, 0.8µm",
            "Dimensões: 165.3 x 76.8 x 9.4 mm",
            "Peso: 215 g"
        ],

        reviews: [
            {
            title: "Very nice product",
            username: "Jorge Programador",
            stars: 4.5,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
            tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
            s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
            Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
            tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
            eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
            n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
            c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
            finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
            neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
            d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.'
            },
            {
                title: "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
                username: "Jorge Programador",
                stars: 1.5,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
                tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
                s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
                Donec nec consequat ex. Duis lacinia leo vitae risus hendrerit portti\
                tor eget eget urna. Ut dapibus enim eu massa dictum posuere. Nulla et\
                eros ligula. Nam eget turpis sapien. Mauris viverra tellus nulla, no\
                n sagittis turpis ultrices sit amet. Nullam tortor diam, elementum a\
                c erat vel, sodales hendrerit lectus. Mauris et tortor in enim volutpat\
                finibus. Integer semper eget tellus non pretium. Suspendisse hendrerit\
                neque vitae tortor consectetur interdum. Nullam vestibulum leo dolor, i\
                d gravida ante tempus et. Donec nec quam nec mi aliquet posuere.'
                },
                {
                    title: "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
                    username: "Jorge Programador",
                    stars: 5,
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobor\
                    tis ante quam, sit amet gravida tellus elementum ac. Duis non sodale\
                    s magna. Ut volutpat mollis eros, at aliquet nunc vulputate sit amet.\
                    Donec nec consequat ex.'
                    }
        ]

    }

    useEffect(() => {
    },[])


    return(
        <Layout>

            <Row md={12}>
                <Col md={6}>
                    <Row>
                        <Container className={styles.carousel}> 
                            <CarouselComponent props={product.photo}/>
                        </Container>
                        
                    </Row>
                    <Row>
                        <Container className={styles.carousel}>
                            <h3 className={styles.technicalDescription}>Also Recommended:</h3>
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
                                    <span className={styles.reviews}>{product.nreviews} reviews</span>
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
                        <div className={styles.description}>{product.description}</div>
                        <h3 className={styles.technicalDescription}>Technical Description</h3>
                            <ListGroup>
                                {Object.values(product.techDescription).map((key, value) => (
                                <ListGroupItem  key={value}><span className={styles.description2}>{key.split(":")[0]+":"}</span> <span>{key.split(":")[1]}</span></ListGroupItem>
                                ))}      
                            </ListGroup>
                    </Container> 
                </Col>   
            </Row>
    
            <Row md={12}>
                <h2 className={styles.reviewName}>Reviews</h2>
                <Container className={styles.panelReviews}>
                    <Reviews props1={product.reviews}/>
                </Container> 
            </Row>
            
        </Layout>
    )
}

export default ProductPage
