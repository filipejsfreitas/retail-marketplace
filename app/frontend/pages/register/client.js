import { Container, Button, Form, Row, Col, Alert } from "react-bootstrap"
import { useState, useRef } from "react"
import { useRouter } from 'next/router'

import Logo from "components/Logos/Logo"

import styles from "styles/register/client.module.css"

export default function Register() {
  const refs = { firstName: useRef(), lastName: useRef(), email: useRef(), password: useRef(), passwordConfirmation: useRef(), }
  const router = useRouter()

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
      var rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/register`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
      if (rep.ok){
        router.replace("/login/")
      } else {
        setShowAlert(true)
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Container fluid className={styles.main} >
        <Container className={styles.edges} />
        <Container className={styles.center}>
          <Container className={styles.imgContainer}><Logo /></Container>
          <Container fluid className={styles.formContainer}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      ref={refs.firstName}
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
                      ref={refs.lastName}
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
                  <Form.Control ref={refs.email} type="email" placeholder="name@example.com" required />
                  <Form.Control.Feedback type="invalid">
                    Invalid Email!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFirstPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref={refs.password} type="password" placeholder="Password" required aria-describedby="passwordHelpBlock" />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters, contain letters, numbers, special characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Invalid Passord!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFirstConfirmPass">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control ref={refs.passwordConfirmation} type="password" placeholder="Confirm Password" required />
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
            <br />
            <Alert hidden={!showAlert} variant="danger">
              The registration failed.
            </Alert>
          </Container>
        </Container>
        <Container className={styles.edges} />
      </Container>
    </>
  );
}

