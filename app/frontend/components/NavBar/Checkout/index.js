import { Offcanvas, Container, Button } from "react-bootstrap"
import { BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'

import Item from "components/NavBar/Checkout/item"

import styles from 'styles/NavBar/Checkout/Checkout.module.css'

const calc_total = (items) => {
    return 128;
}

const Checkout = (props) => {

    const router = useRouter()

    const total = calc_total(props.items);

    return (
        <Offcanvas show={props.show} onHide={props.handleClose} placement="end" style={{width: "450px"}}>
            <Offcanvas.Header className={`${styles.topRec} p-0 justify-content-between`} >
                <Container className="d-flex flex-row justify-content-between align-items-center p-0 m-0">
                    <div className={styles.title}>
                        Shopping Cart
                    </div>
                    <button className={styles.closeBtn} onClick={props.handleClose}>
                            <BsX size={48}/>
                    </button>
                </Container>
                <Container className="d-flex flex-row justify-content-between align-items-center p-0 m-0">
                    <div className={styles.total}>
                        {`Total: ${total}€`}
                    </div>
                    <Button variant="secondary" className={styles.checkoutBtn} onClick={ () => router.push("/checkout") } >
                        Checkout
                    </Button>
                </Container>
            </Offcanvas.Header>
            <Offcanvas.Body className="">
                <Item price={34} title="The northface t-shirt" quantity={1}/>
                <Item price={34} title="The northface t-shirt" quantity={1}/>
                <Item price={34} title="The northface t-shirt" quantity={1}/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Checkout