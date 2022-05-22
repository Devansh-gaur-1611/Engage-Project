import React from "react";
import SideNavBar from "./SideNavBar";
import styles from "./SideNavBar.module.css";
import {Link} from "react-router-dom"

const MainSideNavbar = ({ currentPage }) => {
  return (
    <SideNavBar>
      <div className={styles.mainSideNavbar}>
        <Link to ="/department"
          className={`${styles.item} ${
            currentPage == "Department" && styles.selected
          }`}
        >
          <p className={styles.text}>Department</p>
        </Link>
        <Link to = "/criminaldb"
          className={`${styles.item} ${
            currentPage == "Criminals" && styles.selected
          }`}
        >
          <p className={styles.text}>Criminal Db</p>
        </Link>
        <Link to = "/missingdb"
          className={`${styles.item} ${
            currentPage == "Missing" && styles.selected
          }`}
        >
          <p className={styles.text}>Missing Persons Db</p>
        </Link>
      </div>
    </SideNavBar>
  );
};

export default MainSideNavbar;
