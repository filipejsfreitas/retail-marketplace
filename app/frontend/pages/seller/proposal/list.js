import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useState, useContext } from "react";
import gstyles from "/styles/Seller/globals.module.css";
import TokenContext from "components/Context/TokenContext";
import TabCard from 'components/Seller/TabCard'
import useSellerProposals from "hooks/Seller/useSellerProposals";
import useAllProducts from "hooks/Seller/useAllProducts";
import { Form, Spinner } from 'react-bootstrap'

import styles from 'styles/Seller/proposal/list.module.css'

function ProposalProductName({ proposal }) {
  const { _id, product } = proposal

  return (
    <Link href={`/seller/proposal/${_id}`}>
      <a className={gstyles.link}>
        <h5>{product.name}</h5>
      </a>
    </Link>
  );
}

function SearchBar({ setQuery }) {
  return <Form.Control placeholder="Search" onChange={e => {
    if (setQuery)
      setQuery(e.target.value)
  }} />
}

export default function ProposalList() {
  const { token } = useContext(TokenContext)

  const { search, loading } = useSellerProposals(token && token._id)
  const { search: searchProducts } = useAllProducts()
  const [query, setQuery] = useState("")

  return <Layout sidebar={SELLER_SIDEBAR}>
    <TabCard className={styles.card} tabs={[
      {
        tab: <h4>Proposals</h4>,
        content: <>
          <div style={{ "display": "flex", "flexDirection": "column" }}>
            {loading ? <Spinner /> : search(query).map((proposal) => (
              <ProposalProductName key={proposal._id} proposal={proposal}>
                {proposal._id}
              </ProposalProductName>
            ))}
          </div>
        </>,
      },
      {
        tab: <h4><BsPlusLg /></h4>,
        content: <>
          {searchProducts(query).map((product) => <h5 key={product._id}>{product.name}</h5>)}
        </>,
      },
    ]}>
      <SearchBar setQuery={setQuery} />
    </TabCard>
  </Layout>
}
