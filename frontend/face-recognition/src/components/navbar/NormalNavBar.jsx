import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const NormalNavBar = ({ burgerClicked, setBurgerClicked, handleBurger }) => {
  // Declaring variables
  const hamburger = useRef(null);
  const navOptions = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,then close the menu
      if (
        hamburger.current &&
        !hamburger.current.contains(e.target) &&
        navOptions.current &&
        !navOptions.current.contains(e.target)
      ) {
        setBurgerClicked(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [hamburger]);

  return (
    <>
      <ul className={`${styles.navList} ${!burgerClicked ? styles.hideVisibility : ""}`} ref={navOptions}>
        <hr className={styles.line}></hr>
        <Link className={styles.link} to="/" onClick={handleBurger}>
          <li>Home</li>
        </Link>
        <Link className={styles.link} to="/detectcriminals" onClick={handleBurger}>
          <li>Detect Criminals</li>
        </Link>
        <Link className={styles.link} to="/detectmissing" onClick={handleBurger}>
          <li>Detect Missing Person</li>
        </Link>
        <Link className={styles.linkAdmin} to="/adminlogin">
          <li>Admin Panel</li>
        </Link>
      </ul>
      <Link className={styles.linkAdminBtn} to="/adminlogin">
        <button className={styles.adminButton}>Admin Panel</button>
      </Link>
      {!burgerClicked && (
        <div className={styles.burger} onClick={handleBurger} ref={hamburger}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      )}
      {burgerClicked && (
        <div className={`${styles.close} ${styles.smallScreen}`} onClick={handleBurger} ref={hamburger}></div>
      )}
    </>
  );
};

export default NormalNavBar;
