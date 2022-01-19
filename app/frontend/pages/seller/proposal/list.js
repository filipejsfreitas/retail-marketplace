import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import useFetchData from "hooks/useFetchData";
import Link from "next/link";
import { useState, useContext } from "react";
import gstyles from "/styles/Seller/globals.module.css";
import TokenContext from "components/Context/TokenContext";
import useSellerProposals from "hooks/Seller/useSellerProposals";
import Form from 'react-bootstrap/Form'

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

  const { proposals, search, loading } = useSellerProposals(token && token._id)
  const [query, setQuery] = useState("")

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={loading}>
    <h3>Manage Proposals</h3>
    <br />
    <SearchBar setQuery={setQuery}/>
    <div style={{ "display": "flex", "flexDirection": "column" }}>
      {search(query).map((proposal) => (
        <ProposalProductName key={proposal._id} proposal={proposal}>
          {proposal._id}
        </ProposalProductName>
      ))}
    </div>

  </Layout>
}
