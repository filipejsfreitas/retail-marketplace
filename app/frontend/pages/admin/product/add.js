import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap"
import { useState, useEffect, useRef } from "react"

function CalculateSelector(props) {
    const depth = props.depth
    const selected = props.selected
    const depthselect = selected[depth] + 1 || 0
    var cats = props.categories
    for (var i = 0; i < props.depth; i++)
        cats = cats[selected[i]].children

    if (!cats || depth > selected.length || cats.length === 0) return <></>

    return <Form.Select value={(cats[selected[depth]]??{})._id || ""} onChange={e => {
        const sel = e.target.selectedIndex
        props.setSelected(s => sel === 0 ? s.slice(0, depth) : [...s.slice(0, depth), sel - 1])
    }}>
        <option value={""}/>
        {cats.map((cat, i) => <option key={`selector-${props.depth}-${i}`} value={cat._id}
            ref={ depth+1 === selected.length && i+1 === depthselect ? props.refs : undefined}
            >
            {cat.name}
        </option>)}
    </Form.Select>
}

function CategorySelector(props) {
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState([])
    useEffect(async () => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/category/`).then(res => res.json()).then(data => data.data)
            .then(cats => setCategories(cats))
            .catch((error) => console.log(error))
    }, []);
    return <>
        {[...Array(selected.length+1).keys()].map(i =>
            <CalculateSelector key={`selector-${i}`} 
                refs={props.refs} categories={categories} selected={selected} setSelected={setSelected} depth={i} />
        )}
    </>
}

function keyValueForm(keyId, valId) {
    const getKey = (i) => document.getElementById(keyId(i))
    const getVal = (i) => document.getElementById(valId(i))
    return [() => {
        var r = {}
        for (var i = 0; getKey(i); i++)
            if (getKey(i).value && getVal(i).value)
                r[getKey(i).value] = getVal(i).value
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
            {(x => {
                var r = []
                for (var i = 0; i < x; i++)
                    r.push(<Row key={`${keyId(i)}-row`}>
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
    const ref = { name: useRef(), description: useRef(), category_id: useRef() }
    const techKeyId = (i) => `technicalInfo-key-${i}`
    const techValId = (i) => `technicalInfo-val-${i}`
    const characteristicsKeyId = (i) => `characteristics-key-${i}`
    const characteristicsValId = (i) => `characteristics-val-${i}`
    const [getTechnicalInfo, TechnicalInfoForm] = keyValueForm(techKeyId, techValId)
    const [getCharacteristics, CharacteristicsForm] = keyValueForm(characteristicsKeyId, characteristicsValId)
    const [alert, setAlert] = useState({})
    return <Layout sidebar={ADMIN_SIDEBAR}>
        <h2>Add Product</h2>
        <br />
        <Container>
            <h4>Product Name</h4>
            <Form.Control ref={ref.name} type="text" />
        </Container>
        <br />
        <Container>
            <h4>Description</h4>
            <Form.Control ref={ref.description} as="textarea" rows={3} />
        </Container>
        <br />
        <Container>
            <h4>Category</h4>
            <CategorySelector refs={ref.category_id} />
        </Container>
        <br />
        <Container>
            <h4>Characteristics</h4>
            <Row>
                <Col> <h6>Specification</h6> </Col>
                <Col> <h6>Value</h6> </Col>
            </Row>
            <CharacteristicsForm />
        </Container>
        <br />
        <Container>
            <h4>Technical Information</h4>
            <Row>
                <Col> <h6>Specification</h6> </Col>
                <Col> <h6>Value</h6> </Col>
            </Row>
            <TechnicalInfoForm />
        </Container>
        <br />
        <Container>
            <h4>Product Images</h4>
            <Form.Control type="file" multiple label="File" id="product-images-form" />
        </Container>
        <br />
        <Container>
            <Button variant="primary" onClick={async (event) => {
                event.target.disabled = true
                var req = {}
                req.name = ref.name.current.value
                req.description = ref.description.current.value
                req.images = document.getElementById("product-images-form").files
                req.category_id = ref.category_id.current && ref.category_id.current.value
                req.characteristic = []
                req.tecnical = []
                for (const [key, val] of Object.entries(getCharacteristics()))
                    req.characteristic.push({ name: key, value: val })
                for (const [key, val] of Object.entries(getTechnicalInfo()))
                    req.tecnical.push(`${key}: ${val}`)

                var data = new FormData();
                data.append("name", req.name);
                data.append("description", req.description);
                data.append("category_id", req.category_id);
                data.append("forSale", "false");
                data.append("characteristic", JSON.stringify(req.characteristic));
                data.append("tecnical", JSON.stringify(req.tecnical));
                data.append("imagesToDelete", "[]");
                data.append("score", "0");
                data.append("number_scores", "0");
                data.append("best_offer", "0");
                for (var i = 0; i < req.images.length; i++)
                    data.append("images", req.images[i], `img-${i}.png`);

                if (!req.name) setAlert({ variant: "danger", message: "Missing product name." })
                else if (!req.description) setAlert({ variant: "danger", message: "Missing product description." })
                else if (!req.category_id) setAlert({ variant: "danger", message: "Missing product category." })
                else if (!req.images) setAlert({ variant: "danger", message: "Missing images for product." })
                else {
                    setAlert({ variant: "info", message: "Sending request to server to add product." })
                    await fetch(`${process.env.NEXT_PUBLIC_HOST}/product/`, {
                        method: 'POST',
                        body: data
                    }).then((reply) => {
                        console.log(reply)
                        if (reply.ok) setAlert({ variant: "success", message: "Product added with success." })
                        else setAlert({ variant: "danger", message: "Unable to add product." })
                        ref.name.current.value = ""
                        ref.description.current.value = ""
                    })
                        .catch((error) => setAlert({ variant: "danger", message: "Unable to add product." }))
                }
                event.target.disabled = false
            }}>
                Submit
            </Button>
        </Container>
        <br />
        <Container>
            {alert.variant ? <Alert variant={alert.variant} onClose={() => setAlert({})} dismissible>
                {alert.message}
            </Alert> : <></>}
        </Container>
    </Layout>
}
