import { useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "./NavBar"
import SideBar from "./SideBar"


const Layout = ({children}) => {

    const router = useRouter()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // In the login page there is no NavBar or SideBar, so this components won't be rendered
    if(router.asPath === '/login') {
        return (
            <>
            {children}
            </>
        )
    } else {
        return (
            <>
            <NavBar handleShow={handleShow}/>
            <SideBar handleClose={handleClose} show={show}/>
            {children}
            </>
        )
    }
}

export default Layout