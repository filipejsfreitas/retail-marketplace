import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelEditButtons } from "components/AccountPanel"

export default function AccountInfo() {
    return (
        <Account selected="info">
            <h4>Account Information</h4>
            <AccountPanel title="Contact Information"
                fields={
                    [
                        [{ label: "First Name:" }, { label: "Last Name:" }],
                        [{ label: "Email:" }],
                        [{ label: "Phone Number:" }]
                    ]
                } >
                <AccountPanelEditButtons/>
            </AccountPanel>
            <AccountPanel title="Default Shipping Address"
                fields={
                    [
                        [{ label: "Name:" }, { label: "Phone Number:" }],
                        [{ label: "Country:" }, { label: "City:" }],
                        [{ label: "Address:" }],
                        [{ label: "ZIP code:" }, { label: "Number/Floor:" }],
                        [{ label: "NIF:" }],
                    ]
                } >
                <AccountPanelEditButtons/>
            </AccountPanel>
            <AccountPanel title="Default Billing Address"
                fields={
                    [
                        [{ label: "Name:" }, { label: "Phone Number:" }],
                        [{ label: "Country:" }, { label: "City:" }],
                        [{ label: "Address:" }],
                        [{ label: "ZIP code:" }, { label: "Number/Floor:" }],
                        [{ label: "NIF:" }],
                    ]
                } >
                <AccountPanelEditButtons/>
            </AccountPanel>

        </Account>
    );
}