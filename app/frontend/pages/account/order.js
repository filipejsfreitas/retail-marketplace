import Account from "components/Account"
import Error from "next/error";
import { Container, Row, Col, Spinner } from "react-bootstrap"
import useFetchData from "hooks/useFetchData"

import addrstyles from 'styles/Account/address.module.css'

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

function Order({ order }) {
    return <div>
        <h5>Order nº {order._id}</h5>
        <Container>
            <Row>
                <Col lg="auto"> <h6 style={{"lineHeight": "24px"}}>Address:</h6> </Col>
                <Col lg="auto"> {order.address.name} </Col>
            </Row>
            <Row>
                <Col lg="auto"> <h6 style={{"lineHeight": "24px"}}>Date:</h6> </Col>
                <Col lg="auto"> {new Date(order.date).toLocaleString('en-GB')} </Col>
            </Row>
            <Row>
                <Col lg="auto"> <h6 style={{"lineHeight": "24px"}}>Cost:</h6> </Col>
                <Col lg="auto"> {order.total.toString() + "€"} </Col>
            </Row>
        </Container>
    </div>
}

export default function AccountInfo({ categories }) {
    if( !categories )
        return (<Error statusCode={503} />)

    const { data: orders, loading } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/client/invoice`, { default: [] })
    
    
    console.debug(orders)

    return <Account categories={categories} selected="order">
        <Row>
            <Col lg="auto"><h4>My Orders</h4></Col>
            {loading ? <Col lg="auto"><Spinner animation="border" size="sm" /></Col> : undefined}
        </Row>
        <Container className={addrstyles.address_panel}>
            {orders.map(order => <Order key={order._id} order={order}/>)}
        </Container>
    </Account>
}

// This function gets called at build time on server-side.
// Next.js will attempt to re-generate the page:
// - When a request comes in
// - At most once every X seconds, X being the value in the 
// revalidate const.
// In development (npm run dev) this function is called on every 
// request
export async function getStaticProps() {
  
    const categories = await fetchCategories();
    const revTime = revalidateTime()
  
    return {
      props: {
        categories,
      },
  
      revalidate: revTime, 
    }
  }
