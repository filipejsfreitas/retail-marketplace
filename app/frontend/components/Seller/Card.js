import { Card } from "react-bootstrap"

export default function SellerCard({ children, title, ...props }) {
    return <Card {...props} style={{
        "filter": "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))",
        "border": "1px solid #EAEDF2",
        "border-radius": "10px",
    }}>
        <Card.Header>
            <h4>
                {title}
            </h4>
        </Card.Header>
        <Card.Body style={{
            "width": "100%",
            "height": "90%",
            "overflow-y": "auto",
        }}>
            {children}
        </Card.Body>
    </Card>
}