import React from "react";
import Card from "../userCard/Card";
import Navbar from "../navbar/Navbar";
import SideNavBar from "../navbar/SideNavBar";
import styles from "./Employees.module.css";
import DepartmentSidenavBar from "../navbar/DepartmentSidenavBar";
const EmployeesPage = () => {
  return (
    <>
      <Navbar pageType="Admin"/>

      <DepartmentSidenavBar />
      <div className={styles.mainContainer}>
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="31"
          totalDays="31"
          userId="124ft5fghbu12w"
        />
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="2"
          totalDays="31"
          userId="124ft5fghbu12w"
        />{" "}
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="13"
          totalDays="31"
          userId="124ft5fghbu12w"
        />{" "}
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="11"
          totalDays="31"
          userId="124ft5fghbu12w"
        />{" "}
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="29"
          totalDays="31"
          userId="124ft5fghbu12w"
        />{" "}
        <Card
          name="RK Gautum"
          rank="Sub - Inspector"
          image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
          presentDays="21"
          totalDays="31"
          userId="124ft5fghbu12w"
        />
      </div>
    </>
  );
};

export default EmployeesPage;
