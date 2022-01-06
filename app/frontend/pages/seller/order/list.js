import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import ToggleDropdown from "components/Management/ToggleDropdown";
import useFetchData from "hooks/useFetchData";
import Link from "next/link";
import gstyles from "/styles/Seller/globals.module.css";
import useSellerInvoice from "hooks/useSellerInvoice";
import { Row, Col, Modal, Button, Container } from "react-bootstrap";
import { useState } from "react";

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

function InvoiceLine({ invoice, setInvoiceState }) {
  const { _id, date, address, items } = invoice
  const [showModal, setShowModal] = useState(false)

  const ModalLine = ({ title, value }) => <Row>
    <Col lg="auto"> <h6>{title}</h6> </Col>
    <Col lg="auto"> {value} </Col>
  </Row>

  const setInvoiceCloseModal = (value) => {
    setInvoiceState(_id, value)
    setShowModal(false)
  }

  return <>
    <div className={gstyles.link} onClick={() => setShowModal(true)}>
      <Row>
        <Col lg="auto"> <h6 sytle={{ "lineHeight": "24px" }}>Order:</h6> </Col>
        <Col lg="auto"> {`${_id}`} </Col>
      </Row>
    </div>
    <Modal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" onHide={() => setShowModal(false)} centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"> {`Order ${_id}`} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalLine title="Order Date:" value={new Date(date).toLocaleDateString("en-GB")} />
        <ModalLine title="Order State:" value={`'${invoice.state}'`} />
        <ModalLine title="Contact:" value={address.contact} />
        <ModalLine title="Address:" value={address.address} />
        <ModalLine title="Postal Code: " value={address.postal_code} />
        <ModalLine title="Nif:" value={address.nif} />
        <h6>Items:</h6>
        <Container>
          {items.map(item => <ItemLine key={item._id} item={item} />)}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {invoice.state === "processing" ? <Button onClick={() => setInvoiceCloseModal("sent")}>Mark as Sent</Button>
          : invoice.state === "sent" ? <Button onClick={() => setInvoiceCloseModal("complete")}>Mark as Complete</Button>
            : invoice.state === "complete" ? <></>//<Button onClick={() => setInvoiceCloseModal("processing")}>Mark as Processing</Button>
            : <Button onClick={() => setInvoiceCloseModal("processing")}>Mark as Processing</Button>
        }
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default function InvoiceList() {
  const { invoices, loading, setInvoiceState } = useSellerInvoice()

  return <Layout sidebar={SELLER_SIDEBAR} isLoading={loading}>
    <h3>Manage Orders</h3>
    {!loading && <>
      <br />
      <ToggleDropdown title={<h4>Processing Orders</h4>}>
        {invoices.filter(i => i.state !== "sent" && i.state !== "complete").map(invoice => 
          <InvoiceLine key={invoice._id} invoice={invoice} setInvoiceState={setInvoiceState}/>)}
      </ToggleDropdown>
      <ToggleDropdown title={<h4>Sent Orders</h4>}>
        {invoices.filter(i => i.state === "sent").map(invoice => 
          <InvoiceLine key={invoice._id} invoice={invoice} setInvoiceState={setInvoiceState}/>)}
      </ToggleDropdown>
      <ToggleDropdown title={<h4>Complete Orders</h4>}>
        {invoices.filter(i => i.state === "complete").map(invoice => 
          <InvoiceLine key={invoice._id} invoice={invoice} setInvoiceState={setInvoiceState}/>)}
      </ToggleDropdown>
    </>}
  </Layout>
}
