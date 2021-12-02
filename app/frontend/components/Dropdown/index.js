import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'react-bootstrap'
import Link from 'next/link'

import OutsideHandler from 'components/Dropdown/OutsideHandler'

import styles from 'styles/Dropdown/Dropdown.module.css'

// Custom dropdown component with animation
// Needs to be given a btnRef prop with the reference
// linked to the button that is going to show the dropdown
// and also needs a state as a prop linked to visibility of the
// Dropdown
const Dropdown = (props) => {
  const nodeRef = useRef(null);
  const buttonRef = props.btnRef;

  const [showDropdown, setshowDropdown] = props.state;

  return (
    <CSSTransition
      in={showDropdown}
      timeout={500}
      classNames={{
        enter: styles.dd_enter,
        enterActive: styles.dd_enter_active,
        exit: styles.dd_exit,
        exitActive: styles.dd_exit_active,
      }}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <OutsideHandler
        state={[showDropdown, setshowDropdown]}
        buttonRef={buttonRef}
      >
        <div ref={nodeRef} className={styles.dd_wrapper}>
          <div bg="primary" className={styles.dd_top}>
            Welcome
          </div>
          <div className={styles.dd_bot}>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href="/login" ><Button variant="secondary">Log In</Button></Link>
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href="/register" ><Button variant="secondary">Register</Button></Link>
          </div>
        </div>
      </OutsideHandler>
    </CSSTransition>
  );
};      

export default Dropdown