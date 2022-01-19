import React, { useState } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';

const AddImage = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()

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
        <Modal.Header closeButton>
           <h5>Add Company Logo</h5>
        </Modal.Header>
        <Modal.Body >
            <Form.Control type="file" label="File" id="product-images-form" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {async () => {
                   fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/product/${pathC}/comment/${props.old._id}`, {
                      method: 'PUT',
                      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: title, comment: comment, score: parseInt(score) })
                  }).then(() => router.reload())
                    .catch((error) => console.log(error))
                }}
                variant="primary" type="submit"> Submit</Button>
        </Modal.Footer>
      </Modal>
    )
}


export default AddImage;