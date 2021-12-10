import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import { Form, Row, Col, Container, Button } from "react-bootstrap"
import { useState, useEffect } from "react"

function calculateCategorySelector(selected, setSelected, categories, selectId, categoryId, depth = 0) {
    if (!categories || depth > selected.length) return []
    var r = []

    r.push(<Form.Select id={selectId(depth)} key={selectId(depth)} onChange={e => {
        if (e.target.selectedIndex === 0) setSelected([...selected.slice(0, depth)])
        else setSelected([...selected.slice(0, depth), e.target.selectedIndex - 1])
    }}>
        <option key={`categoryempty-${depth}`} />
        {categories.map(category => <option value={category._id} key={categoryId(category.name)}>
            {category.name}
        </option>)}
    </Form.Select>)

    if (depth < selected.length) {
        const subcategories = categories[selected[depth]]
        if (subcategories)
            r.push(calculateCategorySelector(selected, setSelected, subcategories.children, selectId, categoryId, depth + 1))
    }

    return r
}

function categorySelector(props) {
    const selectId = (depth) => `category-selector-${depth}`
    const categoryId = (name) => `category-selector-category-${name}`
    return [() => {
        var selector = document.getElementById(selectId(0))
        for(var i=1; document.getElementById(selectId(i)); i++){
            if(document.getElementById(selectId(i)).selectedIndex === 0) break;
            else selector = document.getElementById(selectId(i))
        }
        return selector[selector.selectedIndex].value
    }, (props) => {
        const [categories, setCategories] = useState([])
        const [selected, setSelected] = useState([])
        useEffect(async () => {
            fetch(`${process.env.NEXT_PUBLIC_HOST}/category/`)
                .then(res => res.json()).then(data => data.data)
                .then(cats => setCategories(cats))
                .catch((error) => console.log(error))
        }, []);
        return <>
            {calculateCategorySelector(selected, setSelected, categories, selectId, categoryId)}
        </>
    }
    ]
}

function technicalInfoForm() {
    const keyId = (i) => `technicalInfo-key-${i}`
    const valId = (i) => `technicalInfo-val-${i}`
    const getKey = (i) => document.getElementById(keyId(i))
    const getVal = (i) => document.getElementById(valId(i))
    return [() => {
        var r = []
        for (var i = 0; getKey(i); i++)
            if (getKey(i).value && getVal(i).value)
                r.push(`${getKey(i).value}: ${getVal(i).value}`)
        return r
    }, (props) => {
        const [formCount, setFormCount] = useState(1)
        const recomputeCount = () => {
            var offset = 0;
            for (var i = 0; i < formCount; i++) {
                getKey(i - offset).value = getKey(i).value
                getVal(i - offset).value = getVal(i).value
                if (!getKey(i - offset).value && !getVal(i - offset).value)
                    offset += 1
            }
            setFormCount(formCount - offset + 1)
        }
        return <>
            <Row>
                <Col> <h6>Specification</h6> </Col>
                <Col> <h6>Value</h6> </Col>
            </Row>
            {(x => {
                var r = []
                for (var i = 0; i < x; i++)
                    r.push(<Row key={`technical-row-${i}`}>
                        <Col> <Form.Control id={keyId(i)} key={keyId(i)} type="text" onInput={recomputeCount} /> </Col>
                        <Col> <Form.Control id={valId(i)} key={valId(i)} type="text" onInput={recomputeCount} /> </Col>
                    </Row>)
                return r
            })(formCount)
            }
        </>
    }
    ]
}

export default function ProductAdd() {
    const [getTechnicalInfo, TechnicalInfoForm] = technicalInfoForm()
    const [getCategory, CategorySelector] = categorySelector()
    return <Layout sidebar={ADMIN_SIDEBAR}>
        <h2>Add Product</h2>
        <br />
        <Container>
            <h4>Product Name</h4>
            <Form.Control type="text" />
        </Container>
        <br />
        <Container>
            <h4>Description</h4>
            <Form.Control as="textarea" rows={3} />
        </Container>
        <br />
        <Container>
            <h4>Category</h4>
            <CategorySelector />
        </Container>
        <br />
        <Container>
            <h4>Technical Information</h4>
            <TechnicalInfoForm />
        </Container>
        <br />
        <Container>
            <Button variant="primary" onClick={() => {
                console.log({ category: getCategory(), technical: getTechnicalInfo() })
            }}>
                Submit
            </Button>
        </Container>
    </Layout>
}
