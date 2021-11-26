import Account from "components/Account"
import AccountPanel from "components/AccountPanel"

export default function AccountAddress() {
    return (
        <Account selected="address">
            <h4>My Addresses</h4>
            <AccountPanel title="Default Shipping Address" fields={
                [
                    [{ label: "Name:" }, { label: "Phone Number:" }],
                    [{ label: "Country:"}, { label: "City:" }],
                    [{ label: "Address:"}],
                    [{ label: "ZIP code:" }, {label: "Number/Floor:"}],
                    [{ label: "NIF:"}],
                ]
            } />

            <AccountPanel title="New Shipping Address" fields={
                [
                    [{ label: "Name:" }, { label: "Phone Number:" }],
                    [{ label: "Country:"}, { label: "City:" }],
                    [{ label: "Address:"}],
                    [{ label: "ZIP code:" }, {label: "Number/Floor:"}],
                    [{ label: "NIF:"}],
                ]
            } />

        </Account>
    );
}