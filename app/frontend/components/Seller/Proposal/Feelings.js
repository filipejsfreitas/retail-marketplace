import SellerCard from "../Card"
import styles from 'styles/Seller/proposal/feelings.module.css'
import { BsBoxSeam } from "react-icons/bs";
import { Row } from "react-bootstrap"


export default function Feelings({feelings, loading, ...props }) {
    const positive = ["trust", "surprise", "positive", "joy"]
    const negative = ["negative", "sadness", "anger", "disgust" , "fear"]
    const neutral = ["anticipation"]
    const word1 =""
    const word2 =""
    
    if(feelings && feelings.sentiments){
        word1 = feelings.sentiments[0];     {/*só descomentar quando estiver a dar -  feelings[0]*/}
        word2 = feelings.sentiments[1];     {/*só descomentar quando estiver a dar -  feelings[1]*/}
    }

    const styleFeeling = (word) =>
        positive.includes(word) ? "#008000"
        : negative.includes(word) ? "#FF0000"
        : "#DBDB1D"

    return <SellerCard title={"Predominant Feelings"} failed={!loading && !feelings} className={styles.panel_details} {...props}>
            <div className={styles.row}>
                <span className={styles.text}>
                <p style={{"color": styleFeeling(word1) }}>{word1}</p>
                </span>
            </div>
            <div className={styles.line}></div>
            <div  className={styles.row}>     
                <span className={styles.text}>
                <p style={{"color": styleFeeling(word2) }}>{word2}</p>
                </span>              
            </div>
        </SellerCard>
  }

//anger
//fear
//anticipation
//trust
//surprise 
//sadness 
//joy
//disgust
//negative
//positive

