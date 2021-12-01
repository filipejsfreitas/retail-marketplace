import { useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "components/NavBar"
import SideBar from "components/SideBar"
import Checkout from "components/Checkout"


const Layout = ({children}) => {

    const router = useRouter()

    const [showSideBar, setShowSideBar] = useState(false);

    const handleCloseSideBar = () => setShowSideBar(false);
    const handleShowSideBar = () => setShowSideBar(true);

    const [showCheckout, setShowCheckout] = useState(false);

    const handleCloseCheckout = () => setShowCheckout(false);
    const handleShowCheckout = () => setShowCheckout(true);

    return (
        <>
            <NavBar handleShowSideBar={handleShowSideBar} handleShowCheckout={handleShowCheckout}/>
            <SideBar handleClose={handleCloseSideBar} show={showSideBar} />
            <Checkout handleClose={handleCloseCheckout} show={showCheckout} />
            <div className="page_content">
                {children}
            </div>
        </>
    )
}

export default Layout