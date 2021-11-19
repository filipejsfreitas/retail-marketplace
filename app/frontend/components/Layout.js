import { useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "./NavBar"
import SideBar from "./SideBar"


const Layout = ({children}) => {

    const router = useRouter()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NavBar handleShow={handleShow} />
            <SideBar handleClose={handleClose} show={show} />
            <div className="page_content">
                {children}
            </div>
        </>
    )
}

export default Layout