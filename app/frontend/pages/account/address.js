import Account from "components/Account"
import { Row, Col, Form, Container, Spinner } from "react-bootstrap"
import styles from 'styles/Account/address.module.css'
import Error from "next/error"
import { useState, useEffect, useRef } from "react"
import { BsXLg, BsPlusLg, BsPenFill, BsCheckLg, BsXOctagonFill } from "react-icons/bs";
import useAddress from "hooks/useAddress"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

function AddressTitle(props) {
    return <Row>
        <Col lg="2"><h5>Name</h5></Col>
        <Col lg="2"><h5>Address</h5></Col>
        <Col lg="2"><h5>Postal Code</h5></Col>
        <Col lg="2"><h5>Contact</h5></Col>
        <Col lg="2"><h5>Nif</h5></Col>
        <Col lg="auto"><BsXLg className={styles.hidden_btn} /></Col>
        <Col lg="auto"><BsXLg className={styles.hidden_btn} /></Col>
    </Row>
}

function FromAddress(props) {
    const address = props.address
    const [edit, setEdit] = useState(false)
    return edit ? <EditAddress {...props} setEdit={setEdit} /> : <Row>
        <Col lg="2">{address.name}</Col>
        <Col lg="2">{address.address}</Col>
        <Col lg="2">{address.postal_code}</Col>
        <Col lg="2">{address.contact}</Col>
        <Col lg="2">{address.nif}</Col>
        <Col lg="auto">{<BsPenFill className={styles.btn} onClick={() => setEdit(true)} />}</Col>
        <Col lg="auto"><BsXLg className={styles.btn} onClick={async () => {
            props.removeAddress(address._id)
        }} /></Col>
    </Row>
}

function EditAddress(props) {
    const refs = { name: useRef(), address: useRef(), postal_code: useRef(), contact: useRef(), nif: useRef() }
    const [disabled, setDisabled] = useState(false)
    const disable = () => { setDisabled(true) }
    const enable = () => { setDisabled(false); Object.keys(refs).map(key => refs[key].current.value = "") }

    useEffect(() => {
        if (props.address) Object.keys(refs).map(key => refs[key].current.value = props.address[key])
    }, [])

    return <Row>
        <Col lg="2"><Form.Control ref={refs.name} disabled={disabled} size="sm" /></Col>
        <Col lg="2"><Form.Control ref={refs.address} disabled={disabled} size="sm" /></Col>
        <Col lg="2"><Form.Control ref={refs.postal_code} disabled={disabled} size="sm" /></Col>
        <Col lg="2"><Form.Control ref={refs.contact} disabled={disabled} size="sm" /></Col>
        <Col lg="2"><Form.Control ref={refs.nif} disabled={disabled} size="sm" /></Col>
        <Col lg="auto"><BsCheckLg className={props.address ? styles.btn : styles.hidden_btn} onClick={async () => {
            if (!Object.values(refs).every(v => v.current.value)) return
            disable()
            const address = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
            props.editAddress(props.address._id, address)
            enable()
            props.setEdit(false)
        }} />
        </Col>
        <Col lg="auto">
            {props.address && <BsXOctagonFill className={styles.btn} onClick={() => {
                props.setEdit(false)
            }} />}
            {!props.address && <BsPlusLg className={styles.btn} onClick={async () => {
                if (!Object.values(refs).every(v => v.current.value)) return
                disable()
                const address = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
                await props.addAddress(address)
                enable()
            }} />}
        </Col>
    </Row>
}

export default function AccountAddress({ categories }) {
    if (!categories)
        return <Error statusCode={503} />

    const { addresses, loading, pending, remove: removeAddress, add: addAddress, edit: editAddress } =
        useAddress()

    return (
        <Account categories={categories} selected="address">
            <Row>
                <Col lg="auto"><h4>My Addresses</h4></Col>
                {(loading || pending) ? <Col lg="auto"><Spinner animation="border" size="sm" /></Col> : undefined}
            </Row>
            <Container className={styles.address_panel}>
                <AddressTitle />
                {addresses.sort((a1, a2) => a1._id > a2._id)
                    .map(addr => <FromAddress key={`address-${addr._id}`}
                        removeAddress={removeAddress} editAddress={editAddress}
                        address={addr} />)
                }
                <EditAddress addAddress={addAddress} />
            </Container>
        </Account>
    );
}

// This function gets called at build time on server-side.
// Next.js will attempt to re-generate the page:
// - When a request comes in
// - At most once every X seconds, X being the value in the 
// revalidate const.
// In development (npm run dev) this function is called on every 
// request
export async function getStaticProps() {

    const categories = await fetchCategories();
    const revTime = revalidateTime()

    return {
        props: {
            categories,
        },

        revalidate: revTime,
    }
}