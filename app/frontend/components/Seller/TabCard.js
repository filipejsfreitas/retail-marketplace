import { useState } from "react";
import { Card } from "react-bootstrap"

import styles from 'styles/Seller/tab_card.module.css'

export default function TabCard({ tabs, children, ...props }) {
  const [selected, setSelected] = useState(0)
  return <Card {...props} style={{
    "filter": "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))",
    "border": "1px solid #EAEDF2",
    "border-radius": "10px",
  }}>
    <div className={styles.header}>
      {tabs.map(({ tab }, i) =>
        <div key={i} onClick={() => setSelected(i)}
          className={`${styles.card_tab} ${selected === i ? styles.card_tab_selected : styles.card_tab_unselected}`}>
          {tab}
        </div>)
      }
      <div className={styles.card_extras}>
        {children}
      </div>
    </div>
    <Card.Body style={{
      "width": "100%",
      "height": "90%",
      "overflow-x": "auto",
      "overflow-y": "auto",
      "padding": "0",
    }}>
      {tabs[selected].content}
    </Card.Body>
  </Card>
}