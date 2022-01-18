import { Table } from "react-bootstrap"
import SellerCard from "components/Seller/Card"

import useFetchData from "hooks/useFetchData"

import styles from "styles/Seller/index.module.css"

function LowStockProposalsLine({ proposal }) {
  const { _id, stock, product_id, price } = proposal
  const { data: product, loading } =
    useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${product_id}`)

  return <tr >
    <td> {loading ? "" : product.name } </td>
    <td> {`${price}€`} </td>
    <td> {stock} </td>
    <td> ?? </td>
    <td> ## </td>
  </tr>
}

export default function LowStockProposals({ lowStockProposals }) {
  return <SellerCard className={styles.panel_lowstock}
    title={"Low Stock Proposals"}>
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>#</th>
          <th>Forecast</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {lowStockProposals.map(proposal =>
          <LowStockProposalsLine key={proposal._id} proposal={proposal}/>)}
      </tbody>
    </Table>
  </SellerCard>
}