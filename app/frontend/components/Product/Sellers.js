import React from "react";
import {Row ,Col,ListGroup, ListGroupItem} from 'react-bootstrap';
import styles from "styles/Product/sellers\.module.css"
import { computeStars } from "components/Product/Product";


export default function Reviews() {
    const sellers=[
        {
            name: "HouseMarket.pt",
            rating : 3,
            price : 10,
            shipping : 4,
            stock: 10
            
        },
        {
            name: "HouseMarket.pt",
            rating : 4,
            price : 20,
            shipping : 2,
            stock: 10
            },
        {
            name: "HouseMarket.pt",
            rating : 4,
            price : 20,
            shipping : 2,
            stock: 10
        },
    ]

    const sellers2 = sellers.sort((a, b) => a.price - b.price)

    return (
        <ListGroup  className={styles.list}>
            {Object.values(sellers2).map((key, value) => (
            <ListGroupItem key={value} className={styles.listItem}>
                <Row md={12}>
                    <Col md={6} >
                    <div className={styles.reviewUser}>
                        <p className={styles.nameSeller}>{key.name}</p> 
                        <p className={styles.stars}>{computeStars(key.rating)}</p>
                        <p>{key.stock}</p>
                    </div>
                    </Col>
                    <Col md={6}>
                    <div className={styles.reviewDescription}>
                        <p className={styles.price}>{key.price}€</p>
                        <p>Shipping : {key.shipping}€</p>
                    </div>
                    </Col>
                </Row>
            </ListGroupItem>
        ))}
        </ListGroup>
    )
};
