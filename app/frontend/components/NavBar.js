import { Container, Navbar, FormControl, InputGroup } from "react-bootstrap"
import { BsJustify, BsPersonCircle, BsBagFill, BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/router'

import styles from "../styles/NavBar.module.css"

const NavBar = (props) => {
    const router = useRouter()
    return (
        <Navbar className={styles.navbar} bg="primary" >
            <Container fluid>
                <Container className="d-flex align-items-center py-0">
                    <button className={styles.btn} onClick={props.handleShow}>
                        <BsJustify size={48} />
                    </button>
                    <Navbar.Brand href="/" className>
                        <h1 className="ps-2 my-0 text-white">Retail Marketplace</h1>
                    </Navbar.Brand >
                </Container>
                <InputGroup className={`d-flex flex-row ${styles.sinput}`}>
                    <FormControl autoFocus={true} className={styles.searchBox} name="search" placeholder="Search" maxLength="128" defaultValue={router.query.query}
                        onKeyUp={event => {
                            props.handleSearch(event.target.value)
                        }}
                    />
                    <button type="submit" className={styles.searchBtn}>
                        <BsSearch />
                    </button>
                </InputGroup>
                <Container className="d-flex flex-row-reverse">
                    <button className={styles.btn} >
                        <BsBagFill size={48} />
                    </button>
                    <button className={styles.btn}  >
                        <BsPersonCircle size={48} className="me-3" />
                    </button>
                </Container>
            </Container>
        </Navbar>
    )
}

export default NavBar