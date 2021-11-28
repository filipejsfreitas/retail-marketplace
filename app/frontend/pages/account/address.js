import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelForm } from "components/AccountPanel"
import { Row, Col, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'

export default function AccountAddress() {
    return (
        <Account selected="address">
            <Row nogutters="true">
                <Col lg="auto"> <h4>My Addresses</h4> </Col>
                <Col></Col>
                <Col lg="auto"> <Button variant="primary" className={styles.btn_panel}> New Address </Button> </Col>
            </Row>
            <AccountPanel title="Default Shipping Address" fields={
                [
                    [<AccountPanelForm label="Name:" />, <AccountPanelForm label="Phone Number:" />],
                    [<AccountPanelForm label="Country:" />, <AccountPanelForm label="City:" />],
                    [<AccountPanelForm label="Address:" />],
                    [<AccountPanelForm label="ZIP code:" />, <AccountPanelForm label="Number/Floor:" />],
                    [<AccountPanelForm label="NIF:" />],
                ]
            } />

        </Account>
    );
}