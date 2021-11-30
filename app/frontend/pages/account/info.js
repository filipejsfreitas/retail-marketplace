import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelEditButtons, AccountPanelForm } from "components/AccountPanel"
import { Row, Col, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'

export default function AccountInfo() {
    return (
        <Account selected="info">
            <h4>Account Information</h4>
            <AccountPanel title="Contact Information"
                fields={
                    [
                        [<AccountPanelForm label="First Name:" />, <AccountPanelForm label="Last Name:" />],
                        [<AccountPanelForm label="Email:" />],
                        [<AccountPanelForm label="Phone Number:" />]
                    ]
                } >
                <Row nogutters="true"> <Col></Col>
                    <Col lg="auto" >
                        <a href={"/404"}>
                            <Button variant="primary" className={styles.btn_panel}> Edit </Button>
                        </a>
                    </Col>
                </Row>
            </AccountPanel>
            <AccountPanel title="Shipping Address"
                fields={
                    [
                        [<AccountPanelForm label="Name:" />, <AccountPanelForm label="Phone Number:" />],
                        [<AccountPanelForm label="Country:" />, <AccountPanelForm label="City:" />],
                        [<AccountPanelForm label="Address:" />],
                        [<AccountPanelForm label="ZIP code:" />, <AccountPanelForm label="Number/Floor:" />],
                        [<AccountPanelForm label="NIF:" />],
                    ]
                } >
                <Row nogutters="true"> <Col></Col>
                    <Col lg="auto" >
                        <a href={"/account/address"}>
                            <Button variant="primary" className={styles.btn_panel}> Edit </Button>
                        </a>
                    </Col>
                </Row>
            </AccountPanel>
            <AccountPanel title="Default Billing Address"
                fields={
                    [
                        [<AccountPanelForm label="Name:" />, <AccountPanelForm label="Phone Number:" />],
                        [<AccountPanelForm label="Country:" />, <AccountPanelForm label="City:" />],
                        [<AccountPanelForm label="Address:" />],
                        [<AccountPanelForm label="ZIP code:" />, <AccountPanelForm label="Number/Floor:" />],
                        [<AccountPanelForm label="NIF:" />],
                    ]
                } >
                <AccountPanelEditButtons />
            </AccountPanel>

        </Account>
    );
}