import { useContext } from "react"
import { Row, Col } from "react-bootstrap"

import Layout from "../components/Layout"

import styles from '../styles/account.module.css'
import TokenContext from "./Context/TokenContext"

const Account = (props) => {
    const selected = props.selected
    const { token } = useContext(TokenContext)
    const menu = [
        { id: "info", text: "Account Information" },
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
    //console.assert(menu.some(i => i.id === selected), "No account menu item has been selected.")
    return (
        <Layout categories={props.categories}>
            <Row>
                <Col xs={3}>
                    <h3>{`Hi${(token??{}).clientInfo ? `, ${token.clientInfo.firstName}` : ""}`}</h3> <br />
                    {menu[0]["html"]} <br />
                    {menu[1]["html"]} <br />
                    {menu[2]["html"]} <br />
                </Col>
                <Col>
                    {props.children}
                </Col>
            </Row>
        </Layout>
    )
}

export default Account