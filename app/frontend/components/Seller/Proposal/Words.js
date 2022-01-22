import SellerCard from "../Card"
import { ResponsiveBar } from "@nivo/bar"
import styles from 'styles/Seller/proposal/words.module.css'
import { ListGroup, ListGroupItem } from "react-bootstrap"


export default function Words({product, proposal, invoices, ...props }) {
    const words=[
        "cenas", "cenas2", "cenas3", "cenas4", "cenas5", "cenas6"
    ]
    return <SellerCard title={"Most Used Words"}  className={styles.panel_details} {...props}>
           <ListGroup variant="flush">
                {words.map((key, value) => (
                    <ListGroupItem key={value}>
                        <div> 
                            <span className={styles.name} >{key}</span> 
                        </div>
                    </ListGroupItem>
                ))}
                </ListGroup>
        </SellerCard>
  }