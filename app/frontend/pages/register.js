import { Container, Button, Form, Row, Col } from "react-bootstrap"
import { useState } from "react"


import Logo from "../components/Logos/Logo"

import styles from "../styles/register.module.css"

export default function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Container fluid className={styles.main} >
        <Container className={styles.edges} />
          <Container className={styles.center}>
            <Container className={styles.imgContainer}><Logo/></Container> 
            <Container fluid className={styles.formContainer}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid input!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid input!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row >
                  <Form.Group className="mb-3" controlId="formBasicFirstEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required />
                    <Form.Control.Feedback type="invalid">
                      Invalid Email!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicFirstPass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required aria-describedby="passwordHelpBlock" />
                    <Form.Text id="passwordHelpBlock" muted>
                      Your password must be 8-20 characters, contain letters, numbers, special characters.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Invalid Passord!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicFirstConfirmPass">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required />
                    <Form.Control.Feedback type="invalid">
                      Invalid Passord!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" size="lg" className={styles.btn}>
                    Register
                </Button>
              </Form>
            </Container>
          </Container>
        <Container className={styles.edges} />
      </Container> 
    </>
  );
}

