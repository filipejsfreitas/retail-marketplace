import { Form, Button, Dropdown, Container, Row, Col } from "react-bootstrap"
import SSRProvider from 'react-bootstrap/SSRProvider'
import ProductPreview from "components/Search/ProductPreview"
import Layout from "components/Layout"
import RemoveQuery from "components/Search/RemoveQuery"
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useRouter } from 'next/router'
import Error from "next/error"

import fetchCategories, { revalidateTime } from "helper/DynamicCategoriesHelper";

import styles from "styles/search.module.css"

function sort_by() {
    const router = useRouter()
    const opts = [
        { id: "relevance", text: "Relevance" },
        { id: "price", text: "Price" },
    ]
    const queried = opts.find(opt => opt.id === router.query["sort"])
    const active = queried || opts[0]
    return {
        active: active,
        checker: <SSRProvider>
            <DropdownButton id="dropdown-basic-button" title={"Sort By: " + active.text}>
                {opts.map(opt =>
                    <Dropdown.Item key={"sort-" + opt.id} onClick={() => {
                        router.replace({ pathname: router.pathname, query: { ...router.query, sort: opt.id } })
                    }
                    }>
                        {opt.text}
                    </Dropdown.Item>)
                }
            </DropdownButton>
        </SSRProvider>,
        unchecker: !queried ? <></> : <RemoveQuery query_id="sort" text={queried.text}></RemoveQuery>
    }
}

function price() {
    const router = useRouter()
    //console.log(router.query["min"])
    return {
        checker: <>
            <h4>Price</h4>
            <Form onSubmit={event => {
                event.preventDefault()
                router.query["min"] = event.target.min.value
                if (!router.query["min"]) delete router.query["min"]
                router.query["max"] = event.target.max.value
                if (!router.query["max"]) delete router.query["max"]
                router.replace({ pathname: router.pathname, query: router.query })
            }}>
                <Row>
                    <Col> <Form.Control name="min" type="number" placeholder="Min" /> </Col>
                    <Col> <Form.Control name="max" type="number" placeholder="Max" /> </Col>
                    <Col> <Button variant="primary" type="submit"> Go
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>,
        unchecker: <>
            {!router.query["min"] ? <></> : <RemoveQuery query_id="min" text={"Min price: " + router.query["min"]}></RemoveQuery>}
            {!router.query["max"] ? <></> : <RemoveQuery query_id="max" text={"Max price: " + router.query["max"]}></RemoveQuery>}
        </>
    }
}

function rating() {
    const router = useRouter()
    const opts = [
        { id: "0", text: "Any" },
        { id: "2", text: "2 Stars" },
        { id: "3", text: "3 Stars" },
        { id: "4", text: "4 Stars" },
    ]
    const queried = opts.find(opt => opt.id === router.query["rating"])
    const active = queried || opts[0]
    return {
        active: active,
        checker: <SSRProvider>
            <DropdownButton id="dropdown-basic-button" title={"Minimum rating:" + active.text}>
                {opts.map(opt =>
                    <Dropdown.Item key={"rating-" + opt.id} onClick={() => {
                        router.replace({ pathname: router.pathname, query: { ...router.query, rating: opt.id } })
                    }
                    }>
                        {opt.text}
                    </Dropdown.Item>)
                }
            </DropdownButton>
        </SSRProvider>,
        unchecker: !queried ? <></> : <RemoveQuery query_id="rating" text={queried.text}></RemoveQuery>
    }
}

export default function Search({ categories }) {

    if( !categories )
        return (<Error statusCode={503} />)

    const router = useRouter()

    const result_len = "1-50"
    const result_total = "500"
    const handleSearch = (value) => {
        if (!value) delete router.query.query
        router.replace({
            pathname: router.pathname, query: value ? { ...router.query, "query": value } : router.query
        })
    }
    const res_sort_by = sort_by()
    const res_price = price()
    const res_rating = rating()

    return <Layout handleSearch={handleSearch} categories={categories} >
        <Row>
            <Col xs={3}>
                {[
                    <h4>Showing {result_len} Results of {result_total} </h4>,
                    <>
                        <h4>Filters:</h4>
                        {res_sort_by.unchecker}
                        {res_price.unchecker}
                        {res_rating.unchecker}
                    </>,
                    res_sort_by.checker,
                    res_price.checker,
                    res_rating.checker,
                ].map((x, i) => <Row key={"menu-" + i} style={{ "marginTop": "10px" }}>{x}</Row>)}
            </Col>
            <Col>
                <Container className={styles.frame}>
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                    <ProductPreview />
                </Container>
            </Col>
        </Row>
    </Layout>
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