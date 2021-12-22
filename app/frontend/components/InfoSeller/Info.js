import { Col, Container, Row , Button} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'
import { computeStars } from "components/Product/Product";

const Info = () =>{ 
    
    const seller = { 
        id: "ola",
        nome : "Global Mi Store",
        photo : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        companyName : "Global Mi Store",
        sellerEmail: "LoremipsumLoremipsum@Loremipsum.com",
        tin : 12345678,
        companyEmail : "LoremipsumLoremipsum@Loremipsum.com",
        nReviews : 300,
        rating : 3,
        nProducts : 43,
        dateReg : "10/10/2010",
        companyPhone : 12345667,
        sellerPhone : 12345667
    }
    
    return(
    <>
        <Row className={styles.nameSeller}>
            {seller.nome}
        </Row>
        <Container className={styles.box}>
            <Row md={12}>
                <Col md={2}>
                    <div className={styles.recommended}>
                        <img
                          className={styles.recommendedPhoto}              
                          src={seller.photo}
                        />
                    </div >
                </Col >
                <Col md={6}>
                    <p className={styles.lines}><span className={styles.subTitle}>Company name: <span className={styles.infos}>{seller.companyName}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Seller Email: <span className={styles.infos}>{seller.sellerEmail}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's email: <span className={styles.infos}>{seller.companyEmail}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's phone: <span className={styles.infos}>{seller.companyPhone}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Tax Identification Number: <span className={styles.infos}>{seller.tin}</span></span></p>
                </Col>
                <Col md={4}>
                    <p className={styles.lines}><span className={styles.subTitle}>Number reviews: <span className={styles.infos}>{seller.nReviews} </span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Number products: <span className={styles.infos}>{seller.nProducts}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Rating: <span className={styles.infosStar}>{computeStars(seller.rating)}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Register date: <span className={styles.infos}>{seller.dateReg}</span></span></p>
                    <Button className={styles.buttonRate} variant="secundary" type="submit"> Rate Seller </Button>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Info;