import React from "react";
import Calender from "../calender/Calender";
import Navbar from "../navbar/Navbar";
import Profile from "../userProfile/Profile";
import styles from "./ProfilePage.module.css";
const ProfilePage = () => {
  return (
    <>
      <Navbar pageType="Admin" />
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <Profile />
          <Calender />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
