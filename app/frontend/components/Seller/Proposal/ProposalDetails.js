import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SellerCard from "components/Seller/Card";
import styles from 'styles/Seller/proposal/proposaldetails.module.css'
import { computeStars } from "components/Product/Product";

export default function ProposalDetails({ product, category, proposal, ...props }) {
    console.log(proposal)
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
                  O CleanFry Infinty 1500 é perfeito para preparar pequenas porções para acompanhar os pratos principais. Com uma capacidade de 1,5 litros de azeite poderá fritar as quantidades necessárias para uma refeição completa, por exemplo, saborosas batatas fritas, croquetes ou rodelas de cebola e saborear os melhores acompanhamentos preparados por si. Além disso, o seu design compacto com acabamentos em aço inoxidável tornam-no no melhor acessório para a sua cozinha.
                  O CleanFry Infinty 1500 é perfeito para preparar pequenas porções para acompanhar os pratos principais. Com uma capacidade de 1,5 litros de azeite poderá fritar as quantidades necessárias para uma refeição completa, por exemplo, saborosas batatas fritas, croquetes ou rodelas de cebola e saborear os melhores acompanhamentos preparados por si. Além disso, o seu design compacto com acabamentos em aço inoxidável tornam-no no melhor acessório para a sua cozinha.
                  O CleanFry Infinty 1500 é perfeito para preparar pequenas porções para acompanhar os pratos principais. Com uma capacidade de 1,5 litros de azeite poderá fritar as quantidades necessárias para uma refeição completa, por exemplo, saborosas batatas fritas, croquetes ou rodelas de cebola e saborear os melhores acompanhamentos preparados por si. Além disso, o seu design compacto com acabamentos em aço inoxidável tornam-no no melhor acessório para a sua cozinha.
                  O CleanFry Infinty 1500 é perfeito para preparar pequenas porções para acompanhar os pratos principais. Com uma capacidade de 1,5 litros de azeite poderá fritar as quantidades necessárias para uma refeição completa, por exemplo, saborosas batatas fritas, croquetes ou rodelas de cebola e saborear os melhores acompanhamentos preparados por si. Além disso, o seu design compacto com acabamentos em aço inoxidável tornam-no no melhor acessório para a sua cozinha.
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
                      <div className={styles.statInfo}></div>
                    </Col>
                    <Col>
                      <div className={styles.statTitle}>Revenue:</div>
                      <div className={styles.statInfo}></div>
                    </Col>
                  </Row>
                </div>
            </Col>
        </Row>

        </SellerCard>
    
  }
  