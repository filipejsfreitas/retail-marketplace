import { Container, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap"
import { useRef, useState } from "react"
import { useRouter } from "next/router"


import Logo from "../../components/Logos/Logo"

import styles from "styles/register/registerSeller.module.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Register() {
  const refs = {
    email: useRef(), password: useRef(), passwordConfirmation: useRef(),
    firstName: useRef(), lastName: useRef(),
    companyName: useRef(), tin: useRef(), companyPhoneNumber: useRef(), customerServiceEmail: useRef(),
  }
  const router = useRouter()

  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      setLoading(true)
      const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
      var rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/register/seller`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
      if (rep.ok){
        router.replace("/login/")
      } else {
        setLoading(false)
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
            <div className={styles.break} ><span className={styles.breakText}>Seller Information</span></div>
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
                  </Form.Group>
                </Col>
              </Row>

              <Row >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control ref={refs.email} type="email" placeholder="name@example.com" required />
                </Form.Group>
                {undefined && <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    required />
                </Form.Group>}
                <Form.Group className="mb-3" controlId="formBasicPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control ref={refs.password} type="password" placeholder="Password" required aria-describedby="passwordHelpBlock" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPass">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control ref={refs.passwordConfirmation} type="password" placeholder="Confirm Password" required />
                </Form.Group>
              </Row>

              <div className={styles.break} ><span className={styles.breakText}>Company Information</span></div>
              <Row >
                <Form.Group className="mb-3" controlId="formBasicCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control ref={refs.companyName} type="text" placeholder="Company Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTIN">
                  <Form.Label>Tax Identification Number (TIN)</Form.Label>
                  <Form.Control ref={refs.tin} type="text" placeholder="TIN" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCompanyEmail">
                  <Form.Label>Customer service's email </Form.Label>
                  <Form.Control ref={refs.customerServiceEmail} type="email" placeholder="name@example.com" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCompanyPhone">
                  <Form.Label>Company Phone Number</Form.Label>
                  <PhoneInput
                    ref={refs.companyPhoneNumber}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}
                    required />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button hidden={loading} type="submit" variant="primary" size="lg" className={styles.btn}>
                Register
              </Button>
            </Form>
            <div hidden={!loading} style={{ "display": "flex", "justifyContent": "center" }}>
              <Spinner animation="border" />
            </div>
            <br />
            <Alert hidden={!showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
              The registration failed.
            </Alert>
          </Container>
        </Container>
        <Container className={styles.edges} />
      </Container>
    </>
  );
}

