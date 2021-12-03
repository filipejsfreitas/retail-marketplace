import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelDescription, AccountPanelOpenOrderButtons } from "components/AccountPanel"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

export default function AccountInfo({ categories }) {
    return (
        <Account categories={categories} selected="order">
            <h4>Account Information</h4>
            <AccountPanel title="Order #1234"
                fields={
                    [
                        [
                            <AccountPanelDescription label="Name:" text="Test"/>,
                            <AccountPanelDescription label="State:" text="Shipping"/>
                        ],
                        [
                            <AccountPanelDescription label="Date:" text="10/10/10"/>,
                            <AccountPanelDescription label="Total:" text="123€"/>
                        ],
                    ]
                } >
                <AccountPanelOpenOrderButtons />
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
