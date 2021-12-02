import { useState } from "react"
import { useRouter } from 'next/router'

import NavBar from "./NavBar"
import SideBar from "./SideBar"


const Layout = (props) => {

    const router = useRouter()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSearch = (value) => router.push({ pathname: "search", query: {"query": value}})

    return (
        <>
            <NavBar handleShow={handleShow} handleSearch={props.handleSearch || handleSearch}/>
            <SideBar handleClose={handleClose} show={show} />
            <div className="page_content">
                {props.children}
            </div>
        </>
    )
}

export default Layout