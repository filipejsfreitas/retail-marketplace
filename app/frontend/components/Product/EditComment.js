import React, { useState } from 'react'
import {Modal,Form,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'

const EditComment = (props) =>{ 
    const router = useRouter()
    const pathC = router.query.id
    const [title, setTitle] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [score, setScore] = React.useState(0);
    
    function handleSubmit(event) {
      event.preventDefault();
    }

    return(
        <Modal
        {...props}
        show={props.show.active}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton onClick={()=>props.setC({active: false, old:props.old})}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form.Group className="mb-3" htmlFor="title">  
                <Form.Control  
                  id="title" 
                  placeholder={props.old.title} 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required />
            </Form.Group>
            <Form.Group className="mb-3" htmlFor="comment" label="Comments">  
                <Form.Control 
                  as="textarea" 
                  rows={3}  
                  placeholder={props.old.comment}
                  value={comment} 
                  id="comment" 
                  onChange={(e) => setComment(e.target.value)} 
                  required  />
            </Form.Group>
            <FloatingLabel 
                  label="Rate the Product" 
                  htmlFor="score"  
                  id="score" 
                  value={score} 
                  onChange={(e) => setScore(e.target.value)}>
                <Form.Select>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {async () => {
                   fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${pathC}/comment/${props.old._id}`, {
                      method: 'PUT',
                      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                      body: JSON.stringify({ title: title, comment: comment, score: parseInt(score) })
                  }).then(() => router.reload())
                    .catch((error) => console.log(error))
                }}
                variant="primary" type="submit"> Submit</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default EditComment;