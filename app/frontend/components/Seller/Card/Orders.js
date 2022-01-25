import { useState } from "react"
import Link from "next/link"
import { Form, Table, ProgressBar, Modal, Row, Col, Container } from "react-bootstrap"
import SellerCard from "components/Seller/Card"
import ActionSelector from 'components/Seller/ActionSelector'
import DottedOption from 'components/common/DottedOption'
import useFetchData from "hooks/useFetchData";

import styles from "styles/Seller/orders.module.css"
import gstyles from "/styles/Seller/globals.module.css";

function ItemLine({ item }) {
  const { data: product } = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${item.product_id}`)
  return <div>
    <Link href={`/seller/proposal/${item.proposal_id}`}>
      <a className={gstyles.link}>
        {`${item.quantity} units`}
        {product ? `, ${product.name}` : ""}
      </a>
    </Link>
  </div>
}

function OrderModal({ order, setOrder }) {
  const ModalLine = ({ title, value }) => <Row>
    <Col lg="auto"> <h6>{title}</h6> </Col>
    <Col lg="auto"> {value} </Col>
  </Row>

  return <Modal show={order} size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={() => setOrder(undefined)} centered >
    {order && <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"> {`Order ${order._id}`} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalLine title="Order Date:" value={new Date(order.date).toLocaleDateString("en-GB")} />
        <ModalLine title="Order State:" value={`'${order.state}'`} />
        <ModalLine title="Contact:" value={order.address.contact} />
        <ModalLine title="Address:" value={order.address.address} />
        <ModalLine title="Postal Code: " value={order.address.postal_code} />
        <ModalLine title="Nif:" value={order.address.nif} />
        <h6>Items:</h6>
        {<Container>
          {order.items.map(item => <ItemLine key={item._id} item={item} />)}
        </Container>}
      </Modal.Body>
    </>
    }
  </Modal>
}

function OrderLine({ order, setOrderState, setInspectOrder }) {
  const [show, setShow] = useState(false)

  const progressbar = (order.state === "processing" && { variant: "danger", now: 33, state: "Processing", class: styles.red, _next: "sent", next: "Sent" })
    || (order.state === "sent" && { variant: "warning", now: 66, state: "Sent", class: styles.yellow, _next: "complete", next: "Complete" })
    || (order.state === "complete" && { variant: "success", now: 100, state: "Delivered", _next: "unknown", })
    || { variant: "info", now: 0, state: "Other", _next: "processing", next: "Processing" }

  const options = [<div onClick={() => {
    setShow(() => false)
    setInspectOrder(order)
  }}>{"Inspect Order"}</div>]
  if (progressbar.next)
    options.push(<div onClick={() => {
      setShow(() => false)
      setOrderState(order._id, progressbar._next)
    }}>{`Mark as ${progressbar.next}`}</div>)

  return <tr>
    <td>{order._id}</td>
    <td>{new Date(order.date).toLocaleDateString("en-GB")}</td>
    <td>{order.items.reduce((acc, { quantity }) => acc + quantity, 0)}</td>
    <td>{`${order.items.reduce((acc, { price }) => acc + price, 0)}€`}</td>
    <td style={{ "paddingBottom": "0px" }}>
      <ProgressBar striped variant={progressbar.variant} now={progressbar.now} />
      <div className={`${styles.progress_bar_text} ${progressbar.class}`}>{progressbar.state}</div>
    </td>
    <td>
      <DottedOption onClick={() => setShow(true)} />
      <ActionSelector show={show} setShow={setShow} options={options} />

    </td>
  </tr>
}

function OrdersTable({ orders, setOrderState, setInspectOrder }) {
  return <div>
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Item #</th>
          <th>Total</th>
          <th>Progress</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => <OrderLine key={order._id} order={order} setOrderState={setOrderState} setInspectOrder={setInspectOrder} />)}
      </tbody>
    </Table>
  </div>
}

export default function Orders({ orders, setQuery, setOrderState, ...props }) {
  const [inspectOrder, setInspectOrder] = useState(undefined)

  return <SellerCard className={styles.panel_orders} injectTitle={
    <div style={{ "display": "flex" }}>
      <h4>Orders</h4>
      <div style={{ marginLeft: "auto" }}>
        <Form.Control placeholder="Search" onChange={e => {
          if (setQuery)
            setQuery(e.target.value)
        }} />
      </div>
    </div>
  }{...props}>
    <OrdersTable orders={orders} setOrderState={setOrderState} setInspectOrder={setInspectOrder} />
    <OrderModal order={inspectOrder} setOrder={setInspectOrder} />
  </SellerCard>
}