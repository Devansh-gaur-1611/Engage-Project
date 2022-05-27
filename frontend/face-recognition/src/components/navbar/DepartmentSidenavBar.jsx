import React from "react";
import SideNavBar from "./SideNavBar";
import { IoChevronBackOutline, IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch,useSelector } from "react-redux";
import { smallSidebarClose } from "../../features/Sidebar/SidebarSlice";
import {getDepartment} from "../../features/Department/DepartmentSlice"
import styles from "./SideNavBar.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

const DepartmentSidenavBar = () => {
  // Declaring variables
  const params = useParams();
  const dispatch = useDispatch();
  const department = useSelector(getDepartment)

  return (
    <SideNavBar>
      <div className={styles.deptTopSection}>
        <Link
          to={`/department`}
          className={styles.deptBackLink}
          onClick={() => {
            dispatch(smallSidebarClose());
          }}
        >
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
        <div className={styles.iconContainer} style={{ backgroundColor: department.color }}>
          <div className={styles.abv}>{department.abv}</div>
        </div>
        <div className={styles.deptName}>{department.deptName}</div>
      </div>
      <Link
        to={`/${params.className}/addParticipants`}
        onClick={() => {
          dispatch(smallSidebarClose());
        }}
        className={styles.link}
      >
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
