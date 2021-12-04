import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelForm } from "components/AccountPanel"
import { Row, Col, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

export default function AccountAddress({ categories }) {
    return (
        <Account categories={categories} selected="address">
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