import React, { useRef } from 'react'
import {Modal,Form, Container, Button, Row, Col} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';

const AddImage = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()
    const ref = { image: useRef()}
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
            <Form.Control type="file" ref={ref.image} label="File" id="product-images-form" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {async () => {
             var req = {}
             req.image = ref.image.current.value
             var data = new FormData();
             data.append("image", req.image);
              fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/seller/image`, {
                      method: 'POST',
                      body: data
                  }).then(() => router.reload())
                    .catch((error) => console.log(error))
                }}
                variant="primary" type="submit"> Submit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}


export default AddImage;