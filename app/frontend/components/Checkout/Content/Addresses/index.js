import useFetchAuth from "hooks/useFetchAuth";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import styles from "styles/Checkout/Content/Addresses/Adresses.module.css"
import AddressItem from "./AddressItem";
import NewAddressItem from "./NewAddressItem"


const newAdd = {
  newAdd: true
}

export default function Addreses({state}) {
  const { fetchAuth: fetch} = useFetchAuth()
  const [selected, setSelected] = state;
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${process.env.NEXT_PUBLIC_HOST}/address/client`;

  // Funtion that constructs a grid with 3 items in each row
  const construct = () => {
    let pivot = 0;
    const rows = Array(Math.ceil(addresses.length/ 3));
    for (let i = 0; i < rows.length; i++) {
      rows[i] = (
        <Row className={styles.row} key={`row-${i}`}>
          {addresses.slice(pivot, pivot + 3).map((add) => (
            add.newAdd === true
            ?
            <NewAddressItem />
            :
            <AddressItem
              key={add._id}
              state={[selected, setSelected]}
              name={add.name}
              address={add.address}
              postal={add.postal_code}
              number={add.contact}
              id={add._id}
            />
          ))}
        </Row>
      );
      pivot = pivot + 3;
    }
    return rows;
  };

  useEffect(() => {
    const fetchApi = () => {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const addresses = json.data
          addresses.push(newAdd)
          setAddresses(addresses);
          setSelected(json.data[0]._id);
          setLoading(false);
        });
    };
    if (loading) fetchApi();
  }, [url, loading, setSelected, fetch]);

  return (
    <div className={styles.box}>
      <div className={styles.title}>Shipping</div>
      <div className={styles.items}>{construct()}</div>
    </div>
  );
}