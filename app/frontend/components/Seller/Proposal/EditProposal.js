import React, { useRef, useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';
import { Alert } from "react-bootstrap";

const EditProposal = ({product, proposal, ...props}) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()

    function handleSubmit(event) {
      event.preventDefault();
    }
    const refs = { price: useRef(), shipping: useRef(), stock: useRef(), maxPerPurchase: useRef() }
    const [showAlert, setShowAlert] = useState(false)

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
           <h5>Edit Proposal - {`${product && product.name}`}</h5>
        </Modal.Header>
        <Modal.Body >
            <h5>Price:</h5>
            <Form.Control  ref={refs.price} placeholder={proposal.price} />
            <br />
            <h5>Shipping:</h5>
            <Form.Control ref={refs.shipping} placeholder={proposal.shipping} />
            <br />
            <h5>Stock:</h5>
            <Form.Control ref={refs.stock} placeholder={proposal.stock} />
            <br />
            <h5>Maximum purchases per client:</h5>
            <Form.Control  ref={refs.maxPerPurchase} placeholder={proposal.maxPerPurchase} />
            <br />
            {showAlert && <Alert variant={"danger"} onClose={() => setShowAlert(false)} dismissible >
                {showAlert}
            </Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {async () => {
               const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
               req.price = parseFloat(parseFloat(req.price).toFixed(2));
               req.shipping = parseFloat(parseFloat(req.shipping).toFixed(2));
               req.maxPerPurchase = parseFloat(
                 parseFloat(req.maxPerPurchase).toFixed(2)
               );
               req.stock = parseInt(req.stock);
               
               if (!Object.values(req).every(x => x))
                return setShowAlert("Some fields are missing or are invalid.")
               
                const rep = await fetchAuth( `${process.env.NEXT_PUBLIC_HOST}/proposal/${proposal._id}`,{
                     method: "PUT",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json",
                     },
                     body: JSON.stringify(req),
                   })
                if (rep.ok) router.reload()
                else setShowAlert("Unable to add proposal.")
                }}
                variant="primary" type="submit"> Submit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}


export default EditProposal;