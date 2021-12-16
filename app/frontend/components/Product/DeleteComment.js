import React from 'react'
import {Modal,Form,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'

const DeleteComment = (props) =>{ 
    const router = useRouter()
    const pathC = router.query.id
    return(
        <Modal
        show={props.show.active}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form>
        <Modal.Header closeButton onClick={()=>props.setC({active: false})} >
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            Do you want to delete the comment?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = { async () => {
                   fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${pathC}/comment/${props.idC}`, {
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

export default DeleteComment;