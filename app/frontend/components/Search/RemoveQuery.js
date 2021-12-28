
import { BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'

import styles from "styles/Search/search.module.css"

export default function RemoveQuery(props) {
    const router = useRouter()
    return <h6 style={{ fontWeight: "normal" }}>
        <button className={styles.btn} onClick={() => {
            delete router.query[props.query_id]
            router.replace({ pathname: router.pathname, query: router.query })
        }}>
            <BsX size={24} />
        </button>
        {props.text}
    </h6>
}