import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SellerCard from "components/Seller/Card";
import styles from 'styles/Seller/proposal/proposaldetails.module.css'
import { computeStars } from "components/Product/Product";

export default function ProposalDetails({ product, category, proposal,invoices, ...props }) {
    console.log(invoices)
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
    
    console.log(numberOrders)
    console.log(revenue)
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    return  <SellerCard className={styles.panel_details}
      title={"Proposal Details"} {...props}>
          
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
                  <Row md={9} >
                    <Col>
                      <div className={styles.statTitle}>Proposal Price:</div>
                      <div className={styles.statInfo}>{proposal.price}€<span className={styles.shipping}>+{proposal.shipping}</span> </div>
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
  