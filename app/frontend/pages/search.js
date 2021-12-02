import { Form, Button, Dropdown, Container, Row, Col } from "react-bootstrap"
import SSRProvider from 'react-bootstrap/SSRProvider'
import ProductPreview from "components/ProductPreview"
import Layout from "components/Layout"
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useRouter } from 'next/router'


import styles from "styles/search.module.css"


function sort_by() {
    const router = useRouter()
    const opts = [
        { id: "relevance", text: "Relevance" },
        { id: "price", text: "Price" },
    ]
    const active = opts.find(opt => opt.id === router.query["sort"]) || opts[0]
    return <SSRProvider>
        <DropdownButton id="dropdown-basic-button" title={"Sort By: " + active.text}>
            {opts.map(opt =>
                <Dropdown.Item key={"sort-" + opt.id} onClick={() => {
                    router.query["sort"] = opt.id
                    router.push({ pathname: router.pathname, query: router.query })
                }
                }>
                    {opt.text}
                </Dropdown.Item>)
            }
        </DropdownButton>
    </SSRProvider>
}

function price() {
    const router = useRouter()
    return <>
        <h4>Price</h4>
        <Form onSubmit={event => {
            event.preventDefault()
            router.query["min"] = event.target.min.value
            if (!router.query["min"]) delete router.query["min"]
            router.query["max"] = event.target.max.value
            if (!router.query["max"]) delete router.query["max"]
            router.push({ pathname: router.pathname, query: router.query })
        }}>
            <Row>
                <Col> <Form.Control name="min" type="number" placeholder="Min" /> </Col>
                <Col> <Form.Control name="max" type="number" placeholder="Max" /> </Col>
                <Col> <Button variant="primary" type="submit"> Go
                </Button>
                </Col>
            </Row>
        </Form>
    </>
}

function rating() {
    const router = useRouter()
    const opts = [
        { id: "0", text: "Any" },
        { id: "2", text: "2 Stars" },
        { id: "3", text: "3 Stars" },
        { id: "4", text: "4 Stars" },
    ]
    const active = opts.find(opt => opt.id === router.query["rating"]) || opts[0]
    return <SSRProvider>
        <DropdownButton id="dropdown-basic-button" title={"Minimum rating:" + active.text}>
            {opts.map(opt =>
                <Dropdown.Item key={"rating-" + opt.id} onClick={() => {
                    router.query["rating"] = opt.id
                    router.push({ pathname: router.pathname, query: router.query })
                }
                }>
                    {opt.text}
                </Dropdown.Item>)
            }
        </DropdownButton>
    </SSRProvider>
}

export default function Search() {
    const router = useRouter()

    const result_len = "1-50"
    const result_total = "500"
    const handleSearch = (value) => {
        if (!value) delete router.query.query
        router.push({
            pathname: router.pathname, query: value ? { ...router.query, "query": value } : router.query
        })
    }

    return <Layout handleSearch={handleSearch}>
        <Row>
            <Col xs={3}>
                <h4>Showing {result_len} Results of {result_total} </h4>
                <br />
                {sort_by()}
                <br />
                {price()}
                <br />
                {rating()}
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