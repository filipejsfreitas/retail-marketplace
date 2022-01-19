import styles from "/styles/Management/SideBarSeller.module.css"
import LogoReversed from "components/Logos/LogoReversed";
import Link from 'next/link'
import React, { useState } from 'react';
import { Navbar , Spinner} from "react-bootstrap";
import { useEffect } from "react";
import { useContext } from "react";
import TokenContext from 'components/Context/TokenContext'
import useFetchData from "hooks/useFetchData";
import useToken, { UserType } from "hooks/useToken";


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
    const { token } = useToken()

    const { data: seller, loading } =
     useFetchData(() => `${process.env.NEXT_PUBLIC_HOST}/seller/${token._id}`,
        {  when:token && token._id})

    return(loading ? <Spinner animation="border" /> :
    <> 
        <div className={styles.logo} >
            <Navbar.Brand href="/">
                <LogoReversed height={50} width={170} />
            </Navbar.Brand>
        </div>
           
        <div className={styles.company}>
            <img
                className={styles.companyLogo}              
                src={fallback}
            />
            <div className={styles.companyName}>{seller.companyName}</div>
        </div>
        {contents.map((content, i) =>
            <Item content={content} rootpath={rootpath} key={"sidebar-content-" + i} replace ></Item> 
        )}
    </>
    )
}

export default SideBarSeller;