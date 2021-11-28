import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelDescription, AccountPanelOpenOrderButtons } from "components/AccountPanel"

export default function AccountInfo() {
    return (
        <Account selected="order">
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
