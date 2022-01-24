import React, { useRef, useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';
import { Alert } from "react-bootstrap";

const EditSellerModal = ({seller, ...props}) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()

    function handleSubmit(event) {
      event.preventDefault();
    }
    const refs = { firstName: useRef(), lastName: useRef(), companyName: useRef(), companyPhoneNumber: useRef() }
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
           <h5>Edit My Info </h5>
        </Modal.Header>
        <Modal.Body >
            <h5>First Name:</h5>
            <Form.Control  ref={refs.firstName} placeholder={seller.firstName} />
            <br />
            <h5>Last Name:</h5>
            <Form.Control ref={refs.lastName} placeholder={seller.lastName} />
            <br />
            <h5>Company Name:</h5>
            <Form.Control ref={refs.companyName} placeholder={seller.companyName} />
            <br />
            <h5>Company Phone Number:</h5>
            <Form.Control  ref={refs.companyPhoneNumber} placeholder={seller.companyPhoneNumber} />
            <br />
            <h5>TIN:</h5>
            <Form.Control  ref={refs.tin} placeholder={seller.tin} />
            <br />
            <h5>Company Service Email:</h5>
            <Form.Control  ref={refs.customerServiceEmail} placeholder={seller.customerServiceEmail} />
            <br />
            {showAlert && <Alert variant={"danger"} onClose={() => setShowAlert(false)} dismissible >
                {showAlert}
            </Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {async () => {
               const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
               req.firstName = req.firstName ? req.firstName : seller.firstName;
               req.lastName = req.lastName ? req.lastName : seller.lastName;
               req.phoneNumber = req.phoneNumber ? req.phoneNumber : "123123123";
               req.companyName = req.companyName ? req.companyName : seller.companyName;
               req.companyPhoneNumber = req.companyPhoneNumber ? req.companyPhoneNumber : seller.companyPhoneNumber;
               req.tin = req.tin ? req.tin : seller.tin;
               req.customerServiceEmail = req.customerServiceEmail ? req.customerServiceEmail : seller.customerServiceEmail;               
               if (!Object.values(req).every(x => x))
                return setShowAlert("Some fields are missing or are invalid.")
               
                const rep = await fetchAuth( `${process.env.NEXT_PUBLIC_HOST}/seller`,{
                     method: "PUT",
                     headers: {
                       Accept: "application/json",
                       "Content-Type": "application/json",
                     },
                     body: JSON.stringify(req),
                   })
                if (rep.ok) router.reload()
                else setShowAlert("Unable to edit info.")
                }}
                variant="primary" type="submit"> Submit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}


export default EditSellerModal;