import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/router";


export default function SucessModal({state}) {

    const [show, setShow] = state;

    const router = useRouter();

    const handleClose = () => {
        setShow(0); router.push("account/order");
      };

    return (
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show === 1 ? true : false}
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you bought a product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            GREAT!
          </Button>
        </Modal.Footer>
      </Modal>
    )
}