import { Navbar } from "react-bootstrap"
import { BsPersonCircle, BsGearFill } from "react-icons/bs";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useRef,useContext } from "react";
import TokenContext from 'components/Context/TokenContext'
import styles from "styles/Management/NavBarSeller.module.css"
import Dropdown from "./DropDown";

export default function NavBarSeller(props) {
    const { token } = useContext(TokenContext)
    console.log(token)
    const [showDropdown, setshowDropdown] = useState(false);
    const dropButtonRef = useRef(null);

    return (
        <>
            <Navbar className={styles.navbar} bg="primary" >
                <Container fluid>
                    <div className={styles.title}>Dashboard</div>
                    <Row md={12}>
                        <Container className={styles.gearCont}>
                            <BsGearFill size={48} className={styles.gear}/>
                        </Container>
                        <Container className={styles.infoSeller}>
                        <button ref={dropButtonRef} className={styles.btn}
                          onClick={() => setshowDropdown(!showDropdown)}
                        >
                            <BsPersonCircle size={48} className={styles.circle} />
                            <div  className={styles.name}>{(token.sellerInfo || { firstName: "" }).firstName}</div>
                        </button>
                        </Container>
                    </Row>
                </Container>
            </Navbar>
            <Dropdown
              btnRef={dropButtonRef}
              state={[showDropdown, setshowDropdown]}
            />
        </>
    )
}
