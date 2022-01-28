import { Form, Button, Dropdown, Container, Row, Col } from "react-bootstrap"
import ProductPreview from "components/Search/ProductPreview"
import RemoveQuery from "components/Search/RemoveQuery"
import { useRef } from "react"
import { BsFillBackspaceFill } from "react-icons/bs";
import { useRouter } from "next/router";

import styles from "styles/Search/search.module.css"

function QueryRemover({ query, modifyQuery }) {
    const genText = {
        min_price: value => `Minimum Price: ${value}`,
        max_price: value => `Maximum Price: ${value}`,
        sort_by: value => "Sort by: " + { "price": "Price", "rating": "Rating" }[value],
        order_by: value => "Order by:" + { "asc": "Ascending", "desc": "Descending" }[value],
        min_rating: value => `Minimum rating: ${value} stars"`
    }

    return Object.entries(query).filter(([key, _]) => key in genText)
        .map(([key, value]) =>
            <RemoveQuery key={key} queryKey={key} modifyQuery={modifyQuery} text={genText[key](value)} />)
}

function PriceQuery({ modifyQuery }) {
    const refs = { min_price: useRef(), max_price: useRef() }
    return <>
        <h4>Price</h4>
        <Form onSubmit={event => {
            event.preventDefault()
            modifyQuery({
                min_price: refs.min_price.current.value > 0 ? refs.min_price.current.value : undefined,
                max_price: refs.max_price.current.value > 0 ? refs.max_price.current.value : undefined,
            })
        }}>
            <Row>
                <Col> <Form.Control ref={refs.min_price} type="number" placeholder="Min" /> </Col>
                <Col> <Form.Control ref={refs.max_price} type="number" placeholder="Max" /> </Col>
                <Col> <Button variant="primary" type="submit"> Go
                </Button>
                </Col>
            </Row>
        </Form>
    </>
}

const dropdownOptsSort = {
    title: "Sort",
    queryKey: "sort_by",
    defaultText: "Sort by:",
    queryValues: [
        { id: "price", text: "Sort by: Price" },
        { id: "rating", text: "Sort by: Rating" },
    ],
}

const dropdownOptsOrder = {
    title: "Order",
    queryKey: "order_by",
    defaultText: "Order by:",
    queryValues: [
        { id: "asc", text: "Order by: Ascending" },
        { id: "desc", text: "Order by: Descending" },
    ],
}

const dropdownOptsStars = {
    title: "Rating",
    queryKey: "min_rating",
    defaultText: "Minimum rating:",
    queryValues: [
        { id: "2", text: "Minimum rating: 2 stars" },
        { id: "3", text: "Minimum rating: 3 stars" },
        { id: "4", text: "Minimum rating: 4 stars" },
        { id: "5", text: "Minimum rating: 5 stars" },
    ],
}

function DropdownQuery({ query, opts, modifyQuery }) {
    const { title, queryKey, queryValues, defaultText } = opts

    return <div>
        <h4>{title}</h4>
        <Form.Select value={query[queryKey] ?? "default"}>
            <option value={"default"} onClick={() => { modifyQuery({ [queryKey]: undefined }) }}>
                {defaultText}
            </option>)
            {queryValues.map(opt =>
                <option key={"select" + opt.id} value={opt.id}
                    onClick={e => { modifyQuery({ [queryKey]: e.target.value }) }}>
                    {opt.text}
                </option>)
            }
        </Form.Select>
    </div>
}

export default function Search({ products, query, modifyQuery }) {
    const router = useRouter()
    return <Row>
        <Col xs={3}>
            {[
                <a className={styles.back_btn} onClick={() => {
                    const { query, ...newQuery } = router.query
                    router.replace({ pathname: router.pathname, query: newQuery })
                }}>
                    <Col lg="auto"> <BsFillBackspaceFill /> </Col>
                    <Col> <h4>Go back</h4> </Col>
                </a>,
                <h4>Showing {products.length} results </h4>,
                <>
                    <h4>Filters:</h4>
                    <QueryRemover query={query} modifyQuery={modifyQuery} />
                </>,
                <DropdownQuery query={query} opts={dropdownOptsSort} modifyQuery={modifyQuery} />,
                <DropdownQuery query={query} opts={dropdownOptsOrder} modifyQuery={modifyQuery} />,
                <DropdownQuery query={query} opts={dropdownOptsStars} modifyQuery={modifyQuery} />,
                <PriceQuery modifyQuery={modifyQuery} />,
            ].map((x, i) => <Row key={"menu-" + i} style={{ "marginTop": "10px" }}>{x}</Row>)}
        </Col>
        <Col>
            <Container className={styles.frame}>
                {products.map(product =>
                    <ProductPreview key={product._id} product={product} />)}
            </Container>
        </Col>
    </Row>
}