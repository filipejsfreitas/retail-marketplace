import { Container } from "react-bootstrap"
import { AiFillCheckSquare } from "react-icons/ai"
import styles from "styles/Checkout/Content/Addresses/AddressItem.module.css"


export default function AddressItem({state,name,address,postal,number,id}) {

    const [selected,setSelected] = state;

    return (
        <Container onClick={() => setSelected(id)} className={styles.box}>
            <div className={styles.wrapper}>
                <span className={styles.name}>{name}</span>
                <span>{address}</span>
                <span>{postal}, <span>Portugal</span></span>
                <span>{number}</span>
                {selected==id && <AiFillCheckSquare size={30} className={styles.check} />}
            </div>
        </Container>
    )
}