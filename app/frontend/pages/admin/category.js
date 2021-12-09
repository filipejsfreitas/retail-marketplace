import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import Menu from "components/Management/Menu"
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { Modal, Button, Form } from "react-bootstrap"

function AddCategoryModal(props) {
    const router = useRouter()
    return <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Category
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{`Under ${props.title}`}</h4>
            <Form.Control id="form-category-name" size="lg" type="text" placeholder="Name" />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={async () => {
                const name = document.getElementById("form-category-name").value
                if (name) {
                    fetch(`${process.env.NEXT_PUBLIC_HOST}/category/`, {
                        method: 'POST',
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                        body: JSON.stringify({ parent_id: props.id, name: name })
                    }).then(() => router.reload(window.location.pathname))
                        .catch((error) => console.log(error))
                }
            }} variant="primary" type="submit"> Submit </Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
}

function RemoveCategoryModal(props) {
    const router = useRouter()
    return <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Remove Category
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>{`Are you sure you want to remove ${props.title} and its subcategories?`}</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={async () => {
                fetch(`${process.env.NEXT_PUBLIC_HOST}/category/${props.id}`, {
                    method: 'DELETE',
                }).then(() => router.reload(window.location.pathname))
                    .catch((error) => console.log(error))
            }} variant="primary" type="submit"> Remove </Button>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
}

function categoriesToMenu(categories) {
    categories.map(category => {
        category.title = category.name
        if (!category.children || category.children.length === 0)
            delete category.children
        else {
            category.children = categoriesToMenu(category.children)
            category.dropdown = true
        }
        category.Extra = (props) => {
            const [addCatShow, setAddCat] = useState(false);
            const [remCatShow, setRemCat] = useState(false);
            return <>
                <BsPlusLg onClick={() => { setAddCat(true) }} />
                <AddCategoryModal title={category.title} id={category._id}
                    show={addCatShow}
                    onHide={() => setAddCat(false)} />
                <BsDashLg onClick={() => { setRemCat(true) }} />
                <RemoveCategoryModal title={category.title} id={category._id}
                    show={remCatShow}
                    onHide={() => setRemCat(false)} />
            </>
        }
    })
    return categories
}

function categoriesToMenuWithRoot(categories) {
    const root = { title: "Categories" }
    root.Extra = (props) => {
        const [addCatShow, setAddCat] = useState(false);
        return <>
            <BsPlusLg onClick={() => { setAddCat(true) }} />
            <AddCategoryModal title={root.title} show={addCatShow}
                onHide={() => setAddCat(false)} />
        </>
    }
    root.children = categoriesToMenu(categories)
    return root

}

export default function Home() {
    const [menu, setMenu] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(async () => {
        const categories = await fetch(`${process.env.NEXT_PUBLIC_HOST}/category/`)
            .then(res => res.json()).then(data => data.data)
            .catch((error) => console.log(error))
        setMenu(categoriesToMenuWithRoot(categories))
        setIsLoading(false)
    }, []);
    return <Layout sidebar={ADMIN_SIDEBAR} isLoading={isLoading}>
        <Menu menu={menu}>
        </Menu>
    </Layout>
}