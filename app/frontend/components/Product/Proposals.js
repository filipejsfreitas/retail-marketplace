import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import styles from "styles/Product/sellers.module.css";
import { computeStars } from "components/Product/Product";
import Status from "components/common/Status";
import { BsTruck } from "react-icons/bs";
import Link from "next/link";
import { useContext } from "react";
import CartContext from "components/NavBar/Cart/context";
import useFetchData from "hooks/useFetchData";

const SellerInfo = ({ idSeller }) => {
  const { data: seller, loading } = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}/seller/${idSeller}`
  );
  return loading ? <></> : 
  <>
    <p></p>
    <p className={styles.nameSeller}>
    <Link href={`/infoseller/${idSeller}`}><a>{seller.companyName} </a></Link>
    </p>
    <p className={styles.stars}>{computeStars(seller.rating)}</p>
  </>
};

export default function Proposals(proposals) {
  const cart = useContext(CartContext);

  const proposalsOrd = proposals.proposals.sort((a, b) => a.price - b.price);
  const isLog = proposals.isLog
  return (
    <ListGroup className={styles.list}>
      {Object.values(proposalsOrd).map((key, value) => (
        <ListGroupItem key={value} className={styles.listItem}>
          <Row md={12}>
            <Col md={6} className={styles.col1}>
              <SellerInfo idSeller={key.seller_id}></SellerInfo>
              <p>
                {" "}
                <Status stock={key.stock}></Status>
              </p>
            </Col>
            <Col md={4} className={styles.col2}>
              <div className={styles.price}>{key.price}€</div>
              <div className={styles.grey}>
                <BsTruck size={24} /> Shipping: {key.shipping}€
              </div>
            </Col>
            <Col md={2} className={styles.col3}>
              <Button
                type="submit"
                variant="secundary"
                className={styles.button}
                disabled={(key.stock <= 0 || !isLog) ? true : false}
                onClick={() => {
                  cart.addItem(key._id, 1);
                  cart.handleVisible();
                }}
              >
                ADD TO CART
              </Button>
              {/*{key._id} é o id da proposta*/}
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
