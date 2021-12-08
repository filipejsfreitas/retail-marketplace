import React from 'react'
import {Modal,Form,Col,FloatingLabel, Button, Row} from 'react-bootstrap';


const Comment = (props) =>{
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="comment" label="Comments">  
                <Form.Control as="textarea" rows={3} placeholder="Leave a comment here" />
            </Form.Group>
                <Row>
                    <Col>
                        <FloatingLabel controlId="rateProduct" label="Rate the product">
                            <Form.Select >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="rateProduct" label="Rate the seller">
                            <Form.Select >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onHide} type="submit" variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Comment;