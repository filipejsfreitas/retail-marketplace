import SellerCard from "../Card"
import styles from 'styles/Seller/proposal/comments.module.css'
import { ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { computeStars } from "components/Product/Product"

export default function Comments({ product, ...props }) {
    const comments = product.comments;

    return <SellerCard title={"Comments"}  className={styles.panel_details} {...props}>
            <div className={styles.list}>
                <ListGroup variant="flush">
                {comments.map((key, value) => (
                    <ListGroupItem key={value}>
                        <Row>
                            <div className={styles.rateLine} > 
                                <span className={styles.name}>{key.name}</span> 
                                <span className={styles.date}> {(key.date).slice(0,10)} </span> 
                                <span className={styles.rate}> {computeStars(key.score)}</span> 
                            </div>
                            <div className={styles.show}> 
                                {key.comment}
                            </div>
                        </Row>
                    </ListGroupItem>
                ))}
                </ListGroup>
            </div>
        </SellerCard>
  }