import Dropdown from "components/Dropdown"
import { useRef, useState } from "react"
import { Container, Navbar, FormControl, InputGroup } from "react-bootstrap"
import { BsJustify, BsPersonCircle, BsBagFill, BsSearch  } from 'react-icons/bs'

import styles from "../styles/NavBar.module.css"

const NavBar = (props) => {

    const [showDropdown, setshowDropdown] = useState(false)
    const dropButtonRef = useRef(null)

    return (
        <>
            <Navbar className={styles.navbar} bg="primary" >
                <Container fluid>
                    <Container className="d-flex align-items-center py-0">
                        <button className={styles.btn} onClick={props.handleShowSideBar}>
                            <BsJustify size={48}/>
                        </button>
                        <Navbar.Brand href="/" className>
                            <h1 className="ps-2 my-0 text-white">Retail Marketplace</h1>
                        </Navbar.Brand >
                    </Container>
                    <InputGroup className={`d-flex flex-row ${styles.sinput}`}>
                        <FormControl className={styles.searchBox} placeholder="Search"/>
                        <button className={styles.searchBtn} >
                            <BsSearch/>
                        </button>
                    </InputGroup>
                    <Container className="d-flex flex-row-reverse">
                        <button className={styles.btn} onClick={props.handleShowCheckout} >
                            <BsBagFill size={48}/>
                        </button>
                        <button ref={dropButtonRef} className={styles.btn} onClick={() =>{ showDropdown ? setshowDropdown(false) : setshowDropdown(true) }}>
                            <BsPersonCircle size={48} className="me-3"/>
                        </button>
                    </Container>
                </Container>
            </Navbar>
            <Dropdown btnRef={dropButtonRef} state={[showDropdown, setshowDropdown]}/>
        </>
    )
}

export default NavBar