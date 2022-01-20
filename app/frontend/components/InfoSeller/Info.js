import { Col, Container, Row , Button} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'
import { computeStars } from "components/Product/Product";
import RateSeller from "./RateSeller";
import { useState, useContext } from "react";
import TokenContext from 'components/Context/TokenContext'
import { UserType } from "hooks/useToken";

const Info = ({seller, token, proposals}) =>{ 
    
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    const [modalShow, setModalShow] = useState(false);
    const { userType} = useContext(TokenContext)
    
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
                    <p className={styles.lines}><span className={styles.subTitle}>Seller Email: <span className={styles.infos}>{seller.customerServiceEmail}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's email: <span className={styles.infos}>{seller.customerServiceEmail}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Customer service's phone: <span className={styles.infos}>{seller.companyPhoneNumber}</span></span></p>
                </Col>
                <Col md={4}>
                    <p className={styles.lines}><span className={styles.subTitle}>Number reviews: <span className={styles.infos}>{seller.numberRating} </span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Number proposals: <span className={styles.infos}>{proposals}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Rating: <span className={styles.infosStar}>{computeStars(seller.rating)}</span></span></p>
                    <p className={styles.lines}><span className={styles.subTitle}>Tax Identification Number: <span className={styles.infos}>{seller.tin}</span></span></p>
                    <Button 
                        className={styles.buttonRate} 
                        variant="secundary" 
                        type="submit" 
                        onClick={() => setModalShow(true)}
                        disabled={!token ||  userType != UserType.CLIENT}
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