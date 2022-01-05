
import { BsX } from 'react-icons/bs'
import { useRouter } from 'next/router'

import styles from "styles/Search/search.module.css"

export default function RemoveQuery({ queryKey, text, modifyQuery }) {
    const router = useRouter()
    return <h6 style={{ fontWeight: "normal" }}>
        <button className={styles.btn} onClick={() => {
            modifyQuery({[queryKey]: undefined})
        }}>
            <BsX size={24} />
        </button>
        {text}
    </h6>
}