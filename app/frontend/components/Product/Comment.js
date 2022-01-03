import React from 'react'
import {Modal,Form,Col,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'
import { useContext } from 'react';
import useFetchAuth from 'hooks/useFetchAuth';
import TokenContext from 'components/Context/TokenContext'

const Comment = (props) =>{ 
    const router = useRouter()
    const { fetchAuth } = useFetchAuth()
    const { token } = useContext(TokenContext)
    console.log(token)
    console.log(fetchAuth)
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Form.Group className="mb-3" controlId="commentTitle">  
                <Form.Control placeholder="Review Title" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="comment" label="Comments">  
                <Form.Control as="textarea" rows={3} placeholder="Leave a comment here" required />
            </Form.Group>
            <FloatingLabel controlId="rateProduct" label="Rate the Product">
                <Form.Select >
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
                  fetchAuth(`${process.env.NEXT_PUBLIC_HOST}/product/${props.id}/comment`, {
                      method: 'POST',
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

export default Comment;