import { useState, useEffect } from "react"
import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import ToggleDropdown from "components/Management/ToggleDropdown"
import { Container, Modal, Button } from "react-bootstrap"
import { BsCheckLg, BsDashLg } from "react-icons/bs";

import styles from "/styles/Admin/seller_list.module.css"


function ConfirmModal(props) {
    return <Modal show={props.modal.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.modal.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>{props.modal.body}</h5>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {
                props.modal.submit()
                props.handleClose()
            }} variant="primary" type="submit"> Confirm </Button>
            <Button onClick={() => {props.handleClose()}}>Close</Button>
        </Modal.Footer>
    </Modal>
}

function Seller(props) {
    return <div className={styles.seller}>
        <h6>{props.seller.email}</h6>
        {props.seller.state === "pending" ? <BsCheckLg onClick={() => props.setModal({
            show: true, title: "Confirm Approval",
            body: `Are you sure you want to approve ${props.seller.email}?`,
            submit: () => {
                console.log(`${props.seller.email} approved.`)
                var newSellers = props.sellers.filter(s => s != props.seller)
                newSellers.push({...props.seller, state: "approved"})
                props.setSellers(newSellers)
            }
        })} /> : <></>}
        <BsDashLg onClick={() => props.setModal({
            show: true, title: "Confirm Removal",
            body: `Are you sure you want to remove ${props.seller.email}?`,
            submit: () => {
                console.log(`${props.seller.email} removed.`)
                props.setSellers(props.sellers.filter(s => s != props.seller))
            }
        })}/>
    </div>
}

export default function ProductAdd() {
    const [confirmModal, setConfirmModal] =
        useState({ show: false, title: "", body: "", submit: (e) => e })
    const [sellers, setSellers] = useState([])
    useEffect(async () => {
        setSellers([
            { email: "seller1@email.com", state: "approved" },
            { email: "seller2@email.com", state: "pending" },
            { email: "seller3@email.com", state: "approved" },
        ])
    }, [])
    const makeSeller = (s,i) => <Seller key={`key-seller-${i}`} seller={s} sellers={sellers} setSellers={setSellers} setModal={setConfirmModal}/>
    return <Layout sidebar={ADMIN_SIDEBAR}>
        <h3>Manage Sellers</h3>
        <br />
        <Container>
            <ToggleDropdown title={<h4>Approved Sellers</h4>}>
                {sellers.filter(s => s.state === "approved")
                    .map((s, i) => makeSeller(s,i))}
            </ToggleDropdown>
            <br />
            <ToggleDropdown title={<h4>Pending Sellers</h4>}>
                {sellers.filter(s => s.state === "pending")
                    .map((s, i) => makeSeller(s,i))}
            </ToggleDropdown>
        </Container>
        <ConfirmModal modal={confirmModal} handleClose={() => setConfirmModal({...confirmModal, show: false})}/>
    </Layout>
}