import { useEffect, useState, useRef } from "react";
import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import useFetchAuth from "hooks/useFetchAuth";

export default function AddProductModal({ product, setProduct, addProposal }) {
  const refs = { price: useRef(), shipping: useRef(), stock: useRef(), maxPerPurchase: useRef() }
  const [showAlert, setShowAlert] = useState(false)

  return <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
    show={product} onHide={() => setProduct(undefined)}>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {`Add proposal to ${product && product.name}`}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>Category:</h5> {`${product && product.category.name}`}
      <h5>Description:</h5> {`${product && product.description}`}
      <br />
      <h5>Price:</h5>
      <Form.Control ref={refs.price} placeholder="1.00" />
      <br />
      <h5>Shipping:</h5>
      <Form.Control ref={refs.shipping} placeholder="1.00" />
      <br />
      <h5>Stock:</h5>
      <Form.Control ref={refs.stock} placeholder="10" />
      <br />
      <h5>Maximum purchases per client:</h5>
      <Form.Control ref={refs.maxPerPurchase} placeholder="2" />
      <br />
      {showAlert && <Alert variant={"danger"} onClose={() => setShowAlert(false)} dismissible >
        {showAlert}
      </Alert>}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" type="submit" onClick={async () => {
        const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
        const rep = await addProposal(product, req)
        if(rep.error)
          setShowAlert(rep.error)
        else
          setProduct(undefined)
      }}>
        Confirm
      </Button>
      <Button onClick={() => setProduct(undefined)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
}