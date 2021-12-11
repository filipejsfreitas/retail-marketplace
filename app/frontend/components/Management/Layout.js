import Link from 'next/link'
import NavBar from "components/Management/Bar/NavBar"

import styles from "/styles/Management/Layout.module.css"

export const SELLER_SIDEBAR = {
    rootpath: "/seller",
    contents: [
        { text: "Add Product", url: "/"},
        { text: "Order History", url: "/"},
        { text: "Active Orders", url: "/"},
        { text: "Remove Product", url: "/"},
    ],
}

export const ADMIN_SIDEBAR = {
    rootpath: "/admin",
    contents: [
        { text: "Add Category", url: "/"},
        { text: "List Categories", url: "/"},
    ],
}

function SideBar(props) {
    const contents = props.sidebar.contents
    const rootpath = props.sidebar.rootpath
    return <>
        {contents.map((content, i) =>
            <Link href={rootpath + content.url} key={"sidebar-content-" + i} replace>
                <a styles={{"color": "inherit"}} className={styles.sidebar_content}>
                    {content.text}
                </a>
            </Link>
        )}
    </>
}

export default function Layout(props) {
    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <div className={styles.sidebar}>
                    <SideBar sidebar={props.sidebar} />
                </div>
                <div className={styles.page_content}>
                    {props.children}
                </div>
            </div>
        </>
    )
}