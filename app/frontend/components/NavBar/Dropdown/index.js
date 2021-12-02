import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'react-bootstrap'
import Link from 'next/link'

import OutsideHandler from 'components/NavBar/Dropdown/OutsideHandler'

import styles from 'styles/NavBar/Dropdown/Dropdown.module.css'

// Custom dropdown component with animation
// Needs to be given a btnRef prop with the reference
// linked to the button that is going to show the dropdown
// and also needs a state as a prop linked to visibility of the
// Dropdown
// This componet behaves difirently if a user prop is given, 
// for example, if it is not shows button to login if the user
// prop is supplied it shows information relative to the user account
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
        { props.user
          ?
          <div ref={nodeRef} className={styles.dd_wrapper}>
            <div className={styles.dd_top_user}>
              <div className={styles.dd_top_user_welcome_div}>
                Welcome
                <div>{props.user.username}</div>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/link-passhref */}
                <Link href="/logout" ><Button className={styles.dd_logoutBtn} variant="secondary">Log Out</Button></Link>
              </div>
            </div>
            <div className={styles.dd_bot_user}>
              Your Account
              <div className={styles.dd_bot_user_interior}>
                <Link href="/account/info">Account</Link>
                <Link href="/account/order">Orders</Link>
                <Link href="/account/address">Addresses</Link>
                <Link href="/account/watchlist">Watchlist</Link>
                <Link href="/account/favorites">Favorites</Link>
              </div>
            </div>
          </div>
          :
          <div ref={nodeRef} className={styles.dd_wrapper}>
            <div className={styles.dd_top}>
              Welcome
            </div>
            <div className={styles.dd_bot}>
              {/* eslint-disable-next-line @next/next/link-passhref */}
              <Link href="/login" ><Button variant="secondary">Log In</Button></Link>
              {/* eslint-disable-next-line @next/next/link-passhref */}
              <Link href="/register" ><Button variant="secondary">Register</Button></Link>
            </div>
          </div>
        }
      </OutsideHandler>
    </CSSTransition>
  );
};      

export default Dropdown