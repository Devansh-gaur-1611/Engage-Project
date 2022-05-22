import React from "react";
import styles from "./Profile.module.css"


const Profile = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.topContainer}>
          <h1 className={styles.heading}>User Profile</h1>
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.image}>
            {/* <img src="{userImg}" alt="user" /> */}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.name}>Devansh Gaur</div>
            <div className={styles.rank}>Sub - Inspector</div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Team</h1>
            <p className={styles.answer}>Crime Branch</p>
          </div>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Mobile No.</h1>
            <p className={styles.answer}>9012345671</p>
          </div>
          <div className={styles.innerBottomContainer}>
            <h1 className={styles.header}>Email</h1>
            <p className={styles.answer}>abc123@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
