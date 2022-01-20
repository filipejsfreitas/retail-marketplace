import { BsThreeDots } from "react-icons/bs";

import styles from 'styles/common/dotted_option.module.css'

export default function DottedOption({ ...props }) {
  return <div style={{ "display": "flex" }}>
    <div className={styles.dot_div} {...props}>
      <BsThreeDots style={{ "height": "16px", "width": "16px" }} />
    </div>
  </div>
}