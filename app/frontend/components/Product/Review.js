import React from "react";
import {Row ,Col,ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import styles from "styles/Product/product.module.css"
import { computeStars } from "components/Product/Product";
import { BsFillPencilFill, BsFillXCircleFill } from "react-icons/bs";
import EditComment from "./EditComment";
import TokenContext from 'components/Context/TokenContext'
import { useContext } from "react";
import SellerCard from "components/Seller/Card";
import { Pagination } from "react-bootstrap";
import DeleteComment from "./DeleteComment";
import MyModal from "./Comment"


export default function Reviews({props1, isLog, modalShow, setModalShow,id,prod, ...props}) {
    const { token } = useContext(TokenContext)
    const [commentDel, setCommentDel] = React.useState({active: false, id: ""});
    const [commentEdit, setCommentEdit] = React.useState({active: false, old: ""});
   
    return (
        <SellerCard className={styles.panel_details} injectTitle={
        <div className={styles.reviewTop}>
        <span className={styles.reviewName}>Reviews</span>
        <span>
            <Button type="submit" 
                variant="secundary"
                className={styles.buttonComment}
                disabled={isLog ? false : true}
                onClick={() => setModalShow(true)}>
            New Review
            </Button>
            <MyModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={prod._id}
            />
        </span>
        </div>}  {...props}>
        <ListGroup> 
            {props1.map((key, value) => (
            <ListGroupItem key={value}>
                 <Row md={12}>
                    <Col md={11} >
                    <div className={styles.reviewTitle}>{key.title}</div>
                    </Col>
                    <Col md={1}>
                        <Button 
                            className={styles.reviewCol2}  
                            type="submit"
                            disabled={(token && token._id==key.client_id) ? false : true}
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
                            disabled={(token && token._id==key.client_id) ? false : true}
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
        </SellerCard>
    )
}
