import { Offcanvas, Container, Button } from "react-bootstrap"
import { BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useContext } from "react"
import CartContext from 'components/NavBar/Checkout/context';

import Item from "components/NavBar/Checkout/item"

import styles from 'styles/NavBar/Checkout/Checkout.module.css'

const calc_total = (items) => {
    return items.map( item => ({quantity:item.quantity, price:item.price}) ).reduce( (acc,item) => acc + item.quantity*item.price, 0)
}

const Checkout = (props) => {

    const context = useContext(CartContext)

    const cart = context.cart

    const router = useRouter()


    const total = calc_total(cart);

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
            <Offcanvas.Body>
                {
                    cart.map( item => <Item key={item._id} deleteHandler={ () => context.deleteItem(item._id) } price={item.price} title={item.name} image={item.image} quantity={item.quantity}/>)
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Checkout