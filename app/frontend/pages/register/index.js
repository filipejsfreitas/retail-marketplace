import { Button } from "react-bootstrap"
import { useRouter } from "next/router"

import Logo from "components/Logos/Logo"
import styles from "styles/register/root.module.css"

export default function Root() {

    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.registerOpt}>
                <div className={styles.client}>
                    <span>You are a customer that</span>
                    <span>wants to buy in Retail </span>
                    <span>Marketplace</span>
                    <Button onClick={ () => router.push('/register/client') } className={styles.btn} variant="secondary">Register</Button>
                </div>
                <div className={styles.line}></div>
                <div className={styles.seller}>
                    <span>You are a company that</span>
                    <span>wants to sell in Retail </span>
                    <span>Marketplace</span>
                    <Button onClick={ () => router.push('/register/seller') } className={styles.btn} variant="secondary">Register</Button>
                </div>
            </div>
        </div>
    )
}