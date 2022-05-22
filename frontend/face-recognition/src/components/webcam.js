import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import styles from "./webcam.module.css";
import { BsCameraVideo } from "react-icons/bs";
import { BsCameraVideoOff } from "react-icons/bs";
import { useSnackbar } from "notistack";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [width, setWidth] = useState();
  const [widthWebcam, setWidthWebCam] = useState(740);
  const [heightWebCam, setHeightWebCam] = useState(416);
  const { enqueueSnackbar } = useSnackbar();
  const videoConstraints = {
    width: widthWebcam,
    height: heightWebCam,
    facingMode: "user",
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  });
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [width]);

  useEffect(() => {
    if (width >= 1350) {
      setWidthWebCam(740);
      setHeightWebCam(416);
    } else if (width < 1350 && width > 925) {
      setWidthWebCam(width / 2);
      setHeightWebCam(width / (2 * 1.7794));
    } else if (width <= 925 && width >= 500) {
      setWidthWebCam(450);
      setHeightWebCam(240);
    } else if (width < 500) {
      setWidthWebCam(width - 40);
      setHeightWebCam((width - 40) / 1.7794);
    } else if (width < 400) {
      setWidthWebCam(width - 20);
      setHeightWebCam((width - 20) / 1.7794);
    }
  }, [width]);

  // console.log(webCamContainer.current.style)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc = " + imageSrc);
    Promise.resolve(axios.post("http://127.0.0.1:5000/api", { data: imageSrc }))
      .then((res) => {
        console.log("response: " + res);
        setName(res.data);
        enqueueSnackbar("Congratulations!!"+name+", Your attendence is marked", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  }, [webcamRef]);

  const changeWebcanConfig = () => {
    setWebcamEnabled(!webcamEnabled);
  };

  return (
    <div className={styles.container}>
      <div className={styles.webCamContainer}>
        {!webcamEnabled ? (
          <div
            className={styles.webcamDisabledContainer}
            style={{
              width: widthWebcam,
              height: heightWebCam,
              background: "gray",
              borderRadius: "10px",
            }}
          ></div>
        ) : (
          <Webcam
            audio={false}
            height={heightWebCam}
            ref={webcamRef}
            mirrored="true"
            screnshotFormat="images/jpeg"
            width={widthWebcam}
            style={{ borderRadius: "10px", display: "block" }}
            videoConstraints={videoConstraints}
          />
        )}

        <button
          className={`${styles.changeWebcanConfig} ${
            webcamEnabled ? "" : styles.disabled
          }`}
          onClick={changeWebcanConfig}
        >
          {webcamEnabled ? (
            <BsCameraVideo
              style={{ color: "white", height: "24px", width: "24px" }}
            />
          ) : (
            <BsCameraVideoOff
              style={{ color: "white", height: "24px", width: "24px" }}
            />
          )}
        </button>
      </div>

      <div className={styles.btnContainer}>
        <div>
          <button
            onClick={() =>
              webcamEnabled
                ? capture()
                : alert("Please turn on your camera to mark your attendence")
            }
            className={styles.btnAttendence}
          >
            Mark Attendence
          </button>
          {/* <select className={styles.inputFull} required>
          <option
            value=""
            // selected
            // disabled
            hidden
            className={styles.disabledOption}
          >
            Select
          </option>
          <option value="2" className={styles.genderOption}>
            Male
          </option>
          <option value="0" className={styles.genderOption}>
            Female
          </option>
        </select> */}
        </div>
        <button className={styles.btnSeeAttendence}>See your Attendence</button>
      </div>
      <h2 style={{ color:"white"}}>{name}</h2>
    </div>
  );
};

export default WebcamCapture;
