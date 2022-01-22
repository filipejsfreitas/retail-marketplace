import { Table, Spinner } from "react-bootstrap"
import SellerCard from "components/Seller/Card"
import { BsPlusSquare, BsArrowRightSquare, BsFillExclamationTriangleFill } from "react-icons/bs";
import Link from "next/link";

import useFetchData from "hooks/useFetchData"
import useFetchAuth from "hooks/useFetchAuth";

import styles from "styles/Seller/index.module.css"
import { useEffect, useState } from "react";

function useStockSuggestion(proposal_id){
  const { fetchAuth: fetch } = useFetchAuth()

  const [stock, setStock] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if(!proposal_id) return
    const rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/proposal/${proposal_id}/stock_suggestions`)
    try {
      const json = await rep.json()
      setStock(json.data.Stock_prevision[0])
    } catch(e) {
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    stockSuggestion: stock,
    loading: loading,
  }
}

function LowStockProposalsLine({ proposal }) {
  const { _id, stock, product_id, price } = proposal
  const { data: product, loading } =
    useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${product_id}`)
  
  const { stockSuggestion, loading: loadingStockSuggestion } = useStockSuggestion(proposal._id)
  
  return <tr >
    <td> {loading ? <Spinner animation="border" size="sm" />
      : product.name
    } </td>
    <td> {`${price}€`} </td>
    <td> {stock} </td>
    <td> {(loadingStockSuggestion && <Spinner animation="border" size="sm" />)
      || stockSuggestion
      || <BsFillExclamationTriangleFill />}
    </td>
    <td>
      <div style={{ "display": "flex", "gap": "5px" }}>
        {/*<a > <BsPlusSquare /> </a>*/}
        <Link href={`seller/proposal/${_id}`}>
          <a>
            <BsArrowRightSquare />
          </a>
        </Link>
      </div>
    </td>
  </tr>
}

export default function LowStockProposals({ lowStockProposals, ...props }) {
  return <SellerCard className={styles.panel_lowstock}
    title={"Low Stock Proposals"} {...props}>
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>#</th>
          <th>Forecast #</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {(lowStockProposals ?? []).map(proposal =>
          <LowStockProposalsLine key={proposal._id} proposal={proposal} />)}
      </tbody>
    </Table>
  </SellerCard>
}