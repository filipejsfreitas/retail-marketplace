import { Col, Row } from "react-bootstrap";
import SellerCard from "components/Seller/Card";
import styles from 'styles/Seller/proposal/proposaldetails.module.css'
import { computeStars } from "components/Product/Product";
import { BsGearFill } from "react-icons/bs";
import { useState } from "react";
import EditProposal from "./EditProposal";

export default function ProposalDetails({ product, category, proposal,invoices, ...props }) {
    const numberOrders = 0;
    const revenue = 0;
    for (let i = 0; i < invoices.length; i++) {
      if(invoices[i].state == "complete")
        for (let j = 0; j < invoices[i].items.length; j++) {
          if( invoices[i].items[j].product_id == product._id )
            numberOrders++;
            revenue += invoices[i].items[j].price * invoices[i].items[j].quantity;
        }
      
    }
    
    const [modalShow, setModalShow] = useState(false);

    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    return  <SellerCard className={styles.panel_details}
              injectTitle={<div>
                              <span className={styles.injectTitleL}><h4>Proposal Details</h4></span>
                              <span className={styles.injectTitleR}>
                                <button type="submit" className={styles.btn}
                                  onClick={() => setModalShow(true)}>
                                <BsGearFill size={35}></BsGearFill>
                                </button>
                                <EditProposal
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                  proposal={proposal}
                                  product={product}
                            />
                                </span>
                            </div>} {...props}>
          
        <Row md={12}>
            <Col md={3} >
              <div className={styles.imgCol}> 
                <img
                  className={styles.photo}              
                  src={(product.images[0] && `${process.env.NEXT_PUBLIC_HOST}/${product.images[0]}`) || fallback}
                />
              </div>
            </Col>
            <Col md={9} className={styles.infoCol2}>
                <div className={styles.prodName}>
                  {product.name}
                </div>
                <div className={styles.rateLine} > 
                  <span className={styles.rate}>{computeStars(product.score)}</span> 
                  <span className={styles.numberReviews}> ({product.number_scores} reviews) </span> 
                </div>
                <div className={styles.descriTitle}>
                  Description:
                </div>
                <div className={styles.description}>
                  {product.description}
                </div>
                <div className={styles.stats}>
                  <Row md="5" className="justify-content-md-center" >
                    <Col>
                      <div className={styles.statTitle}>Proposal Price:</div>
                      <div className={styles.statInfo}>{proposal.price}???</div>
                    </Col>
                    <Col>
                      <div className={styles.statTitle}>Shipping Cost:</div>
                      <div className={styles.statInfo}>{proposal.shipping}???</div>
                    </Col>
                    <Col>
                      <div className={styles.statTitle}>Maximum per cart:</div>
                      <div className={styles.statInfo}>{proposal.maxPerPurchase}</div>
                    </Col>
                    <Col>
                      <div className={styles.statTitle}>Number of orders:</div>
                      <div className={styles.statInfo}>{numberOrders}</div>
                    </Col>
                    <Col>
                      <div className={styles.statTitle}>Revenue:</div>
                      <div className={styles.statInfo}>{revenue}</div>
                    </Col>
                  </Row>
                </div>
            </Col>
        </Row>

        </SellerCard>
    
  }
  