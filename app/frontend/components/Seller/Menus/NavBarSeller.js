import { Navbar , Button} from "react-bootstrap"
import { BsPersonCircle, BsGearFill } from "react-icons/bs";
import { Container, Row , Spinner, Col} from "react-bootstrap";
import { useState } from "react";
import React, { useRef,useContext } from "react";
import TokenContext from 'components/Context/TokenContext'
import styles from "styles/Management/NavBarSeller.module.css"
import { UserType } from "hooks/useToken";
import Dropdown from "./DropDownSeller";
import EditSeller from "./EditSeller";
import useToken from "hooks/useToken";
import useFetchData from "hooks/useFetchData";

export default function NavBarSeller(props) {
    const { token , userType} = useContext(TokenContext)
    const [showDropdown, setshowDropdown] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const dropButtonRef = useRef(null);

    const { data: seller, loading } =
     useFetchData(() => `${process.env.NEXT_PUBLIC_HOST}/seller/${token._id}`,
        {  when:token && token._id})
    return <>
            <Navbar className={styles.navbar} bg="primary" >
                <Container fluid>
                    <div className={styles.title}>Dashboard</div>
                    <Row md={12} className={styles.outCont}>
                    {loading || !seller ? <Col><Spinner style={{"color": "white"}} animation="border" /></Col> : <>
                        <Col className={styles.gearCont}>
                            <button type="submit" className={styles.btn}
                                onClick={() => setModalShow(true)}>
                                <BsGearFill size={45} className={styles.gear} />
                            </button>
                            <EditSeller
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                seller={seller}
                            />
                        </Col>
                        <Col className={styles.infoSeller}>
                            {userType == UserType.SELLER ?
                                <button ref={dropButtonRef} className={styles.btn}
                                    onClick={() => setshowDropdown(!showDropdown)}
                                >
                                    <BsPersonCircle size={48} className={styles.circle} />
                                    <div className={styles.name}>{seller.firstName} {seller.lastName}</div>
                                </button>
                                : <></>}
                        </Col>
                    </>}
                    </Row>
                </Container>
            </Navbar>
            <Dropdown
              btnRef={dropButtonRef}
              state={[showDropdown, setshowDropdown]}
            />
        </>
}
