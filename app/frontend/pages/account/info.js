import Account from "components/Account"
import { Row, Col, Button, Spinner, Container, Form } from "react-bootstrap"
import Error from "next/error"
import useClientInfo from "hooks/useClientInfo"
import { useState, useRef } from "react"

import addrstyles from 'styles/Account/address.module.css'

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

function EditableText({ refs, value, edit, as, rows }) {
    return edit ?
        <Form.Control as={as} rows={rows} ref={refs} size="sm" defaultValue={value} style={{ "marginLeft": "10px" }} /> :
        <div style={{ "minHeight": "31px", "marginLeft": "10px" }}>{value}</div>
}


export default function AccountInfo({ categories }) {
    if (!categories)
        return (<Error statusCode={503} />)

    const refs = { firstName: useRef(), lastName: useRef(), phoneNumber: useRef() }
    const { clientInfo, edit: editClientInfo, loading, pending } = useClientInfo()
    const [edit, setEdit] = useState(false)

    return (
        <Account categories={categories} selected="info">
            <Row>
                <Col lg="auto"><h4>Account Information</h4></Col>
                {(loading || pending) ? <Col lg="auto"><Spinner animation="border" size="sm" /></Col> : undefined}
            </Row>
            {loading ? <></> : <Container className={addrstyles.address_panel}>
                <h5>First Name:</h5>
                <EditableText refs={refs.firstName} value={clientInfo.firstName} edit={edit} />
                <h5>Last Name:</h5>
                <EditableText refs={refs.lastName} value={clientInfo.lastName} edit={edit} />
                <h5>Phone Number:</h5>
                <EditableText refs={refs.phoneNumber} value={clientInfo.phoneNumber} edit={edit} />
                <br />
                <Row hidden={loading || pending}>
                    <Col />
                    <Col hidden={edit} lg="auto">
                        <Button variant="secondary" onClick={() => setEdit(true)}>Edit</Button>
                    </Col>
                    <Col hidden={!edit} lg="auto">
                        <Button variant="secondary" onClick={async () => {
                            if (!Object.values(refs).every(v => v.current.value)) return
                            const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
                            await editClientInfo(req)
                            setEdit(false)
                        }}>Save</Button>
                    </Col>
                    <Col hidden={!edit} lg="auto">
                        <Button variant="secondary" onClick={() => setEdit(false)}>Cancel</Button>
                    </Col>
                </Row>
            </Container>}
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