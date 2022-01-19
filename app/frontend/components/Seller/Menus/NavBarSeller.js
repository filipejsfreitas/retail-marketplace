import { Navbar } from "react-bootstrap"
import { BsPersonCircle, BsGearFill } from "react-icons/bs";
import { Container, Row , Col} from "react-bootstrap";
import { useState } from "react";
import { useRef,useContext } from "react";
import TokenContext from 'components/Context/TokenContext'
import styles from "styles/Management/NavBarSeller.module.css"
import { UserType } from "hooks/useToken";
import Dropdown from "./DropDownSeller";

export default function NavBarSeller(props) {
    const { token , userType} = useContext(TokenContext)
    const [showDropdown, setshowDropdown] = useState(false);
    const dropButtonRef = useRef(null);
    return (
        <>
            <Navbar className={styles.navbar} bg="primary" >
                <Container fluid>
                    <div className={styles.title}>Dashboard</div>
                    <Row md={12} className={styles.outCont}>
                        <Col className={styles.gearCont}>
                            <BsGearFill size={45} className={styles.gear}/>
                        </Col>
                        <Col className={styles.infoSeller}>
                        {userType == UserType.SELLER ?
                        <button ref={dropButtonRef} className={styles.btn}
                          onClick={() => setshowDropdown(!showDropdown)}
                        >
                            <BsPersonCircle size={48} className={styles.circle} />
                            <div  className={styles.name}>{(token.sellerInfo).firstName} {(token.sellerInfo).lastName}</div>
                        </button>
                        : <></>}
                        </Col>
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
