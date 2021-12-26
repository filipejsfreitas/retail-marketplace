import { useRouter } from 'next/router'
import Layout from "components/Management/Layout"
import { SELLER_SIDEBAR } from "components/Management/Layout"
import useFetchData from "hooks/useFetchData"
import { useRef, useState } from "react"
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import { BsBoxArrowUpRight } from "react-icons/bs"
import Link from 'next/link'

import gstyles from "styles/Seller/globals.module.css"

function EditableText({ refs, value, edit, as, rows }) {
    return edit ?
        <Form.Control as={as} rows={rows} ref={refs} size="sm" defaultValue={value} /> :
        <div style={{ "minHeight": "31px" }}>{value}</div>
}

function ProductInfo({ product, category }) {
    return <>
        <h3>Product Info:</h3> <br />
        <h5>Product Name:</h5>
        <Link href={`/product/${product._id}`}>
            <a className={gstyles.link} style={{ "display": "flex", "alignItems": "center" }}>
                {product.name} <BsBoxArrowUpRight />
            </a>
        </Link> 
        <br />
        <h5>Category:</h5>
        <div>{category.name} </div> <br />
        <h5>Description:</h5>
        <div>{product.description} </div> <br />
    </>
}

function ProposalInfo({ proposal, setProposal }) {
    const refs = { price: useRef(), shipping: useRef(), stock: useRef(), maxPerPurchase: useRef(), special_conditions: useRef() }
    const [edit, setEdit] = useState(false)
    const [disabled, setDisabled] = useState(false)
    return <>
        <h3>Proposal Info:</h3> <br />
        <h5>Price:</h5>
        <EditableText refs={refs.price} value={proposal.price} edit={edit} />
        <h5>Shipping:</h5>
        <EditableText refs={refs.shipping} value={proposal.shipping} edit={edit} />
        <h5>Stock:</h5>
        <EditableText refs={refs.stock} value={proposal.stock} edit={edit} />
        <h5>Maximum purchases per client:</h5>
        <EditableText refs={refs.maxPerPurchase} value={proposal.maxPerPurchase} edit={edit} />
        <h5>Special conditions:</h5>
        <EditableText refs={refs.special_conditions} value={proposal.special_conditions} edit={edit} as={"textarea"} />
        <br />
        <Row>
            <Col></Col>
            <Col lg="auto" hidden={!edit}>
                <Button variant="secondary" disabled={disabled} onClick={async () => {
                    if (!Object.entries(refs).every(([k, v]) => k == "special_conditions" || v.current.value)) return
                    setDisabled(true)
                    const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
                    req.price = parseFloat(parseFloat(req.price).toFixed(2))
                    req.shipping = parseFloat(parseFloat(req.shipping).toFixed(2))
                    req.maxPerPurchase = parseFloat(parseFloat(req.maxPerPurchase).toFixed(2))
                    req.stock = parseInt(req.stock)
                    const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/${proposal._id}`, {
                        method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                        body: JSON.stringify(req)
                    })
                    const json = await rep.json()
                    if (rep.ok) setProposal(json.data)
                    setEdit(false)
                    setDisabled(false)
                }}>Save</Button>
            </Col>
            <Col lg="auto">
                <Button variant="secondary" disabled={disabled} onClick={() => setEdit(e => !e)}>{edit ? "Cancel" : "Edit"}</Button>
            </Col>
        </Row>
    </>
}

export default function Proposal(props) {
    const router = useRouter()
    const { id } = router.query
    const { data: proposal, loading: loadingProposal, setData: setProposal } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/proposal/${id}`,
            { default: {} })
    const { data: product, loading: loadingProduct } =
        useFetchData(() => `${process.env.NEXT_PUBLIC_HOST}/product/${proposal.product_id}`,
            { default: {}, when: !loadingProposal })
    const { data: category, loading: loadingCategory } =
        useFetchData(() => `${process.env.NEXT_PUBLIC_HOST}/category/${product.category_id}`,
            { default: {}, when: !loadingProduct })

    return <Layout sidebar={SELLER_SIDEBAR} isLoading={loadingCategory}>
        <Container>
            <Row style={{ "minHeight": "500px" }}>
                <Col lg="6" style={{ "overflowWrap": "break-word" }}>
                    <ProductInfo product={product} category={category} />
                </Col>
                <Col lg="6" style={{ "overflowWrap": "break-word" }}>
                    <ProposalInfo proposal={proposal} setProposal={setProposal} />
                </Col>
            </Row>
            <br />
            <h3>Statistics:</h3>
            TODO: statistics from AI
        </Container>
    </Layout>
}