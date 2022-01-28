import { Col, Container, Row , Button, ListGroup} from "react-bootstrap";
import styles from 'styles/infoseller.module.css'

const Proposals = ({info}) =>{ 
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
                {info}
            </ListGroup>
        </Container>
    </>
    )
}

export default Proposals;