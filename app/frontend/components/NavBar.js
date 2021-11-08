import { Container, Navbar, Form, FormControl, Button, InputGroup } from "react-bootstrap"
import { BsJustify, BsPersonCircle, BsBagFill, BsSearch  } from 'react-icons/bs'

import styles from "../styles/NavBar.module.css"

const NavBar = () => {
    return (
        <Navbar className={ `primary-bg-color ${styles.navbar} `}>
            <Container fluid >
                <Container className="d-flex align-items-center py-0">
                    <button className={styles.btn} >
                        <BsJustify size={48}/>
                    </button>
                    <Navbar.Brand href="/" className>
                        <h1 className="ps-2 my-0 secondary-color">Retail Marketplace</h1>
                    </Navbar.Brand >
                </Container>
                <InputGroup className={`d-flex flex-row ${styles.sinput}`}>
                    <FormControl className={styles.searchBox} placeholder="Search"/>
                    <button className={styles.searchBtn} >
                        <BsSearch/>
                    </button>
                </InputGroup>
                <Container className="d-flex flex-row-reverse">
                    <button className={styles.btn} >
                        <BsBagFill size={48}/>
                    </button>
                    <button className={styles.btn}  >
                        <BsPersonCircle size={48} className="me-3"/>
                    </button>
                </Container>
            </Container>
        </Navbar>
    )
}

export default NavBar