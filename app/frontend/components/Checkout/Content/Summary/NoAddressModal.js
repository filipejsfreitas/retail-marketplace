import { Button, Modal } from "react-bootstrap";


export default function NoAddressModal({state}) {

    const [show, setShow] = state;

    const handleClose = () => {
        setShow(0)
      };

    return (
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show === -1 ? true : false}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wait, you need to select a valid address!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    )
}