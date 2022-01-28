import { BsFillExclamationTriangleFill, BsPlusSquare, BsXSquare } from "react-icons/bs";
import { useState } from "react";
import styles from "styles/Seller/index/alerts.module.css"
import DeleteAlert from "./DeleteAlert";

function AlertItem({ alert, removeAlert, className }) {
  const [modalShow, setModalShow] = useState(false);

  return <div className={`${styles.alerts_item} ${className}`}>
    {alert.message}
    <div className={styles.alerts_buttons}>
      <button type="submit" className={styles.alerts_buttons}
        onClick={() => setModalShow(true)}>
        <BsXSquare />
      </button>
      <DeleteAlert
          show={modalShow}
          onHide={() => setModalShow(false)}
          alert={alert}
          removeAlert={removeAlert}
      />
    </div>
  </div>

}

export default function HomeAlerts({ alerts, removeAlert }) {

  return (!alerts || alerts.length === 0) ? <></> : <div className={styles.alerts}>
    <div className={styles.alerts_top}>
      <BsFillExclamationTriangleFill />
    </div>
    <div className={styles.alerts_content}>
      {(alerts ?? []).map((alert, i) => <AlertItem key={alert._id} className={i % 2 === 0 ? styles.alerts_item_even : styles.alerts_item_odd}
        alert={alert} removeAlert={removeAlert} />)}
    </div>
    <div className={styles.alerts_bottom}></div>
  </div>
}