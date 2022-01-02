import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Navbar, FormControl, InputGroup } from "react-bootstrap";
import { BsJustify, BsPersonCircle, BsBagFill, BsSearch } from "react-icons/bs";

import Dropdown from "components/NavBar/Dropdown";
import LogoReversed from "components/Logos/LogoReversed";
import useToken from "hooks/useToken";

import styles from "styles/NavBar/NavBar.module.css";

const NavBar = (props) => {
  const router = useRouter();

  const [showDropdown, setshowDropdown] = useState(false);
  const dropButtonRef = useRef(null);
  const { token } = useToken();

  return (
    <>
      <Navbar className={styles.navbar} bg="primary">
        <Container fluid>
          <Container className="d-flex align-items-center py-0">
            <button className={styles.btn} onClick={props.handleShowSideBar}>
              <BsJustify size={48} />
            </button>
            <Container className={styles.brand}>
              <Navbar.Brand href="/">
                <LogoReversed height={50} width={170} />
              </Navbar.Brand>
            </Container>
          </Container>
          <InputGroup className={`d-flex flex-row ${styles.sinput}`}>
            <FormControl
              autoFocus={true}
              className={styles.searchBox}
              placeholder="Search"
              defaultValue={router.query.query}
              onKeyUp={(event) => {
                props.handleSearch(event.target.value);
              }}
            />
            <button className={styles.searchBtn}>
              <BsSearch />
            </button>
          </InputGroup>
          <Container className="d-flex flex-row-reverse">
            {!token ? (
              <button
                ref={dropButtonRef}
                className={styles.btn}
                onClick={() => {
                  showDropdown ? setshowDropdown(false) : setshowDropdown(true);
                }}
              >
                <BsPersonCircle size={48} className="me-3" />
              </button>
            ) : (
              <>
                <button
                  className={styles.btn}
                  onClick={props.handleShowCheckout}
                >
                  <BsBagFill size={48} />
                </button>
                <button
                  ref={dropButtonRef}
                  className={styles.btn}
                  onClick={() => {
                    showDropdown
                      ? setshowDropdown(false)
                      : setshowDropdown(true);
                  }}
                >
                  <BsPersonCircle size={48} className="me-3" />
                </button>
              </>
            )}
          </Container>
        </Container>
      </Navbar>
      <Dropdown
        btnRef={dropButtonRef}
        state={[showDropdown, setshowDropdown]}
      />
    </>
  );
};

export default NavBar;
