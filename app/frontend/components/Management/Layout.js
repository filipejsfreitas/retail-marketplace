import Link from 'next/link'
import NavBar from "components/Management/Bar/NavBar"
import { Spinner } from "react-bootstrap"
import { BsHouse, BsBoxSeam } from "react-icons/bs";
import styles from "/styles/Management/Layout.module.css"
import stylesNew from "/styles/Management/SideBarSeller.module.css"
import { useContext } from 'react'
import TokenContext from 'components/Context/TokenContext'
import Error from "next/error";
import { UserType } from "hooks/useToken"
import { BsBoxArrowLeft } from "react-icons/bs";
import NavBarSeller from 'components/Seller/Menus/NavBarSeller';
import SideBarSeller from 'components/Seller/Menus/SideBarSeller';

export function BsIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16" className={stylesNew.icon}>
    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/>
    </svg>
}

export const SELLER_SIDEBAR = {
    rootpath: "/seller",
    contents: [
        { text: "Home", icon: <BsHouse className={stylesNew.icon}/>, url: "/" },
        { text: "Orders", icon: <BsIcon/>, url: "/proposal/add/" },
        { text: "Proposals", icon: <BsBoxSeam className={stylesNew.icon}/>, url: "/proposal/list/" },
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
        {
        /* <div className={stylesNew.sidebar}>
            if user type== admin show SideBar 
            <SideBarSeller sidebar={props.sidebar} />
        </div>
        */}
        <div >
            {props.isLoading ? <Spinner animation="border" /> : props.children}
        </div>
    </>
}

export default function Layout(props) {
    const { userType } = useContext(TokenContext)
    const authorized = (userType === UserType.SELLER && props.sidebar.rootpath == SELLER_SIDEBAR.rootpath)
        || (userType === UserType.ADMIN && props.sidebar.rootpath == ADMIN_SIDEBAR.rootpath)

    return (userType && !authorized) ? <Error statusCode={401} /> : <>
        {/* if user type== admin show NavBar */}
        <NavBarSeller></NavBarSeller>
        <div className={stylesNew.sidebar}>
            <SideBarSeller sidebar={props.sidebar}/>
        </div>
        <div className={stylesNew.page}>
         {!userType ? <></> : <PageContent {...props} />}
        </div>
    </>
}
