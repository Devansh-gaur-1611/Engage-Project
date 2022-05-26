import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import NormalNavBar from "./NormalNavBar";
import { useDispatch, useSelector } from "react-redux";
import { getSidebar, smallSidebarOpen} from "../../features/Sidebar/SidebarSlice";

const Navbar = ({ pageType, hasSidebar }) => {
  // Declaring variables
  const [burgerClicked, setBurgerClicked] = useState(false);
  const dispatch = useDispatch();
  const sidebar = useSelector(getSidebar);

  // Handling burger clicks
  const handleBurger = () => {
    setBurgerClicked(!burgerClicked);
  };
  const handleBurgerByLogo = () => {
    setBurgerClicked(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${burgerClicked ? styles.expandNav : ""}`}>
        <div
          className={`${styles.logo} ${styles.visible} ${pageType == "Admin" ? styles.adminLogo : ""}`}
          onClick={handleBurgerByLogo}
        >
          <Link to="/">
            <img src="" alt="Logo" />
          </Link>
        </div>

        {pageType == "Normal" && (
          <NormalNavBar burgerClicked={burgerClicked} setBurgerClicked={setBurgerClicked} handleBurger={handleBurger} />
        )}

        {pageType == "Admin" && (
          <>
            <h2 className={styles.adminHeading}>
              Hi<span className={styles.hand}>👋</span>, Welcome to the Admin Panel
            </h2>
            {hasSidebar &&
              <div className={styles.burgerAdmin} onClick={() => dispatch(smallSidebarOpen())}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
              </div>
            }
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
