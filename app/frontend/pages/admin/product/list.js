import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Layout from "components/Management/Layout"
import { ADMIN_SIDEBAR } from "components/Management/Layout"
import ToggleDropdown from "components/Management/ToggleDropdown"
import { Container, Modal, Button } from "react-bootstrap"
import { BsCheckLg, BsDashLg } from "react-icons/bs";

export default function SellerList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    useEffect(async () => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/product/list/`)
            .then(res => res.json()).then(data => data.data).then(products => {
                setProducts(products)
                setIsLoading(false)
            })
            .catch((error) => console.log(error))
    }, []);
    return <Layout sidebar={ADMIN_SIDEBAR} isLoading={isLoading}>
        <h3>Manage Products</h3>
        <br />
        <ToggleDropdown title={<h4>Product List</h4>}>
            {products.map(product => <h5 key={product._id} onClick={() => router.push("") }>
                {product.name}
            </h5>
            )}
        </ToggleDropdown>
    </Layout>
}