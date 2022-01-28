import SellerCard from "../Card"
import { ResponsiveBar } from "@nivo/bar"
import styles from 'styles/Seller/proposal/soldtoday.module.css'
import { BsIcon } from "components/Management/Layout"
import { Row } from "react-bootstrap"
import { BsBoxSeam } from "react-icons/bs";


export default function SoldToday({product, proposal, invoices, ...props }) {

    const today = new Date().toISOString().slice(0,10)
    
    const sold = 0;
    for (let i = 0; i < invoices.length; i++) {
        let dateInv = invoices[i].date.slice(0,10); 
        if(invoices[i].state == "complete" && dateInv===today)
          for (let j = 0; j < invoices[i].items.length; j++) {
            if( invoices[i].items[j].product_id == product._id )
              sold++;
          }
    }
    return <SellerCard title={"Sold Today"}  className={styles.panel_details} {...props}>
            <Row>
                <div className={styles.row}>
                <BsBoxSeam className={styles.icon}/>
                </div>
            </Row>
            <Row>
                <div className={styles.stock}>     
                   {sold}
                </div>
            </Row>
        </SellerCard>
  }