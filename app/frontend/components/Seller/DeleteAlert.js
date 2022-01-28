import React from 'react'
import {Modal,Form,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'
import useFetchAuth from 'hooks/useFetchAuth';

const DeleteAlert = ({id, ...props}) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()

    function handleSubmit(event) {
      event.preventDefault();
    }

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            Do you want to delete the alert?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = { async () => {
                   fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/alerts/${id}`, {
                      method: 'DELETE'
                  }).then(() => router.reload())
                    .catch((error) => console.log(error))
                }
            } variant="primary" type="submit"> Yes </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default DeleteAlert;