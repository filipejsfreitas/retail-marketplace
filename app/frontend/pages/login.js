import Link from 'next/link'

import { Container, Button, Form } from "react-bootstrap"

import { BsGoogle } from 'react-icons/bs'

import Logo from "../components/Logos/Logo"

import styles from "../styles/login.module.css"


export default function Login() {
  return (
    <>
      <Container fluid className={styles.main} >
          <Container className={styles.edges} />

          <Container className={styles.center}>

            {/*Without this Container the image does not render, maybe a nextjs bug */}
            <Container className={styles.imgContainer}><Logo /></Container> 

            <Container fluid className={styles.formContainer}>

              <Button variant="primary" size="lg" className={styles.btn}>
                <BsGoogle size={25} style={{position:"relative", top:"-2px"}} /> Login with Google
              </Button>
              <div className={styles.break} ><span className={styles.breakText}>or log in with your email</span></div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button variant="primary" size="lg" className={styles.btn}>
                  Login
                </Button>
              </Form>

            </Container>

            <Link href="/register">
              <a className={styles.registerLink}>New to Retail Marketplace?</a>
            </Link>

          </Container>

          <Container className={styles.edges} />
      </Container>
    </>

  )
}
