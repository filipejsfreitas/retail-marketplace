import React from "react";
import {Row ,Col,ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import styles from "styles/Product/product.module.css"
import { computeStars } from "components/Product/Product";
import { BsFillPencilFill, BsFillXCircleFill } from "react-icons/bs";
import EditComment from "./EditComment";
import TokenContext from 'components/Context/TokenContext'
import { useContext } from "react";

import DeleteComment from "./DeleteComment";

export default function Reviews(props1) {
    const { token } = useContext(TokenContext)
    const [commentDel, setCommentDel] = React.useState({active: false, id: ""});
    const [commentEdit, setCommentEdit] = React.useState({active: false, old: ""});

    return (
        <ListGroup> 
            {props1.props1.map((key, value) => (
            <ListGroupItem key={value}>
                 <Row md={12}>
                    <Col md={11} >
                    <div className={styles.reviewTitle}>{key.title}</div>
                    </Col>
                    <Col md={1}>
                        <Button 
                            className={styles.reviewCol2}  
                            type="submit"
                            disabled={token._id==key.client_id ? false : true}
                            onClick={()=>setCommentEdit({active: true, old:key})}
                            >
                            <BsFillPencilFill/>
                        </Button>
                        <EditComment
                            show={commentEdit}
                            old={commentEdit.old}
                            setC={setCommentEdit}
                        />
                        <Button 
                            className={styles.reviewCol2}  
                            type="submit"
                            disabled={token._id==key.client_id ? false : true}
                            onClick={()=>setCommentDel({active: true, id:key._id})}>
                           
                            <BsFillXCircleFill/>
                        </Button>
                        <DeleteComment
                            show={commentDel}
                            idC={commentDel.id}
                            setC={setCommentDel}
                        />
                    </Col>
                 </Row>
                
                <Row md={12}>
                    <Col md={2} >
                    <div className={styles.reviewUser}><p>{key.name}</p><p>{computeStars(key.score)}</p><p>{key.date.split("T")[0]}</p></div>
                    </Col>
                    <Col md={10}>
                    <div className={styles.reviewDescription}>{key.comment}</div>
                    </Col>
                </Row>
            </ListGroupItem>
        ))}
        </ListGroup>
    )
}
