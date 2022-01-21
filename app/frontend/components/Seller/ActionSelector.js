import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import styles from 'styles/Seller/action_selector.module.css'

function useOutsideAlerter(ref) {
  const [isInside, setIsInside] = useState(true)
  useEffect(() => {
    const handleClick = e => {
      setIsInside(ref.current && ref.current.contains(e.target))
    }

    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [ref]);
  return {
    isInside: isInside
  }
}

export default function ActionSelector({ show, setShow, options }) {
  const { isReady } = useRouter()
  const wrapperRef = useRef(null);
  const { isInside } = useOutsideAlerter(wrapperRef)
  useEffect(() => {
    setShow(s => s && isInside)
  }, [isInside])

  return <>
    {show && <div className={styles.window} >
      <div ref={wrapperRef} className={styles.window_child}>
        {options.map((option, i) => <div key={i} className={`${i % 2 === 0 ? styles.even : ""}`}>
          {option}
        </div>)}
      </div>
    </div>}
  </>
}
