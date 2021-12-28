import { Offcanvas, Container, Button } from "react-bootstrap"
import { BsX } from 'react-icons/bs'
import Link from "next/link"

import LogoReversed from "components/Logos/LogoReversed"
import SubCategories from "./SubCategories"

import styles from 'styles/NavBar/SideBar/SideBar.module.css'
import { useEffect, useState } from "react"

const SideBar = (props) => {

    // If in a sub categorie menu categorie id else 0
    const [subCategorie,setSubCategorie] = useState(false)

    // Receives an array of categories from the backend API
    // Returns the respective links for each of the categories
    const renderCategories = (categories) => {
        return categories.map( ({ _id,name,children }) => 
            <div className={styles.link} key={_id} ><button className={styles.link} onClick={ () => setSubCategorie({children:children,name:name}) }>{`${name}`}</button></div> )
    }

    return (
      <Offcanvas show={props.show} onHide={props.handleClose} onExited={ () => setSubCategorie(false)}>
        <Offcanvas.Header className="p-0">
          <Container className={styles.topRec}>
            <button className={styles.closeBtn} onClick={props.handleClose}>
              <BsX size={48} />
            </button>
            <LogoReversed />
          </Container>
        </Offcanvas.Header>
        {subCategorie === false ? (
          <Offcanvas.Body className={styles.body}>
            <div className={styles.link}>
              <Link href="/trending">Trending</Link>
            </div>
            <div className={styles.link}>
              <Link href="/new">New</Link>
            </div>
            <div className={styles.line}></div>
            {renderCategories(props.categories)}
          </Offcanvas.Body>
        ) : (
          <SubCategories category={subCategorie} handleClose={ () => setSubCategorie(false) } handleCloseSidebar={props.handleClose}/>
        )}
      </Offcanvas>
    );
}

export default SideBar