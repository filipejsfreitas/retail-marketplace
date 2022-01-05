import Account from "components/Account"
import Error from "next/error";
import { Container, Row, Col, Spinner } from "react-bootstrap"
import useFetchData from "hooks/useFetchData"
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

import addrstyles from 'styles/Account/address.module.css'

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";
import { useState } from "react";
import { useRouter } from "next/router";

function OrderItem({ item }) {
    const { data: product, loading }
        = useFetchData(`${process.env.NEXT_PUBLIC_HOST}/product/${item.product_id}`, { default: {} })
    console.debug(item)
    const Sep = () => <Col lg="auto">{"|"}</Col>

    return <Row>
        <Col lg="auto"> <h6 style={{ "lineHeight": "24px" }}>{"State:"}</h6> </Col>
        <Col lg="auto"> {item.state} </Col>
        {!loading && <> <Sep/> <Col lg="auto"> {product.name} </Col> </>}
    </Row>
}

function OrderItems({ items }) {
    const [show, setShow] = useState(undefined)
    const { isReady } = useRouter()
    return <Row>
        <a className={addrstyles.back_btn} onClick={() => setShow(!show)}>
            <Col lg="auto"> <h6 style={{ "lineHeight": "24px" }}>Products</h6> </Col>
            <Col lg="auto"> {!show ? <BsCaretDownFill /> : <BsCaretUpFill />}</Col>
        </a>
        {(show === undefined || !isReady) ? <></> : <Container hidden={!show} style={{ "marginLeft": "10px" }}>
            {items.map(item => <OrderItem item={item} />)}
        </Container>}
    </Row>
}

function OrderField({title, value}){
    return <Row>
        <Col lg="auto"> <h6 style={{ "lineHeight": "24px" }}>{title}</h6> </Col>
        <Col lg="auto"> {value} </Col>
    </Row>
}

function Order({ order }) {
    const [hidden, setHidden] = useState(true)
    //console.debug(order.items)
    return <div>
        <a className={addrstyles.back_btn} onClick={() => setHidden(!hidden)}>
            <Col lg="auto"> {hidden ? <BsCaretDownFill /> : <BsCaretUpFill />}</Col>
            <Col lg="auto"><h5>Order nº {order._id}</h5></Col>
        </a>
        <Container hidden={hidden ?? true}>
            <OrderField title={"Address:"} value={order.address.name}/>
            <OrderField title={"Date:"} value={new Date(order.date).toLocaleString('en-GB')}/>
            <OrderField title={"Cost:"} value={order.total.toString() + "€"}/>
            <OrderItems items={order.items}/>
        </Container>
    </div>
}

export default function AccountInfo({ categories }) {
    if( !categories )
        return (<Error statusCode={503} />)

    const { data: orders, loading } =
        useFetchData(`${process.env.NEXT_PUBLIC_HOST}/client/invoice`, { default: [] })
    
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
