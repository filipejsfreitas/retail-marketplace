import { Row, Col } from "react-bootstrap"

import Layout from "../components/Layout"

import styles from '../styles/account.module.css'

const Account = (props) => {
    const selected = props.selected
    const menu = [
        { id: "info", text: "Account Information" },
        { id: "contact", text: "My Contacts" },
        { id: "address", text: "My Addresses" },
        { id: "order", text: "My Orders" },
    ].map((x) => {
        const disabled = x["id"] === selected
        x["html"] =
            <a href={"/account/" + x["id"]} disabled={disabled}>
                <button className={styles.button} disabled={disabled}>
                    <h4> {x["text"]} </h4>
                </button>
            </a>
        return x;
    })
    console.assert(menu.some(i => i.id === selected), "No account menu item has been selected.")
    return (
        <Layout>
            <Row>
                <Col xs={3}>
                    <h3>Hi, Name</h3> <br />
                    {menu[0]["html"]} <br />
                    {menu[1]["html"]} <br />
                    {menu[2]["html"]} <br />
                    {menu[3]["html"]} <br />
                </Col>
                <Col>
                </Col>
            </Row>
        </Layout>
    )
}

export default Account