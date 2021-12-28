import Link from 'next/link'
import { useState } from "react"

import Logo from "components/Logos/Logo"
import styles from "styles/register/root.module.css"

export default function Root() {

    const [hoveredClient, setHoveredClient] = useState(false)
    const [hoveredSeller, setHoveredSeller] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.registerOpt}>
                <Link href="/register/client">
                    <a className={`${styles.client} ${hoveredSeller ? styles.grayscale : ""}`}
                        onMouseLeave={() => setHoveredClient(false)}
                        onMouseEnter={() => setHoveredClient(true)} >
                        <span>You are a customer that</span>
                        <span>wants to buy in Retail </span>
                        <span>Marketplace</span>
                    </a>
                </Link>
                <div className={styles.line}></div>
                <Link href="/register/seller">
                    <a className={`${styles.seller} ${hoveredClient ? styles.grayscale : ""}`}
                        onMouseLeave={() => setHoveredSeller(false)}
                        onMouseEnter={() => setHoveredSeller(true)}
                    >
                        <span>You are a company that</span>
                        <span>wants to sell in Retail </span>
                        <span>Marketplace</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}