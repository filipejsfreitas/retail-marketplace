import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'

export default function AccountAddress(props) {

    const fields =
        props.fields.map((row, i) => {
            const cols = row.map((col, j) => {
                return <Col key={"col-" + j}>
                    {col}
                </Col>
            })
            return <Row key={"row-" + i}>{cols}</Row>
        })

    return (
        <div className={styles.panel}>
            <h4>{props.title}</h4>
            <Container>
                {fields}
                {props.children}
            </Container>
        </div>
    )
}

export function AccountPanelForm(props) {
    //console.assert(props.label, "Missing label field on " + AccountPanelForm.name)
    return <Form.Group as={Row} nogutters="true" className="mb-3" controlId="formHorizontalEmail">
            <Form.Label lg="auto" column>{props.label}</Form.Label>
            <Col><Form.Control type="fname" disabled={true} /></Col>
        </Form.Group>
}

export function AccountPanelDescription(props) {
    console.assert(props.label, "Missing label field on " + AccountPanelDescription.name)
    console.assert(props.text, "Missing text field on " + AccountPanelDescription.name)
    return <div>
        <h5>{props.label}</h5> 
        <h6 style={{"font-weight": "normal"}}>{props.text}</h6>
    </div>
}

export function AccountPanelEditButtons(props) {
    const [isEditing, setEditing] = useState(false);

    return <Row nogutters="true">
        <Col></Col>
        <Col lg="auto" hidden={!isEditing}>
            <Button
                variant="primary" className={styles.btn_panel}
                onClick={() => setEditing(false)}
            >
                Cancel
            </Button>
        </Col>
        <Col lg="auto" hidden={!isEditing}>
            <Button variant="primary" className={styles.btn_panel}>Save</Button>
        </Col>
        <Col lg="auto" hidden={isEditing}>
            <Button
                variant="primary" className={styles.btn_panel}
                onClick={() => setEditing(true)}
            >
                Edit
            </Button>
        </Col>
    </Row>
}

export function AccountPanelOpenOrderButtons(props) {
    console.assert(props.orderno, "Missing order number for details button.")

    return <Row nogutters="true">
        <Col></Col>
        <Col lg="auto">
            <a href={props.orderno === undefined ? "/404" : "/orders/" + props.orderno}>
                <Button variant="primary" className={styles.btn_panel} >
                    Details
                </Button>
            </a>
        </Col>
    </Row>
}