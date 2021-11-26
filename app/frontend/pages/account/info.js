import Account from "components/Account"
import AccountPanel from "components/AccountPanel"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import styles from 'styles/account.module.css'

export default function AccountInfo() {
    return (
        <Account selected="info">
            <h4>Account Information</h4>
            <div class={styles.panel}>
                <h4>Contact Information</h4>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group as={Row} noGutters={true} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label lg="auto" column>First Name:</Form.Label>
                                <Col><Form.Control type="fname" disabled="true" /></Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Row} noGutters={true} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label lg="auto" column>Last Name:</Form.Label>
                                <Col><Form.Control type="lname" disabled="true" /></Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} noGutters={true} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label lg="auto" column>Email:</Form.Label>
                                <Col><Form.Control type="email" disabled="true" /></Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group as={Row} noGutters={true} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label lg="auto" column>Phone Number:</Form.Label>
                                <Col><Form.Control type="phone" disabled="true" /></Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row noGutters={true}>
                        <Col></Col>
                        <Col lg="auto" hidden="true">
                            <Button variant="primary" className={styles.btn_panel}>Cancel</Button>
                        </Col>
                        <Col lg="auto" hidden="true">
                            <Button variant="primary" className={styles.btn_panel}>Save</Button>
                        </Col>
                        <Col lg="auto">
                            <Button variant="primary" className={styles.btn_panel}>Edit</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Account>
    );
}