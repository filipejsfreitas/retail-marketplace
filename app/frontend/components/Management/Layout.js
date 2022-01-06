import Link from 'next/link'
import NavBar from "components/Management/Bar/NavBar"
import { Spinner } from "react-bootstrap"

import styles from "/styles/Management/Layout.module.css"
import { useContext } from 'react'
import TokenContext from 'components/Context/TokenContext'
import Error from "next/error";
import { UserType } from "hooks/useToken"
import { BsBoxArrowLeft } from "react-icons/bs";

export const SELLER_SIDEBAR = {
    rootpath: "/seller",
    contents: [
        { text: "Home", url: "/" },
        { text: "Add Proposal", url: "/proposal/add/" },
        { text: "Manage Proposals", url: "/proposal/list/" },
        { text: "Manage Orders", url: "/order/list/" },
    ],
}

export const ADMIN_SIDEBAR = {
    rootpath: "/admin",
    contents: [
        { text: "Home", url: "/" },
        { text: "Manage Categories", url: "/category" },
        { text: "Manage Sellers", url: "/seller/list" },
        { text: "Manage Products", url: "/product/list" },
        { text: "Add Product", url: "/product/add" },
    ],
}

function SideBar(props) {
    const contents = props.sidebar.contents
    const rootpath = props.sidebar.rootpath
    return <>
        {contents.map((content, i) =>
            <Link href={rootpath + content.url} key={"sidebar-content-" + i} replace>
                <a styles={{ "color": "inherit" }} className={styles.sidebar_content}>
                    {content.text}
                </a>
            </Link>
        )}
        <div style={{ "position": "absolute", "bottom": "40px", "left": "40px", "scale": "3" }}>
            <Link href="/">
                <a className={styles.a}> <BsBoxArrowLeft /> </a>
            </Link>
        </div>
    </>
}

function PageContent(props) {
    return <>
        <div className={styles.sidebar}>
            <SideBar sidebar={props.sidebar} />
        </div>
        <div className={styles.page_content}>
            {props.isLoading ? <Spinner animation="border" /> : props.children}
        </div>
    </>
}

export default function Layout(props) {
    const { userType } = useContext(TokenContext)

    const authorized = (userType === UserType.SELLER && props.sidebar.rootpath == SELLER_SIDEBAR.rootpath)
        || (userType === UserType.ADMIN && props.sidebar.rootpath == ADMIN_SIDEBAR.rootpath)

    return (userType && !authorized) ? <Error statusCode={401} /> : <>
        <NavBar />
        <div className={styles.page}>
            {!userType ? <></> : <PageContent {...props} />}
        </div>
    </>
}