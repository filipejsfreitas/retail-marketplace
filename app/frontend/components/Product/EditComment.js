import React from 'react'
import {Modal,Form,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'


const EditComment = (props) =>{ 
    const router = useRouter()
    const pathC = router.query.id
    console.log(props)
    return(
        <Modal
        show={props.show.active}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form>
        <Modal.Header closeButton onClick={()=>props.setC({active: false, old: ""})}>
          <Modal.Title id="contained-modal-title-vcenter">
            New Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Form.Group className="mb-3" controlId="commentTitle">  
                <Form.Control defaultValue={props.old.title} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="comment" label="Comments">  
                <Form.Control as="textarea" rows={3}  defaultValue={props.old.comment} required />
            </Form.Group>
            <FloatingLabel controlId="rateProduct" label="Rate the Product">
                <Form.Select defaultValue={props.old.score}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = { async () => {
                const title = document.getElementById("commentTitle").value
                const comment = document.getElementById("comment").value
                const rateProduct = document.getElementById("rateProduct").value
                if(title && comment && rateProduct){ 
                  fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${pathC}/comment/${props.old._id}`, {
                      method: 'PUT',
                      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: title, comment: comment, score: parseInt(rateProduct) })
                  }).then(() => router.reload())
                    .catch((error) => console.log(error))
                }
            }} variant="primary" type="submit"> Submit </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default EditComment;