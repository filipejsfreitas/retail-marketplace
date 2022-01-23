import SellerCard from "../Card"
import styles from 'styles/Seller/proposal/recommended.module.css'
import { BsCaretUpFill ,BsCaretDownFill} from "react-icons/bs";


export default function Recommended({proposal, recommendedPrice, ...props }) {
    console.log(recommendedPrice)
    const priceR = parseInt(recommendedPrice.priceSugestion);
    const priceC = parseInt(proposal.price);
    const diff =  priceR - priceC; 
    const perc = parseInt(Math.abs(diff/priceC*100));
    return <SellerCard title={"Recommended"}  className={styles.panel_details} {...props}>
            <div className={styles.circle}> 
            <div className={styles.text}>
                {priceR}
            </div>
            <p>{diff <0 ? 
                <span className={styles.negative}> <BsCaretDownFill size={22} />{perc}%</span> : 
                <span className={styles.positive}> <BsCaretUpFill size={22}/>{perc}%</span> }</p>
            </div>
        </SellerCard>
  }