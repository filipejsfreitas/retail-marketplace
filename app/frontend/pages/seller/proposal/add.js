import { useEffect, useState } from "react";
import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import { Alert, Button, Form, Modal } from "react-bootstrap";

import styles from "/styles/Seller/proposal/add.module.css";

function AddProductModal(props) {
  const [product, setProduct] = props.productIdState;
  const [categoryName, setCategoryName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (!product) return;
    setShowAlert(false);
    fetch(`${process.env.NEXT_PUBLIC_HOST}/category/${product.category_id}`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((cat) => setCategoryName(cat.name))
      .catch((error) => console.log(error));
  }, [product]);
  if (!product) return <></>;
  return (
    <Modal
      show={product}
      onHide={() => setProduct(undefined)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {`Add proposal to ${product.name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Category:</h5> {`${categoryName}`}
        <h5>Description:</h5> {`${product.description}`}
        <br />
        <h5>Price:</h5>
        <Form.Control id="form-prop-price" placeholder="1.00" />
        <br />
        <h5>Shipping:</h5>
        <Form.Control id="form-prop-shipping" placeholder="1.00" />
        <br />
        <h5>Stock:</h5>
        <Form.Control id="form-prop-stock" placeholder="10" />
        <br />
        <h5>Maximum purchases per client:</h5>
        <Form.Control id="form-prop-max" placeholder="2" />
        <br />
        <h5>Extra Conditions:</h5>
        <Form.Control
          id="form-prop-conditions"
          as="textarea"
          placeholder="Extra conditions here"
        />
        <br />
        {showAlert ? (
          <Alert
            variant={"danger"}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {showAlert}
          </Alert>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            const request = { productId: product._id };
            const valueFromId = (id) => document.getElementById(id).value;
            request.price = parseFloat(
              parseFloat(valueFromId("form-prop-price")).toFixed(2)
            );
            request.shipping = parseFloat(
              parseFloat(valueFromId("form-prop-shipping")).toFixed(2)
            );
            request.stock = parseInt(valueFromId("form-prop-stock"));
            request.maxPerPurchase = parseFloat(
              parseFloat(valueFromId("form-prop-max")).toFixed(0)
            );
            if (!Object.values(request).every((x) => x)) {
              setShowAlert("Some fields are missing or are invalid.");
              return;
            }
            request.special_conditions = valueFromId("form-prop-conditions");

            fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(request),
            })
              .then((reply) => {
                console.log(reply);
                if (reply.ok) setProduct(undefined);
                else
                  setShowAlert(
                    "Unable to add proposal, maybe you have already added one to this product?"
                  );
              })
              .catch((error) => {
                console.log(error);
                setShowAlert("Unable to connect to server.");
              });
          }}
          variant="primary"
          type="submit"
        >
          {" "}
          Confirm{" "}
        </Button>
        <Button
          onClick={() => {
            setProduct(undefined);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ProposalAdd() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(undefined);
  useEffect(async () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/product/list/`)
      .then((res) => res.json())
      .then((data) => data.data)
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Layout sidebar={SELLER_SIDEBAR} isLoading={isLoading}>
      <h3>Add Proposal</h3>
      <br />
      <ToggleDropdown title={<h4>Product List</h4>}>
        {products.map((product) => (
          <h5
            key={product._id}
            className={styles.product}
            onClick={() => setProduct(product)}
          >
            {product.name}
          </h5>
        ))}
      </ToggleDropdown>
      <AddProductModal productIdState={[product, setProduct]} />
    </Layout>
  );
}
