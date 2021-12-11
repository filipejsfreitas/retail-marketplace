import Logo from "components/Logos/LogoReversed"
import styles from "styles/Checkout/TopBanner/TopBanner.module.css"

export default function TopBanner() {

    return (
        <div className={styles.banner}><Logo height={128} width={360}/></div>
    )

}