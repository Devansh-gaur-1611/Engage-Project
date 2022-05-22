import React,{useEffect,useRef} from "react";
import { Link } from "react-router-dom";

import style from "./Navbar.module.css";

const NormalNavBar = ({burgerClicked,setBurgerClicked,handleBurger}) => {
  const hamburger = useRef(null);
  const navOptions = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
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
      <ul
        className={`${style.navList} ${
          !burgerClicked ? style.hideVisibility : ""
        }`}
        ref={navOptions}
      >
        <hr className={style.line}></hr>
        <Link className={style.link} to="/" onClick={handleBurger}>
          <li>Home</li>
        </Link>
        <Link
          className={style.link}
          to="/detectcriminals"
          onClick={handleBurger}
        >
          <li>Detect Criminals</li>
        </Link>
        <Link className={style.link} to="/detectmissing" onClick={handleBurger}>
          <li>Detect Missing Person</li>
        </Link>
        <Link className={style.linkAdmin} to="/adminlogin">
          <li>Admin Panel</li>
        </Link>
      </ul>
      <Link className={style.linkAdminBtn} to="/adminlogin">
        <button className={style.adminButton}>Admin Panel</button>
      </Link>
      {!burgerClicked && (
        <div className={style.burger} onClick={handleBurger} ref={hamburger}>
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>
      )}
      {burgerClicked && (
        <div
          className={`${style.close} ${style.smallScreen}`}
          onClick={handleBurger}
          ref={hamburger}
        ></div>
      )}
    </>
  );
};

export default NormalNavBar;
