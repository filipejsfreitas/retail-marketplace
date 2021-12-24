import { useState } from "react"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import styles from "/styles/Management/ToggleDropdown.module.css"

export default function ToggleDropdown(props) {
    const [open, setOpen] = useState(false)
    return <>
        <div className={styles.title} onClick={event => setOpen(!open)}>
            {open ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/> }
            {props.title}
            {`(${props.children ? props.children.length : 0})`}
        </div>
        <div className={styles.children}>
            <div hidden={!open}>
                {props.children ?? []}
            </div>
        </div>
    </>
}