import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import signinImage from "../../assets/signInImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = ({ pageType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Promise.resolve(
      axios.post(
        "https://apis.techdevelopers.live/api/user/login",
        {
          email,
          password,
        },
        config
      )
    )
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("refreshToken", res.data.refresh_token);
        localStorage.setItem("userId", res.data.id);
        enqueueSnackbar("Logged in successfully", {
          variant: "success",
        });
        navigate(
          pageType == "Admin" ? "/department" : `/userprofile/${res.data.id}`
        );
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.message;
        enqueueSnackbar(message, {
          variant: "error",
        });
        navigate(pageType == "Admin" ? "/" : "");
      });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.imageContainerSignIn}>
            <span className={styles.iconContainer}>
              {/* <img src="/images/logoNew.svg" className={styles.icon} /> */}
            </span>
            <img src={signinImage} alt="signin" className={styles.image} />
          </div>
          <div className={styles.formContainer}>
            <div className={styles.container}>
              <div className={styles.logoSmallScreenContainer}>
                {/* <img
                src="/images/logoNew.svg"
                className={styles.iconSmallScreen}
              /> */}
              </div>
              <div className={styles.formTitleContainer}>
                <h1 className={styles.formTitle}>
                  Login{pageType == "Admin" ? " as Admin" : ""}{" "}
                </h1>
              </div>
              {/* <div className={styles.form}> */}
              <form onSubmit={loginHandler}>
                <label className={styles.inputLabel}>Email</label>
                <div className={styles.inputBox}>
                  <input
                    type="email"
                    placeholder="abc@gmail.com"
                    required
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <label className={styles.inputLabel}>Password</label>
                <div className={styles.inputBox}>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    required
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {pageType != "Admin" && (
                  <div className={styles.forgotPassword}>
                    <p className={styles.forgotText} onClick={() =>navigate("/recoverpassword")}>Forgot Password</p>
                  </div>
                )}
                <div className={styles.submitBtnContainer}>
                  <button className={styles.signInbtn}>Sign In</button>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
