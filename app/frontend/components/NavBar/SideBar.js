import { Offcanvas, Container } from "react-bootstrap"
import { BsX } from 'react-icons/bs'
import Link from "next/link"

import LogoReversed from "components/Logos/LogoReversed"

import styles from 'styles/NavBar/SideBar.module.css'


// Receives an array of categories from the backend API
// Returns the respective links for each of the categories
const renderCategories = (categories) => {
    return categories.map( ({ _id,name,parent_id,level,children },i) => 
        <div className={styles.link} key={_id} ><Link href={`/${name}`}>{`${name}`}</Link></div> )
}

const SideBar = (props) => {
    return (
        <Offcanvas show={props.show} onHide={props.handleClose}>
            <Offcanvas.Header className="p-0">
                <Container className={styles.topRec}>
                    <button className={styles.closeBtn} onClick={props.handleClose}>
                        <BsX size={48}/>
                    </button>
                    <LogoReversed />
                </Container>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.body}>
                <div className={styles.link}><Link href="/trending">Trending</Link></div>
                <div className={styles.link}><Link href="/new">New</Link></div>
                <div className={styles.line}></div>
                { renderCategories(props.categories) }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default SideBar