import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import Orders from "components/Seller/Card/Orders"
import useFetchData from "hooks/useFetchData";
import Link from "next/link";
import gstyles from "/styles/Seller/globals.module.css";
import useSellerInvoice from "hooks/useSellerInvoice";
import { Row, Col, Modal, Button, Container, Table } from "react-bootstrap";
import { useState } from "react";


//function InvoiceLine({ invoice, setInvoiceState }) {
//  const { _id, date, address, items } = invoice
//  const [showModal, setShowModal] = useState(false)
//
//  const ModalLine = ({ title, value }) => <Row>
//    <Col lg="auto"> <h6>{title}</h6> </Col>
//    <Col lg="auto"> {value} </Col>
//  </Row>
//
//  const setInvoiceCloseModal = (value) => {
//    setInvoiceState(_id, value)
//    setShowModal(false)
//  }
//
//  return <>
//    <div className={gstyles.link} onClick={() => setShowModal(true)}>
//      <Row>
//        <Col lg="auto"> <h6 sytle={{ "lineHeight": "24px" }}>Order:</h6> </Col>
//        <Col lg="auto"> {`${_id}`} </Col>
//      </Row>
//    </div>
//  </>
//}

export default function InvoiceList() {
  const { search, loading, setInvoiceState } = useSellerInvoice()
  const [query, setQuery] = useState("")

  return <Layout sidebar={SELLER_SIDEBAR}>
    <Orders orders={search(query)} setOrderState={setInvoiceState} setQuery={setQuery} loading={loading} />
  </Layout>
}
