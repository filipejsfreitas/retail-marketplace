import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import { BsPlusLg, BsThreeDots } from "react-icons/bs";
import { useState, useContext } from "react";
import TokenContext from "components/Context/TokenContext";
import TabCard from 'components/Seller/TabCard'
import useSellerProposals from "hooks/Seller/useSellerProposals";
import ActionSelector from 'components/Seller/ActionSelector'
import AddProductModal from "components/Seller/AddProductModal";
import useAllProducts from "hooks/Seller/useAllProducts";
import { Form, Spinner, Table } from 'react-bootstrap'
import DottedOption from 'components/common/DottedOption'
import Link from "next/link";

import styles from 'styles/Seller/proposal/list.module.css'

function ProposalLine({ proposal }) {
  const { _id, product, stock, price } = proposal
  const [show, setShow] = useState(false)
  return <tr>
    <td>{product.name}</td>
    <td>{product.category.name}</td>
    <td>{`${price}€`}</td>
    <td>{`${stock}`}</td>
    <td>
      <DottedOption style={{ "scale": "1.5" }} onClick={() => setShow(s => !s)} />
      <ActionSelector show={show} setShow={setShow} options={[
        <Link href={`/seller/proposal/${_id}`}>{"View Proposal"}</Link>
      ]} />
    </td>
  </tr>
}

function ProposalsTable({ proposals }) {
  return <Table striped hover responsive>
    <thead>
      <tr>
        <th>PRODUCT</th>
        <th>CATEGORY</th>
        <th>PRICE</th>
        <th>STOCK</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {proposals.map(proposal => <ProposalLine key={proposal._id} proposal={proposal} />)}
    </tbody>
  </Table>
}

function ProductLine({ product, setProposalProduct }) {
  const [show, setShow] = useState(false)
  return <tr>
    <td>{product.name}</td>
    <td>{product.category.name}</td>
    <td>
      <DottedOption style={{ "scale": "1.5" }} onClick={() => setShow(s => !s)} />
      <ActionSelector show={show} setShow={setShow} options={[
        <div onClick={() => {
          setShow(s => false)
          setProposalProduct(product)
        }}>{"Make Proposal"}</div>,
        <Link href={`/product/${product._id}`}>{"View Product"}</Link>,
      ]} />
    </td>
  </tr>
}

function ProductsTable({ products, setProposalProduct }) {
  return <div className={styles.table}>
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>CATEGORY</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => <ProductLine key={product._id} product={product} setProposalProduct={setProposalProduct} />)}
      </tbody>
    </Table>
  </div>
}

function SearchBar({ setQuery, ...props }) {
  return <Form.Control placeholder="Search" {...props} onChange={e => {
    if (setQuery)
      setQuery(e.target.value)
  }} />
}

export default function ProposalList() {
  const { token } = useContext(TokenContext)

  const { search, addProposal, loading } = useSellerProposals(token && token._id)
  const { search: searchProducts } = useAllProducts()
  const [query, setQuery] = useState("")
  const [proposalProduct, setProposalProduct] = useState(undefined)

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
          } setProposalProduct={setProposalProduct} />
        </>,
      },
    ]}>
      <SearchBar setQuery={setQuery} />
    </TabCard>
    <AddProductModal product={proposalProduct} setProduct={setProposalProduct} addProposal={addProposal} />
  </Layout>
}
