import { Card, Spinner } from "react-bootstrap"

import { BsArrowUp, BsArrowDown, BsArrowUpShort, BsArrowDownShort, BsFillExclamationTriangleFill } from "react-icons/bs"
import styles from "styles/Seller/card.module.css"

export function SimpleCard({
    titleLeft, titleRight,
    descriptionLeft, descriptionRight,
    previous, current, next, valueToString,
    icon, loading, className }) {
    const failed = !(previous && current && next) && !loading
    const showable = !loading && !failed
    const diffPrev = parseFloat(current/previous - 1).toFixed(2)
    const diffNext = parseFloat(current/next - 1).toFixed(2)

    const prevs =
        (diffPrev < -0.1 && {
            description: "decrease",
            color: styles.simple_card_percentage_red,
            icon: <BsArrowDown />
        })
        || (diffPrev < 0 && {
            description: "decrease",
            color: styles.simple_card_percentage_yellow,
            icon: <BsArrowDownShort />
        })
        || (diffPrev > 0.1 && {
            description: "increase",
            color: styles.simple_card_percentage_green_light,
            icon: <BsArrowUp />
        })
        || {
            description: "increase",
            color: styles.simple_card_percentage_green_light,
            icon: <BsArrowUpShort />
        }
    prevs.diffPercentage = Math.abs(diffPrev*100)

    const nexts =
        (diffNext < -0.1 && {
            description: "decrease",
            color: styles.simple_card_percentage_red,
            icon: <BsArrowDown />
        })
        || (diffNext < 0 && {
            description: "decrease",
            color: styles.simple_card_percentage_yellow,
            icon: <BsArrowDownShort />
        })
        || (diffNext > 0.1 && {
            description: "increase",
            color: styles.simple_card_percentage_green_light,
            icon: <BsArrowUp />
        })
        || {
            description: "increase",
            color: styles.simple_card_percentage_green_light,
            icon: <BsArrowUpShort />
        }
    nexts.diffPercentage = Math.abs(diffNext*100)

    return <div className={`${styles.simple_card} ${className || ""}`}>
        {/* LEFT SIDE */}
        <div>
            <div style={{ "color": "#D1D1D1" }}>
                {titleRight}
            </div>
            {showable && <>
                <h4>{valueToString(next)}</h4>
                <div style={{ "display": "flex", flexDirection: "row", alignItems: "center" }}>
                    <div className={prevs.color} style={{ "marginRight": "5px" }}>
                        {prevs.icon}
                        {`${parseInt(prevs.diffPercentage)}%`}
                    </div>
                    {`${prevs.description} ${descriptionLeft}`}
                </div>
            </>
            }
        </div>

        {/* MIDDLE */}
        <div className={styles.simple_card_icon}>
            {loading ? <Spinner animation="border" />
                : failed ? <BsFillExclamationTriangleFill />
                    : icon
            }
        </div>

        {/* RIGHT SIDE */}
        <div style={{"display": "flex", "flexDirection": "column", "alignItems": "end"}}>
            <div style={{ "color": "#D1D1D1" }}>
                {titleLeft}
            </div>
            {showable && <>
                <h4>{valueToString(current)}</h4>
                <div style={{ "display": "flex", flexDirection: "row", alignItems: "center" }}>
                    <div className={nexts.color} style={{ "marginRight": "5px" }}>
                        {nexts.icon}
                        {`${parseInt(nexts.diffPercentage)}%`}
                    </div>
                    {`${descriptionRight}`}
                </div>
            </>}
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