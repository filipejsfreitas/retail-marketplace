import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import { BsPlusLg } from "react-icons/bs";
import { useState, useContext } from "react";
import TokenContext from "components/Context/TokenContext";
import TabCard from 'components/Seller/TabCard'
import useSellerProposals from "hooks/Seller/useSellerProposals";
import useAllProducts from "hooks/Seller/useAllProducts";
import { Form, Spinner, Table } from 'react-bootstrap'

import styles from 'styles/Seller/proposal/list.module.css'

function ProposalLine({ proposal }) {
  const { product, stock, price } = proposal
  return <tr>
    <td>{product.name}</td>
    <td>{product.category.name}</td>
    <td>{`${price}€`}</td>
    <td>{`${stock}`}</td>
    <td>{`_`}</td>
  </tr>
}

function ProposalsTable({ proposals }) {
  return <Table striped hover responsive>
    <thead>
      <tr>
        <th>PRODUCT</th>
        <th>CATEGORY</th>
        <th>PRICE</th>
        <th>#</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {proposals.map(proposal => <ProposalLine key={proposal._id} proposal={proposal} />)}
    </tbody>
  </Table>
}

function ProductLine({ product }) {
  return <tr>
    <td>{product.name}</td>
    <td>{product.category.name}</td>
    <td>{`_`}</td>
  </tr>
}

function ProductsTable({ products }) {
  return <div class={styles.table}>
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>CATEGORY</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => <ProductLine key={product._id} product={product} />)}
      </tbody>
    </Table>
  </div>
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
            {loading ? <Spinner />
              : <ProposalsTable proposals={search(query)} />}
          </div>
        </>,
      },
      {
        tab: <h4><BsPlusLg /></h4>,
        content: <>
          <ProductsTable products={
            searchProducts(query)
              .filter(product => search("").every(proposal => proposal.product._id != product._id))
          } />
        </>,
      },
    ]}>
      <SearchBar setQuery={setQuery} />
    </TabCard>
  </Layout>
}
