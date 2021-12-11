import React from "react";
import {Row ,Col,ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import styles from "styles/Product/sellers\.module.css"
import { computeStars } from "components/Product/Product";
import Status from "components/common/Status";
import { BsBasket, BsCashCoin, BsTruck } from "react-icons/bs";


export default function Reviews() {
    const sellers=[
        {
            name: "HouseMarket.pt",
            rating : 3,
            price : 10,
            shipping : 4,
            stock: 8
            
        },
        {
            name: "HouseMarketHouse.pt",
            rating : 4,
            price : 2000.08,
            shipping : 2,
            stock: 0
            },
        {
            name: "HouseMarket.pt",
            rating : 4,
            price : 20,
            shipping : 2,
            stock: 102
        },
    ]

    const sellers2 = sellers.sort((a, b) => a.price - b.price)
    
    return (
        
        <ListGroup  className={styles.list}>
            {Object.values(sellers2).map((key, value) => (
            <ListGroupItem key={value} className={styles.listItem}> 
                <Row md={12}>
                    <Col md={6} className={styles.col1}>
                        <p className={styles.nameSeller}>{key.name}</p> 
                        <p className={styles.stars}>{computeStars(key.rating)}</p>
                        <p> <Status stock={key.stock}></Status></p>
                    </Col>
                    <Col md={4} className={styles.col2}>
                        <div className={styles.price}>{key.price}€</div>
                        <div className={styles.grey}>
                          <BsTruck size={24}/> Shipping: {key.shipping}€
                        </div>
                    </Col>
                    <Col md={2} className={styles.col3}>
                        <Button type="submit" variant="secundary"  className={styles.button}
                         disabled={(key.stock <= 0 ? true: false)}>
                            ADD TO CARD
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
        ))}
        </ListGroup>
    )
};
