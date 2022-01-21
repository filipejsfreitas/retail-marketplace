import { Card, Spinner } from "react-bootstrap"

import { BsArrowUp, BsArrowDown, BsArrowUpShort, BsArrowDownShort, BsFillExclamationTriangleFill } from "react-icons/bs"
import styles from "styles/Seller/card.module.css"

export function SimpleCard({ title, value, oldvalue, newvalue, description, icon, className }) {
    const diff = parseFloat((Math.max(newvalue, oldvalue) / Math.min(newvalue, oldvalue) - 1) *
        (newvalue > oldvalue ? 100 : -100)).toFixed(2)
    const valuedesc = (diff < -0.1 && "decrease")
        || (diff > -0.1 && "increase")
        || "maintain"
    const colorClass = (diff < -10 && styles.simple_card_percentage_red)
        || (diff < 0 && styles.simple_card_percentage_yellow)
        || (diff > 10 && styles.simple_card_percentage_green)
        || (styles.simple_card_percentage_green_light)
    const iconDiff = (diff < -10 && <BsArrowDown />)
        || (diff < 0 && <BsArrowDownShort />)
        || (diff > 10 && <BsArrowUp />)
        || (<BsArrowUpShort />)

    return <div className={`${styles.simple_card} ${className || ""}`}>
        <div>
            <div>
                {title}
            </div>
            <div>
                <h4>{value}</h4>
            </div>
            <div style={{ "display": "flex", "flex-direction": "row", "align-items": "center" }}>
                <div className={colorClass} style={{ "marginRight": "5px" }}>
                    {iconDiff}
                    {`${diff}%`}
                </div>
                {`${valuedesc} ${description}`}
            </div>
        </div>
        <div className={styles.simple_card_icon}>
            {icon}
        </div>
    </div>
}

export default function SellerCard({ children, title, injectTitle, loading, failed, ...props }) {
    return <Card {...props} style={{
        "filter": "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))",
        "border": "1px solid #EAEDF2",
        "border-radius": "10px",
    }}>
        <Card.Header>
            {title && <h4> {title} </h4>}
            {injectTitle}
        </Card.Header>
        <Card.Body style={{
            "width": "100%",
            "height": "90%",
            "overflow-x": "auto",
            "overflow-y": "auto",
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