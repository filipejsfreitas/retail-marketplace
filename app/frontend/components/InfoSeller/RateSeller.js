import React from 'react'
import {Modal,Form,Col,FloatingLabel, Button} from 'react-bootstrap';
import { useRouter } from 'next/router'
import styles from 'styles/infoseller.module.css'


const RateSeller = (props) =>{ 
    const router = useRouter()
    const [scoreQ1, setScoreQ1] = React.useState(0);
    const [scoreQ2, setScoreQ2] = React.useState(0);

    function handleSubmit(event) {
      event.preventDefault();
    }

    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Rate Seller
            <div className={styles.rateinfo}>(Answer the questions where <b>1</b> is very bad and <b>5</b> is very good)</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="rateQuestion1">
        <FloatingLabel 
          controlId="rateQuestion1" 
          value={scoreQ1} 
          className={styles.sellerRateQuestion}>
            Are you satisfied with the delivery time?
            <div key="question1" className={styles.sellerRateCheck} >
                <Form.Check
                  inline
                  label="1"
                  name="group2"
                  type="radio"
                  id="id1"
                  onChange={(e) => setScoreQ1(1)}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group2"
                  type="radio"
                  id="id2"
                  onChange={(e) => setScoreQ1(2)}

                />
                <Form.Check
                  inline
                  name="group2"
                  label="3"
                  type="radio"
                  id="id3"
                  onChange={(e) => setScoreQ1(3)}
                />
                <Form.Check
                  inline
                  name="group2"
                  label="4"
                  type="radio"
                  id="id4"
                  onChange={(e) => setScoreQ1(4)}
                />
                <Form.Check
                  inline
                  name="group2"
                  label="5"
                  type="radio"
                  id="id5"
                  onChange={(e) => setScoreQ1(5)}
                />
            </div>
            </FloatingLabel>
        </Form.Group>
        </Form>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="rateQuestion2A">
            <FloatingLabel 
              controlId="rateQuestion2" 
              value={scoreQ2}
              className={styles.sellerRateQuestion}>
              Are you satisfied with the post-purchase service?
            <div key="question2"className={styles.sellerRateCheck}>
                <Form.Check
                  inline
                  label="1"
                  name="group2"
                  type="radio"
                  id="id1"
                  onChange={(e) => setScoreQ2(1)}
                />
                <Form.Check
                  inline
                  label="2"
                  name="group2"
                  type="radio"
                  id="id2"
                  onChange={(e) => setScoreQ2(2)}

                />
                <Form.Check
                  inline
                  name="group2"
                  label="3"
                  type="radio"
                  id="id3"
                  onChange={(e) => setScoreQ2(3)}
                />
                <Form.Check
                  inline
                  name="group2"
                  label="4"
                  type="radio"
                  id="id4"
                  onChange={(e) => setScoreQ2(4)}
                />
                <Form.Check
                  inline
                  name="group2"
                  label="5"
                  type="radio"
                  id="id5"
                  onChange={(e) => setScoreQ2(5)}
                />
            </div>
            </FloatingLabel>
        </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = { async () => {
                console.log(`${scoreQ1}`)
                console.log(`${scoreQ2}`)
                //if(scoreQ1 && scoreQ2){
                //  fetch(`${process.env.NEXT_PUBLIC_HOST}/product/${props.id}/comment`, {
                //      method: 'POST',
                //      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                //      body: JSON.stringify({ title: title, comment: comment, score: parseInt(rateProduct) })
                //  }).then(() => router.reload())
                //    .catch((error) => console.log(error))
                //}
            }} variant="primary" type="submit"> Submit </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
}

export default RateSeller;