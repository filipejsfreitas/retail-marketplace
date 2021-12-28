import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelEditButtons, AccountPanelForm } from "components/AccountPanel"
import { Row, Col, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'
import Error from "next/error"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

export default function AccountInfo({ categories }) {
    if( !categories )
        return (<Error statusCode={503} />)

    return (
        <Account categories={categories} selected="info">
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