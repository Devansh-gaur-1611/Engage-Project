import React from "react";
import styles from "./SideNavBar.module.css";

const SideNavBar = ({ children }) => {
  return <div className={styles.sideBar}>{children}</div>;
};

export default SideNavBar;
