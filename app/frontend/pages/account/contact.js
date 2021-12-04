import Account from "components/Account"
import AccountPanel from "components/AccountPanel"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

export default function AccountContact({ categories }) {
    return (
        <Account categories={categories} selected="contact">
            <h4>My Contacts</h4>
            <AccountPanel title="Contact Information" fields={ 
                [
                    //[{ label: "First Name:" }, { label: "Last Name:" }],
                    //[{ label: "Email:"}],
                    //[{ label: "Phone Number:"}]
                ]
            }>
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