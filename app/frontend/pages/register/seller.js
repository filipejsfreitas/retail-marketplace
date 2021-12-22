import { Container, Button, Form, Row, Col } from "react-bootstrap"
import { useState } from "react"


import Logo from "../../components/Logos/Logo"

import styles from "styles/register/registerSeller.module.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Register() {
  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState()
  
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
            <div className={styles.break} ><span className={styles.breakText}>Seller Information</span></div>
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
                    </Form.Group>
                  </Col>
                </Row>

                <Row >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                      required/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required aria-describedby="passwordHelpBlock" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicConfirmPass">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required />
                  </Form.Group>
                </Row>

                <div className={styles.break} ><span className={styles.breakText}>Company Information</span></div>
                <Row >
                  <Form.Group className="mb-3" controlId="formBasicCompanyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Company Name" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicTIN">
                    <Form.Label>Tax Identification Number (TIN)</Form.Label>
                    <Form.Control type="text" placeholder="TIN" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCompanyEmail">
                    <Form.Label>Customer service's email </Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCompanyPhone">
                  <Form.Label>Company Phone Number</Form.Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                      required/>
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

