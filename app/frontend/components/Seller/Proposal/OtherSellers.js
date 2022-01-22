import SellerCard from "../Card"
import styles from 'styles/Seller/proposal/othersellers.module.css'
import { Table, Spinner } from "react-bootstrap"
import useFetchData from "hooks/useFetchData"
import {BsCaretUpFill, BsCaretDownFill} from "react-icons/bs" 


function OtherSellersLine({ proposal, propP }) {
    const { _id, seller_id, price, shipping } = proposal
    const { data: seller, loading } =
      useFetchData(`${process.env.NEXT_PUBLIC_HOST}/seller/${seller_id}`)
  
    return <tr >
      <td> {loading ? <Spinner animation="border" size="sm" />
        : <span> {seller.firstName} {seller.lastName}</span>
      } </td>
      <td> {loading ? <Spinner animation="border" size="sm" />
        : seller.companyName
      } </td>
      <td> {`${price}€`} </td>
      <td> {`${shipping}€`} </td>
      <td>
          {price - propP.price >=0 ? 
          <span className={styles.negative}> <BsCaretDownFill size={22} />{Math.abs(price - propP.price )}</span> : 
          <span className={styles.positive}> <BsCaretUpFill size={22}/>{Math.abs(price - propP.price )}</span> }
      </td>
    </tr>
  }



export default function OtherSeller({ proposals, proposalP,  ...props }) {
    return <SellerCard title={"Other Sellers"}  className={styles.panel_details} {...props}>
                <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Seller</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Shipping</th>
                        <th>Variation</th>
                      </tr>
                    </thead>
                    <tbody>
                    {(proposals).map(proposal =>
                        proposal.seller_id != proposalP.seller_id &&
                        <OtherSellersLine  proposal={proposal} propP={proposalP} />)}
                    </tbody>
                </Table>
        </SellerCard>
  }