import React, { useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';
import { computeStars } from 'components/Product/Product';
import styles from 'styles/Management/ProfileSeller.module.css'
import {BsImage} from 'react-icons/bs'
import AddImage from './AddImage';


const EditSeller = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()
    const [modalShowImg, setModalShowImg] = React.useState(false);

    function handleSubmit(event) {
      event.preventDefault();
    }
    const seller = props.seller
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
       <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            My Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.page} >
            <Row md={12}>
                <Col md={9} className={styles.col1}>
                    <Row md={12}>
                        <Col md={12}>
                            <span className={styles.titles}>First Name:</span>  
                            <span className={styles.infos}>{seller.firstName}</span>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col md={12}>
                            <span className={styles.titles}>Last Name:</span>  
                            <span className={styles.infos}>{seller.lastName}</span>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col md={12}>
                            <span className={styles.titles}>Company Name:</span>  
                            <span className={styles.infos}>{seller.companyName}</span>
                        </Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <div className={styles.company}>
                       <img
                           className={styles.companyLogo}              
                           src={fallback}
                       />
                       <BsImage 
                            size={30} 
                            className={styles.icon} 
                            onClick={() => setModalShowImg(true)}>
                       </BsImage>
                       <AddImage
                            show={modalShowImg}
                            onHide={() => setModalShowImg(false)}
                        />
                    </div>
                </Col>

            </Row>
    
            <Row md={12}>
                <Col md={12}>
                    <span className={styles.titles}>Company Phone Number:</span>  
                    <span className={styles.infos}>{seller.companyPhoneNumber}</span>
                </Col>
            </Row>
            <Row md={12}>
                <Col md={12}>
                    <span className={styles.titles}>Tax Identification Number:</span>  
                    <span className={styles.infos}>{seller.tin}</span>
                </Col>
            </Row>
            <Row md={12}>
                <Col md={12}>
                    <span className={styles.titles}>Rating:</span>  
                    <span className={styles.infos}>{computeStars(seller.rating)}</span>
                </Col>
            </Row>
            <Row md={12}>
                <Col md={12}>
                    <span className={styles.titles}>Number Reviews:</span>  
                    <span className={styles.infos}>{seller.numberRating}</span>
                </Col>
            </Row> 
           
        </Modal.Body>
      </Modal>
    )
}


export default EditSeller;