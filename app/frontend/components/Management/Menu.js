import { useState } from "react"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import styles from "/styles/Management/Menu.module.css"

const MENU = {
    title: "Category Management",
    children: [
        {
            title: "Technology",
            children: [
                { title: "Computers" },
                { title: "Computers" },
                { title: "Computers" },
                { title: "Computers" },
                { title: "Computers" },
            ],
            dropdown: true,
        },
        {
            title: "Technology",
            children: [
                { title: "Computers" },
                { title: "Computers" },
            ],
            dropdown: true,
        },
    ],
}


function MenuBuilder(props) {
    const menu = props.menu
    const depth = props.depth ? props.depth : 0
    const Extra = menu.Extra ? menu.Extra : (() => <></>)
    const [hidden, setHidden] = useState(menu.dropdown)
    const toggledropdown = () => { if (menu.dropdown) setHidden(!hidden) }
    const title = depth < 1 ? <h2>{menu.title}</h2> :
        depth < 2 ? <h3>{menu.title}</h3> :
            depth < 3 ? <h4>{menu.title}</h4> :
                <h5>{menu.title}</h5>
    return <div className={styles.menu}>
        <div className={styles.title}>
            {!menu.dropdown ? title :
                <div onClick={toggledropdown} className={styles.dropdown}>
                    {hidden ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}
                    {title}
                </div>
            }
            <div className={styles.extra}>
                <Extra/>
            </div>
        </div>
        <ul hidden={hidden} className={styles.menu_ul}>
            {menu.children ? menu.children.map((child, i) => <li key={"menu-" + i}> <MenuBuilder menu={child} depth={depth + 1} /> </li>) : <></>}
        </ul>
    </div>
}


export default function Menu(props) {
    return <>
        <MenuBuilder menu={props.menu} />
    </>
}
