import { Col, Container, Row , Button, ListGroup, ListGroupItem} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'
import { computeStars } from "components/Product/Product";
import Status from "components/common/Status";

const Proposals = () =>{ 
    
    const proposal = [
        {
        name : "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
        categorie : "Smartphones",
        photo: "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/8/8/8899.jpg",
        stars: 3.5,
        price: 45.69,
        stock : 20
        },
        {
        name : "Smartphone Xiaomi Poco X3 Pro 6.67 8GB/256GB Dual SIM Frost Blue",
        categorie : "Smartphones",
        photo: "https://static.pcdiga.com/media/catalog/product/cache/7800e686cb8ccc75494e29411e232323/s/l/slb_2.jpg",
        stars: 4,
        price: 45.69,
        stock : 0
        }
    ]
    
    
    return(
    <>
        <Row className={styles.proposalTitle}>
            Seller Proposals
        </Row>
        <Container className={styles.rootProposal}>
            <ListGroup>
            {Object.values(proposal).map((key, value) => (
                <ListGroupItem  key={value}>
                    <Row>
                        <div className={styles.list}>
                            <div className={styles.itemImg}>
                                <img
                                  className={styles.imgDiv}              
                                  src={key.photo}
                                />
                            </div >
                            <div className={styles.itemInfoWrapper}>
                                <div className={styles.itemInfo}>
                                    <div className={styles.title} >{key.name}</div>
                                    <div className={styles.categorie}>{key.categorie}</div>
                                    <div className={styles.stars}>{computeStars(key.stars)}</div>
                                    <span className={styles.status}><Status stock={key.stock}/></span>
                                </div>
                                <div className={styles.priceWrapper}>
                                    <div className={styles.price}>
                                        {key.price}€
                                    </div>
                                    <div className={styles.price}>
                                        <Button type="submit" variant="secundary"  className={styles.button}
                                         disabled={(key.stock <= 0 ? true: false)}>
                                            ADD TO CARD
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    </>
    )
}

export default Proposals;