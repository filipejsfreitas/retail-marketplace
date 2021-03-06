import { useRouter } from "next/router";
import Layout, { SELLER_SIDEBAR } from "components/Management/Layout";
import useFetchData from "hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import { ResponsiveBar } from "@nivo/bar";
import ProposalDetails from "components/Seller/Proposal/ProposalDetails";
import StockPrediction from "components/Seller/Proposal/StockPrediction";
import CurrentStock from "components/Seller/Proposal/CurrentStock";
import gstyles from "styles/Seller/globals.module.css";
import styles from "styles/Seller/index.module.css"
import useFetchAuth from "hooks/useFetchAuth";
import Comments from "components/Seller/Proposal/Comments";
import OtherSeller from "components/Seller/Proposal/OtherSellers";
import SoldToday from "components/Seller/Proposal/SoldToday";
import Recommended from "components/Seller/Proposal/Recommended";
import Feelings from "components/Seller/Proposal/Feelings";
import Words from "components/Seller/Proposal/Words";

function EditableText({ refs, value, edit, as, rows }) {
  return edit ? (
    <Form.Control
      as={as}
      rows={rows}
      ref={refs}
      size="sm"
      defaultValue={value}
    />
  ) : (
    <div style={{ minHeight: "31px" }}>{value}</div>
  );
}

function ProductInfo({ product, category }) {
  return (
    <>
      <h3>Product Info:</h3> <br />
      <h5>Product Name:</h5>
      <Link href={`/product/${product._id}`}>
        <a
          className={gstyles.link}
          style={{ display: "flex", alignItems: "center" }}
        >
          {product.name} <BsBoxArrowUpRight />
        </a>
      </Link>
      <br />
      <h5>Category:</h5>
      <div>{category.name} </div> <br />
      <h5>Description:</h5>
      <div>{product.description} </div> <br />
    </>
  );
}

function ProposalInfo({ proposal, setProposal }) {
  const refs = {
    price: useRef(),
    shipping: useRef(),
    stock: useRef(),
    maxPerPurchase: useRef(),
    special_conditions: useRef(),
  };
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { fetchAuth } = useFetchAuth()
  return (
    <>
      <h3>Proposal Info:</h3> <br />
      <h5>Price:</h5>
      <EditableText refs={refs.price} value={proposal.price} edit={edit} />
      <h5>Shipping:</h5>
      <EditableText
        refs={refs.shipping}
        value={proposal.shipping}
        edit={edit}
      />
      <h5>Stock:</h5>
      <EditableText refs={refs.stock} value={proposal.stock} edit={edit} />
      <h5>Maximum purchases per client:</h5>
      <EditableText
        refs={refs.maxPerPurchase}
        value={proposal.maxPerPurchase}
        edit={edit}
      />
      <h5>Special conditions:</h5>
      <EditableText
        refs={refs.special_conditions}
        value={proposal.special_conditions}
        edit={edit}
        as={"textarea"}
      />
      <br />
      <Row>
        <Col></Col>
        <Col lg="auto" hidden={!edit}>
          <Button
            variant="secondary"
            disabled={disabled}
            onClick={async () => {
              if (
                !Object.entries(refs).every(
                  ([k, v]) => k == "special_conditions" || v.current.value
                )
              )
                return;
              setDisabled(true);
              const req = Object.keys(refs).reduce(
                (a, key) => ({ ...a, [key]: refs[key].current.value }),
                {}
              );
              req.price = parseFloat(parseFloat(req.price).toFixed(2));
              req.shipping = parseFloat(parseFloat(req.shipping).toFixed(2));
              req.maxPerPurchase = parseFloat(
                parseFloat(req.maxPerPurchase).toFixed(2)
              );
              req.stock = parseInt(req.stock);
              const rep = await fetchAuth(
                `${process.env.NEXT_PUBLIC_HOST}/proposal/${proposal._id}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(req),
                }
              );
              const json = await rep.json();
              if (rep.ok) setProposal(json.data);
              setEdit(false);
              setDisabled(false);
            }}
          >
            Save
          </Button>
        </Col>
        <Col lg="auto">
          <Button
            variant="secondary"
            disabled={disabled}
            onClick={() => setEdit((e) => !e)}
          >
            {edit ? "Cancel" : "Edit"}
          </Button>
        </Col>
      </Row>
    </>
  );
}

function StockPredictionBar({ predictions }) {
  const getPeriod = (i, prev) => {
    const now = new Date()
    now.setDate(now.getDate() + i)
    return `${now.getDate()}/${now.getMonth() + 1}`
  }
  const data = predictions.map((count, i) => ({
    period: getPeriod(i),
    units: count,
  }))

  return <div className={styles.panel}>
    <h5>Required Stock Prediction</h5>
    <div className={styles.panel_stock_prediction}>
      <ResponsiveBar
        data={data}
        keys={["units"]}
        indexBy="period" 
        margin={{ top: 25, right: 25, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        label={d => `${d.value}`}
      />
    </div>
  </div>
}
export default function Proposal(props) {

  const router = useRouter();
  const { id } = router.query;
  const {
    data: proposal,
    loading: loadingProposal,
    setData: setProposal,
  } = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/proposal/${id}`, {
    default: {},
  });
  const { data: product, loading: loadingProduct } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/product/${proposal.product_id}`,
    { default: {}, when: !loadingProposal }
  );

  const { data: recommendedPrice, loading: loadingRecommended } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/product/priceStats/${proposal.product_id}`,
    { default: {}, when: !loadingProposal }
  );

  const { data: category, loading: loadingCategory } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/category/${product.category_id}`,
    { default: {}, when: !loadingProduct }
  );

  const { data: proposals, loading: loadingProposals } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/proposal/product/${proposal.product_id}`,
    { default: {}, when: !loadingProposal }
  );

  const { data: invoices, loading: loadingInvoices } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/seller/invoice`,
    { default: {} }
  );

  const { data: evaluation, loading: loadingEvaluation } = useFetchData(
    () => `${process.env.NEXT_PUBLIC_HOST}/product/evaluation/${proposal.product_id}`,
    { default: {}, when: !loadingProposal }
  );

  const { data: stock_suggestions, loading: loadingStockSuggestions } =
    useFetchData(`${process.env.NEXT_PUBLIC_HOST}/proposal/${id}/stock_suggestions`)


  return (
    <Layout sidebar={SELLER_SIDEBAR} isLoading={loadingCategory}>
      <div className={styles.content}>
        <ProposalDetails product={product} category={category} proposal={proposal} invoices={invoices} loading={loadingInvoices}/>
        <OtherSeller proposals={proposals} proposalP={proposal} loading={loadingProposals}/>
        <Recommended proposal={proposal} recommendedPrice={recommendedPrice} loading={loadingRecommended}/>
        <SoldToday product={product}  proposal={proposal} invoices={invoices} loading={loadingInvoices}/>
        <StockPrediction predictions={stock_suggestions} loading={loadingStockSuggestions}/>
        <CurrentStock proposal={proposal}/>
        <Feelings feelings={evaluation} loading={loadingEvaluation}></Feelings>
        <Comments product={product}/>
        <Words feelings={evaluation} loading={loadingEvaluation}></Words>
      </div>
    </Layout>
  );
}
