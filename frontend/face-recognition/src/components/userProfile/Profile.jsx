import React from "react";
import styles from "./Profile.module.css"


const Profile = ({name, workProfile, teamName, mobileNumber, email, imgURL }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <h1 className={styles.heading}>User Profile</h1>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.image}>
            <img src={imgURL} alt="user" />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.name}>{name}</div>
            <div className={styles.rank}>{workProfile}</div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Team</h1>
            <p className={styles.answer}>{teamName}</p>
          </div>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Mobile No.</h1>
            <p className={styles.answer}>{mobileNumber}</p>
          </div>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Email</h1>
            <p className={styles.answer}>{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
