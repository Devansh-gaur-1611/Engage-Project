import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NormalNavBar from "./NormalNavBar";

const Navbar = ({ pageType }) => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const handleBurger = () => {
    setBurgerClicked(!burgerClicked);
  };

  const handleBurgerByLogo = () => {
    setBurgerClicked(false);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${burgerClicked ? styles.expandNav : ""}`}
      >
        <div
          className={`${styles.logo} ${styles.visible} ${pageType=="Admin"?styles.adminLogo:""}`}
          onClick={handleBurgerByLogo}
        >
          <Link to="/">
            <img src="" alt="Logo" />
          </Link>
        </div>
        {pageType == "Normal" && (
          <NormalNavBar
            burgerClicked={burgerClicked}
            setBurgerClicked={setBurgerClicked}
            handleBurger={handleBurger}
          />
        )}
        {pageType == "Admin" && <h2 className={styles.adminHeading}>Hi<span className={styles.hand}>👋</span>, Welcome to the Admin Panel</h2>}
      </nav>
    </>
  );
};

export default Navbar;
