import Link from 'next/link'
import { useState, useRef } from "react"
import useToken from "hooks/useToken"
import { useRouter } from 'next/router'

import { Container, Button, Form, Alert, Spinner } from "react-bootstrap"

import { BsGoogle } from 'react-icons/bs'

import Logo from "../components/Logos/Logo"

import styles from "../styles/login.module.css"


export default function Login() {
  const refs = { email: useRef(), password: useRef() }
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false)

  const { token, setToken } = useToken()
  if (token)
    router.replace("/")

  return (
    <>
      <Container fluid className={styles.main} >
        <Container className={styles.edges} />

        <Container className={styles.center}>

          {/*Without this Container the image does not render, maybe a nextjs bug */}
          <Container className={styles.imgContainer}><Logo /></Container>

          <Container fluid className={styles.formContainer}>

            <Button variant="primary" size="lg" className={styles.btn}>
              <BsGoogle size={25} style={{ position: "relative", top: "-2px" }} /> Login with Google
            </Button>
            <div className={styles.break} ><span className={styles.breakText}>or log in with your email</span></div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={refs.email} type="email" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={refs.password} type="password" required />
              </Form.Group>
              <div hidden={!loading} style={{ "display": "flex", "justify-content": "center" }}>
                <Spinner animation="border" />
              </div>
              <Button hidden={loading} variant="primary" size="lg" className={styles.btn} onClick={async () => {
                if (!Object.values(refs).every(v => v.current.value)) return
                setLoading(true)
                const req = Object.keys(refs).reduce((a, key) => ({ ...a, [key]: refs[key].current.value }), {})
                var rep = await fetch(`${process.env.NEXT_PUBLIC_HOST}/auth/login`, {
                  method: 'POST',
                  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                  body: JSON.stringify(req),
                })
                console.debug(rep)
                if (rep.ok) {
                  const json = await rep.json()
                  setToken(json)
                  router.replace("/")
                } else {
                  setShowAlert(true)
                  setLoading(false)
                }
              }}>
                Login
              </Button>
            </Form>

            <br />
            <Alert hidden={!showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
              The login failed.
            </Alert>
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
