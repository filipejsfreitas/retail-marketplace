import { useRouter } from "next/router"
import { Container } from "react-bootstrap"
import { BsPlusCircle } from "react-icons/bs"
import styles from "styles/Checkout/Content/Addresses/NewAddressItem.module.css"


export default function NewAddressItem({state,name,address,postal,number,id}) {
    const router = useRouter()

    return (
        <Container onClick={() => router.push("/account/address")} className={styles.box}>
            <BsPlusCircle size={30}/>
        </Container>
    )
}