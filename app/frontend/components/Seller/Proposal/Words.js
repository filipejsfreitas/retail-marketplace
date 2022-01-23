import SellerCard from "../Card"
import { ResponsiveBar } from "@nivo/bar"
import styles from 'styles/Seller/proposal/words.module.css'
import { ListGroup, ListGroupItem } from "react-bootstrap"


export default function Words({feelings,loading, ...props }) {
  
    const words = []

    if(feelings && feelings.most_used_words){
        words = feelings.most_used_words;     {/*só descomentar quando estiver a dar -  feelings[0]*/}
    }

    return <SellerCard title={"Most Used Words"} failed={!loading && !feelings} className={styles.panel_details} {...props}>
           <ListGroup variant="flush">
            {/*trocar words por feelings */}
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