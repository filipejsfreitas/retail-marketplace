import { BsFillExclamationTriangleFill, BsPlusSquare, BsXSquare } from "react-icons/bs";
import { useState } from "react";
import styles from "styles/Seller/index/alerts.module.css"
import DeleteAlert from "./DeleteAlert";

function AlertItem({ index, text, id }) {
  const [modalShow, setModalShow] = useState(false);

  return <div className={`${styles.alerts_item} ${index % 2 === 0 ? styles.alerts_item_even : styles.alerts_item_odd}`}>
    {text}
    <div className={styles.alerts_buttons}>
      <BsPlusSquare />
      <button type="submit" className={styles.alerts_buttons}
        onClick={() => setModalShow(true)}>
        <BsXSquare />
      </button>
      <DeleteAlert
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
      />
    </div>
  </div>

}

export default function HomeAlerts({ alerts}) {

  return <div className={styles.alerts}>
    <div className={styles.alerts_top}>
      <BsFillExclamationTriangleFill />
    </div>
    <div className={styles.alerts_content}>
      {alerts.map((alert, i) => <AlertItem key={i} text={alert.message} index={i} id={alert._id} />)}
    </div>
    <div className={styles.alerts_bottom}></div>
  </div>
}