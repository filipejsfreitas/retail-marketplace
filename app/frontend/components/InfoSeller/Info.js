import { Col, Container, Row , Button} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'
import { computeStars } from "components/Product/Product";
import RateSeller from "./RateSeller";
import { useState } from "react";

const Info = ({seller, token}) =>{ 
    
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    const [modalShow, setModalShow] = useState(false);
    //const seller = { 
    //    id: "ola",
    //    nome : "Global Mi Store",
    //    photo : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    //    companyName : "Global Mi Store",
    //    sellerEmail: "LoremipsumLoremipsum@Loremipsum.com",
    //    tin : 12345678,
    //    companyEmail : "LoremipsumLoremipsum@Loremipsum.com",
    //    nReviews : 300,
    //    rating : 3,
    //    nProducts : 43,
    //    dateReg : "10/10/2010",
    //    companyPhone : 12345667,
    //    sellerPhone : 12345667
    //}
    
    return(  
    <>
        <Row className={styles.nameSeller}>
            {seller.firstName} {seller.lastName}
        </Row>
        <Container className={styles.box}>
            <Row md={12}>
                <Col md={2}>
                    <div className={styles.recommended}>
                        <img
                            className={styles.recommendedPhoto}              
                            src={ (seller.images && seller.images[0])  ? seller.images[0] : fallback}
                        />
                    </div >
                </Col >
                <Col md={6}>
                    <p className={styles.lines}><span className={styles.subTitle}>Company name: <span className={styles.infos}>{seller.companyName}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Seller Email: <span className={styles.infos}>{213}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's email: <span className={styles.infos}>{seller.customerServiceEmail}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's phone: <span className={styles.infos}>{seller.companyPhoneNumber}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Tax Identification Number: <span className={styles.infos}>{seller.tin}</span></span></p>
                </Col>
                <Col md={4}>
                    <p className={styles.lines}><span className={styles.subTitle}>Number reviews: <span className={styles.infos}>{seller.numberRating} </span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Number products: <span className={styles.infos}>{100}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Rating: <span className={styles.infosStar}>{computeStars(seller.rating)}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Register date: <span className={styles.infos}>{"4/5/2022"}</span></span></p>
                    <Button 
                        className={styles.buttonRate} 
                        variant="secundary" 
                        type="submit" 
                        onClick={() => setModalShow(true)}
                        disabled={!token}
                        >
                        Rate Seller 
                    </Button>
                    <RateSeller
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      sellerId={seller._id}
                    />
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default Info;