import { useContext, useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "components/NavBar/NavBar"
import SideBar from "components/NavBar/SideBar"
import Cart from "components/NavBar/Cart"
import CartContext from "./NavBar/Cart/context"


const Layout = (props) => {

    const cart = useContext(CartContext)

    const router = useRouter()

    const [showSideBar, setShowSideBar] = useState(false);

    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);

    const handleSearch = (value) => router.push({ pathname: "/search", query: {"query": value}})

    return (
        <>
            <NavBar handleShowSideBar={handleShowSideBar} handleShowCheckout={() => cart.handleVisible()} handleSearch={props.handleSearch || handleSearch}/>
            <SideBar categories={props.categories} handleClose={handleCloseSideBar} show={showSideBar} />
            <Cart handleClose={cart.handleVisible} show={cart.visible} />
            <div className="page_content">
                {props.children}
            </div>
        </>
    )
}

export default Layout