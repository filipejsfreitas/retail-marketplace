import SellerCard from "../Card"
import { ResponsiveBar } from "@nivo/bar"
import styles from 'styles/Seller/proposal/currentstock.module.css'
import { BsIcon } from "components/Management/Layout"
import { Row } from "react-bootstrap"

export default function CurrentStock({ proposal, ...props }) {
    
    return <SellerCard title={"Current Stock"}  className={styles.panel_details} {...props}>
            <Row>
                <div className={styles.row}>
                <BsIcon className={styles.icon}/>
                </div>
            </Row>
            <Row>
                <div className={styles.stock}>     
                   {proposal.stock}
                </div>
            </Row>
        </SellerCard>
  }