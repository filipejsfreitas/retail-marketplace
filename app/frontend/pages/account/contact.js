import Account from "components/Account"
import AccountPanel from "components/AccountPanel"

export default function AccountContact() {
    return (
        <Account selected="contact">
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