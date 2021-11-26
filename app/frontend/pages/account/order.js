import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { AccountPanelOpenOrderButtons } from "components/AccountPanel"

export default function AccountInfo() {
    return (
        <Account selected="info">
            <h4>Account Information</h4>
            <AccountPanel title="Order #1234"
                fields={
                    [
                        [{ label: "Name:" }, { label: "State:" }],
                        [{ label: "Date:" }, { label: "Total:" }],
                    ]
                } >
                <AccountPanelOpenOrderButtons />
            </AccountPanel>
        </Account>
    );
}
