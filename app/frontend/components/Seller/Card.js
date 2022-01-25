import { Card, Spinner } from "react-bootstrap"

import { BsArrowUp, BsArrowDown, BsArrowUpShort, BsArrowDownShort, BsFillExclamationTriangleFill } from "react-icons/bs"
import styles from "styles/Seller/card.module.css"

export function SimpleCard({ title, value, oldvalue, newvalue, description, icon, loading, className }) {
    const diff = parseFloat(100 * newvalue / oldvalue).toFixed(2)
    const valuedesc = (newvalue < oldvalue && "decrease")
        || (newvalue > oldvalue && "increase")
        || "maintain"
    const colorClass = (newvalue < oldvalue && diff > 10 && styles.simple_card_percentage_red)
        || (newvalue < oldvalue && styles.simple_card_percentage_yellow)
        || (newvalue > oldvalue && diff > 10 && styles.simple_card_percentage_green)
        || (styles.simple_card_percentage_green_light)
    const iconDiff = (newvalue < oldvalue && diff > 10 && <BsArrowDown />)
        || (newvalue < oldvalue && <BsArrowDownShort />)
        || (newvalue > oldvalue && diff > 10 && <BsArrowUp />)
        || (<BsArrowUpShort />)

    return <div className={`${styles.simple_card} ${className || ""}`}>
        <div>
            <div>
                {title}
            </div>
            {oldvalue && newvalue && !loading && <>
                <div>
                    <h4>{value}</h4>
                </div>
                <div style={{ "display": "flex", flexDirection: "row", alignItems: "center" }}>
                    <div className={colorClass} style={{ "marginRight": "5px" }}>
                        {iconDiff}
                        {`${diff}%`}
                    </div>
                    {`${valuedesc} ${description}`}
                </div>
            </>}
        </div>
        <div className={styles.simple_card_icon}>
            {loading ? <Spinner animation="border" />
            : !(oldvalue && newvalue) ? <BsFillExclamationTriangleFill/>
            : icon
            }
        </div>
    </div>
}

export default function SellerCard({ children, title, injectTitle, loading, failed, ...props }) {
    return <Card {...props} style={{
        "filter": "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))",
        "border": "1px solid #EAEDF2",
        "borderRadius": "10px",
    }}>
        <Card.Header>
            {title && <h4> {title} </h4>}
            {injectTitle}
        </Card.Header>
        <Card.Body style={{
            "width": "100%",
            "height": "90%",
            "overflowX": "auto",
            "overflowY": "auto",
        }}>
            {failed ? <div className={styles.card_failed}>
                <BsFillExclamationTriangleFill />
            </div>
            : loading ? <div className={styles.card_loading}>
                    <Spinner animation="border" />
                </div>
            : children}
        </Card.Body>
    </Card>
}