import { Offcanvas } from "react-bootstrap"
import { BsArrowLeft } from 'react-icons/bs'
import Link from "next/link"

import styles from 'styles/NavBar/SideBar/SubCategorie.module.css'

const SubCategories = ({category,handleClose}) => {
    
    return (
      <Offcanvas.Body className={styles.body}>
        <div className={styles.categorieBox}>
          <div>
            <button className={styles.back} onClick={() => handleClose()}>
              {" "}
              <BsArrowLeft size={32} />{" "}
            </button>
          </div>
          <span className={styles.categorie}><Link href={`/${category.name}`}>{category.name}</Link></span>
          <div></div>
        </div>
        <div className={styles.line}></div>
        {category.children.map(({ name, children }, i) => {
            const father = name;
            return(
          <div key={i} className={styles.wrapperSub}>
            <div className={styles.subCategorie}><Link href={`/${category.name}/${name}`} >{name}</Link></div>
            <div className={styles.wrapperSubSub}>
              {children.map(({ name }, i) => (
                <Link onClick={ () => console.log("close") } href={`/${category.name}/${father}/${name}`} key={i}>{name}</Link>
              ))}
            </div>
          </div>
        )
        })}
      </Offcanvas.Body>
    );
}

export default SubCategories