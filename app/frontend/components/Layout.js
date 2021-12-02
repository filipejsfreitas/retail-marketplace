import { useState } from "react"

import NavBar from "components/NavBar/NavBar"
import SideBar from "components/NavBar/SideBar"
import Checkout from "components/NavBar/Checkout"


const Layout = ({children}) => {

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