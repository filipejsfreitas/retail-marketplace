import { useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "components/NavBar/NavBar"
import SideBar from "components/NavBar/SideBar"
import Checkout from "components/NavBar/Checkout"


const Layout = (props) => {
    const router = useRouter()

    const [showSideBar, setShowSideBar] = useState(false);

    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);

    const [showCheckout, setShowCheckout] = useState(false);

    const handleCloseCheckout = () => setShowCheckout(false);
    const handleShowCheckout = () => setShowCheckout(true);
    const handleSearch = (value) => router.push({ pathname: "search", query: {"query": value}})

    return (
        <>
            <NavBar handleShowSideBar={handleShowSideBar} handleShowCheckout={handleShowCheckout} handleSearch={props.handleSearch || handleSearch}/>
            <SideBar handleClose={handleCloseSideBar} show={showSideBar} />
            <Checkout handleClose={handleCloseCheckout} show={showCheckout} />
            <div className="page_content">
                {props.children}
            </div>
        </>
    )
}

export default Layout