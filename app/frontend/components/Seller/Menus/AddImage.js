import React, { useRef, useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';
import { Alert } from "react-bootstrap";


const AddImage = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()
    const [showAlert, setShowAlert] = useState(false)

    const method = props.seller ? "PUT" : "POST"

    function handleSubmit(event) {
      event.preventDefault();
    }

    return(
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
           <h5>Add Company Logo</h5>
        </Modal.Header>
        <Modal.Body >
            <Form.Control type="file" label="image" id="image" />
        </Modal.Body>
        {showAlert && <Alert variant={"danger"} onClose={() => setShowAlert(false)} dismissible >
                {showAlert}
            </Alert>}
        <Modal.Footer>
          <Button variant="primary" onClick={ async () => {

            var req = document.getElementById("image").files

            var data = new FormData();
            data.append("image", req[0]);

            if (!req.length) 
              return setShowAlert("Some fields are missing or are invalid.")
            else {
                const rep = await fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/seller/image`, {
                    method: method,
                    body: data,
                })

                if (rep.ok)  router.reload()
                else setShowAlert("Unable to edit image.")
                }
          }} >
            Submit
          </Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
    )
}


export default AddImage;