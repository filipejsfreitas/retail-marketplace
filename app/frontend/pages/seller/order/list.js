import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import Orders from "components/Seller/Card/Orders"
import useFetchData from "hooks/useFetchData";
import Link from "next/link";
import styles from "/styles/Seller/orders.module.css";
import useSellerInvoice from "hooks/useSellerInvoice";
import { Row, Col, Modal, Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { Card } from "react-bootstrap"


function OrderStats({ orders }) {
  return <Card className={styles.panel_stats} style={{
    "filter": "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))",
    "border": "1px solid #EAEDF2",
    "border-radius": "10px",
  }}>
    <div className={`${styles.panel_box} ${styles.panel_box_border}`}>
      <h2>Orders</h2>
      <h2>{orders.length}</h2>
    </div>
    <div className={`${styles.panel_box} ${styles.panel_box_border}`}>
      <h2>Processing</h2>
      <h2>{orders.filter(o => o.state === "processing").length}</h2>
    </div>
    <div className={`${styles.panel_box} ${styles.panel_box_border}`}>
      <h2>Sent</h2>
      <h2>{orders.filter(o => o.state === "sent").length}</h2>
    </div>
    <div className={styles.panel_box}>
      <h2>Delivered</h2>
      <h2>{orders.filter(o => o.state === "complete").length}</h2>
    </div>
  </Card>
}

export default function InvoiceList() {
  const { invoices, search, loading, setInvoiceState } = useSellerInvoice()
  const [query, setQuery] = useState("")

  return <Layout sidebar={SELLER_SIDEBAR}>
    <OrderStats orders={invoices ?? []} />
    <br />
    <Orders orders={search(query)} setOrderState={setInvoiceState} setQuery={setQuery} loading={loading} />
  </Layout>
}
