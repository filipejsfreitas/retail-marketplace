import React from "react";
import {Row ,Col,ListGroup, ListGroupItem} from 'react-bootstrap';
import styles from "styles/Product/product.module.css"
import { computeStars } from "components/Product/Product";


export default function Reviews(props1) {
    return (
        <ListGroup> 
            {props1.props1.map((key, value) => (
            <ListGroupItem key={value}>
                <div className={styles.reviewTitle}>{key.title}</div> 
                <Row md={12}>
                    <Col md={2} >
                    <div className={styles.reviewUser}><p>{key.username}</p><p>{computeStars(key.stars)}</p><p>{key.date}</p></div>
                    </Col>
                    <Col md={10}>
                    <div className={styles.reviewDescription}>{key.text}</div>
                    </Col>
                </Row>
            </ListGroupItem>
        ))}
        </ListGroup>
    )
};
