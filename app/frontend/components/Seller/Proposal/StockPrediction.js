import SellerCard from "../Card"
import { ResponsiveBar } from "@nivo/bar"
import styles from 'styles/Seller/proposal/stockprediction.module.css'


export default function StockPrediction({ predictions, ...props }) {
    const getPeriod = (i, prev) => {
      const now = new Date()
      now.setDate(now.getDate() + i)
      return `${now.getDate()}/${now.getMonth() + 1}`
    }
    const data = predictions ?  predictions.Stock_prevision.map((count, i) => ({
      period: getPeriod(i),
      units: count,
    })) : []
    
    return <SellerCard title={"Stock Prediction"}  className={styles.panel_details} {...props}>
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
    </SellerCard>
  }