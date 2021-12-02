import React from "react";
import {Row ,Col,ListGroup, ListGroupItem} from 'react-bootstrap';
import styles from "styles/Product/product.module.css"
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";


function computeStars(stars) {
    var r = []
    for(var i=0; i<5; i++, stars--){
        if(stars <= 0) r[i] = <BsStar key={"star-" + i}/>
        else if(stars <= 0.5) r[i] = <BsStarHalf key={"star-" + i}/>
        else r[i] = <BsFillStarFill key={"star-" + i}/>
    }
    return <>
        {r}
    </>}

export default function Reviews(props1) {
    return (
        <ListGroup> 
            {props1.props1.map((key, value) => (
            <ListGroupItem key={value}>
                <div className={styles.reviewTitle}>{key.title}</div> 
                <Row md={12}>
                    <Col md={2} >
                    <div className={styles.reviewUser}><p>{key.username}</p><p>{computeStars(key.stars)}</p></div>
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
