import { Navbar } from "react-bootstrap"
import LogoReversed from "components/Logos/LogoReversed"

import styles from "styles/Management/NavBar.module.css"

export default function NavBar(props) {
    return (
        <>
            <Navbar className={styles.navbar} bg="primary" >
                <LogoReversed height={50} width={170} />
            </Navbar>
        </>
    )
}
