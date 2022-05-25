import React from "react";
import SideNavBar from "./SideNavBar";
import {
  IoChevronBackOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

import styles from "./SideNavBar.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

const DepartmentSidenavBar = () => {
  const params = useParams()
  console.log(params);
  return (
    <SideNavBar>
      <div className={styles.deptTopSection}>
        <Link to={`/department`} className={styles.deptBackLink}>
          <div className={styles.icon1}>
            <IoChevronBackOutline />
          </div>
          <div className={styles.icon2}>
            <IoArrowBackCircleOutline />
          </div>
          <p className={styles.back}>All Deptartments</p>
        </Link>
      </div>
      <div className={styles.middleContainer}>
        <div
          className={styles.iconContainer}
          style={{ backgroundColor: "#00ff04" }}
        >
          <div className={styles.abv}>CB</div>
        </div>
        <div className={styles.deptName}>Crime Branch</div>
      </div>
      <Link to={`/${params.className}/addParticipants`}>
        <div className={styles.bottomContainer}>
          <div className={styles.addIcon}>
            <AiOutlinePlusCircle />
          </div>
          <div className={styles.text}>Add Participants</div>
        </div>
      </Link>
    </SideNavBar>
  );
};

export default DepartmentSidenavBar;
