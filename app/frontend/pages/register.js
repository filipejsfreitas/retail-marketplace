import { Container, Button, Form, Row, Col } from "react-bootstrap"

import Logo from "../components/Logo"

import styles from "../styles/login.module.css"


export default function Register() {
  return (
    <>
      <Container fluid className={styles.main} >
          <Container className={styles.edges} />

          <Container className={styles.center}>

            {/*Without this Container the image does not render, maybe a nextjs bug */}
            <Container className={styles.imgContainer}><Logo /></Container> 

            <Container fluid className={styles.formContainer}>
            
              <Form>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control type="text" placeholder="First Name"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type="text" placeholder="Last Name" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="phone" defaultValue="+351" />
                </Form.Group>


                <Button variant="primary" size="lg" className={styles.btn}>
                  Register
                </Button>
              </Form>

            </Container>

          </Container>

          <Container className={styles.edges} />
      </Container>
    </>

  )
}
