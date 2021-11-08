import { Offcanvas, Container } from "react-bootstrap"
import { BsX } from 'react-icons/bs'

import styles from '../styles/SideBar.module.css'


const SideBar = (props) => {

    return (
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header className="p-0">
                <Container className={`primary-bg-color ${styles.topRec} d-flex align-items-center`}>
                    <button className={styles.closeBtn} onClick={props.handleClose}>
                        <BsX size={48}/>
                    </button>
                </Container>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.body}>
                <button className={styles.button}><h4>Featured</h4></button>
                <button className={styles.button}><h4>Recommended</h4></button>
                <button className={styles.button}><h1>Store</h1></button>
                <button className={styles.button}><h4>Electronics</h4></button>
                <button className={styles.button}><h4>Home and Kitchen</h4></button>
                <button className={styles.button}><h4>Clothing</h4></button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default SideBar