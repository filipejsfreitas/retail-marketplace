import React from 'react'
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap';

export default function DeleteAlert({ alert, removeAlert, onHide, ...props }) {

  return (
    <Modal
      {...props}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        Do you want to delete the alert?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          removeAlert(alert._id)
          onHide()
        }} variant="primary"> Yes </Button>
      </Modal.Footer>
    </Modal>
  )
}