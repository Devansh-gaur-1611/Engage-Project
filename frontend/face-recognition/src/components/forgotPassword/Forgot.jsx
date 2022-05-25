import React, { useEffect, useState } from "react";
import styles from "./Forgot.module.css";
import axios from "axios";
import forgotImage from "../../assets/forgotImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [num,setNum]= useState(0)
  const [code, setCode] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [otpStatus, setOtpStatus] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error_message, setErrorMsg] = React.useState(false);
  const [reSendActive, setReSendActive] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const textInput1 = React.useRef(null);
  const textInput2 = React.useRef(null);
  const textInput3 = React.useRef(null);
  const textInput4 = React.useRef(null);
  const textInput5 = React.useRef(null);
  const textInput6 = React.useRef(null);
  const box = [textInput1,textInput2,textInput3,textInput4,textInput5,textInput6];

  function handleClick(from, to) {
    if (from.current.value.length) {
      to.current.focus();
    }
  }

  const [isAllFilled, setIsAllFilled] = React.useState(false);
  const filledTest = () => {
    if (
      textInput1.current.value.length == 1 &&
      textInput2.current.value.length == 1 &&
      textInput3.current.value.length == 1 &&
      textInput4.current.value.length == 1 &&
      textInput5.current.value.length == 1 &&
      textInput6.current.value.length == 1
    ) {
      setIsAllFilled(true);
      return;
    }
    setIsAllFilled(false);
    return;
  };

  const getOTPHandler = (e)=>{
    e.preventDefault();
    setNum(1)
  }
  const submitOTPHandler = (e)=>{
    e.preventDefault()
    setNum(2)
  }

  const newPasswordHandler = (e)=>{
    e.preventDefault()
    navigate("/login")
  }


  
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.imageContainerSignIn}>
            <span className={styles.iconContainer}>
              {/* <img src="/images/logoNew.svg" className={styles.icon} /> */}
            </span>
            <img src={forgotImage} alt="signin" className={styles.image} />
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
                <h1 className={styles.formTitle}>Forgot Password</h1>
              </div>
              {/* <div className={styles.form}> */}

              {/* Email Form */}
              {(num==0)&&<form onSubmit={getOTPHandler}>
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
                <div className={styles.submitBtnContainer}>
                  <button className={styles.signInbtn}>Get OTP</button>
                </div>
              </form>}


              {/* OTP Form */}
              {num==1 && <form onSubmit={submitOTPHandler}>
                <label className={styles.inputLabel}>Enter your OTP</label>
                <div className={styles.inputBox}>
                  <div className={styles.otpInput}>
                    {box.map((obj, index) => {
                      return index < 5 ?
                        <input autoComplete='on' type="text" key={index} ref={box[index]} maxLength="1" className={styles.otpValueRecovery} onKeyUp={() => { handleClick(obj, box[index + 1]); filledTest(); }} required />
                        :
                        <input autoComplete='on' type="text" key={index} ref={box[index]} maxLength="1" className={styles.otpValueRecovery} onKeyUp={() => { filledTest(); }} required />

                    })}
                  </div>
                </div>

                
                <div className={styles.submitBtnContainer}>
                  <button className={styles.signInbtn}>Submit OTP</button>
                </div>
              </form>}


              {/* New Password Form */}
              {num==2 && <form onSubmit={newPasswordHandler}>
                <label className={styles.inputLabel}>New Password</label>
                <div className={styles.inputBox}>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    required
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <label className={styles.inputLabel}>Confirm Password</label>
                <div className={styles.inputBox}>
                  <input
                    type="password"
                    placeholder="Re-Enter your new Password"
                    required
                    className={styles.input}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={styles.submitBtnContainer}>
                  <button className={styles.signInbtn}>Submit</button>
                </div>
              </form>}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
