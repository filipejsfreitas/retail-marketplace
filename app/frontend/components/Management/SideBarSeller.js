import styles from "/styles/Management/SideBarSeller.module.css"
import LogoReversed from "components/Logos/LogoReversed";
import Link from 'next/link'
import React from 'react';

const Item = ({content, rootpath}) =>{
    return <>
            <Link href={rootpath + content.url} replace>
                <a className={styles.sidebar_content}> {content.icon} <span className={styles.text}>{content.text}</span></a>
            </Link>         
        </>
}

const SideBarSeller = (props) =>{ 
    const fallback = "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
    const contents = props.sidebar.contents
    const rootpath = props.sidebar.rootpath
    return(  
    <> 
        <div className={styles.logo}>
            <LogoReversed height={50} width={170} />
        </div>
           
        <div className={styles.company}>
            <img
                className={styles.companyLogo}              
                src={fallback}
            />
            <div className={styles.companyName}>Company Name</div>
        </div>
        {contents.map((content, i) =>
            <Item content={content} rootpath={rootpath} key={"sidebar-content-" + i} replace ></Item> 
        )}
    </>
    )
}

export default SideBarSeller;