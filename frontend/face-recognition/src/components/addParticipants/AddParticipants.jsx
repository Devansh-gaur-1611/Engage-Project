import React, { useState, useEffect } from "react";
import styles from "./AddParticipants.module.css";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { handleFileInputChange, getBase64 } from "./helper";
import { storage } from "../../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
const AddParticipants = () => {
  const params = useParams();
  const teamName = params.className;
  const [file, setFile] = useState(null);
  const [base64URL, setbase64URL] = useState("");
  const [loading, setLoading] = useState(false);
  const [encoding, setEncoding] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workProfile, setWorkProfile] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (file != null && file != undefined) {
      getBase64(file)
        .then((result) => {
          setbase64URL(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [file]);
  useEffect(() => {
    setLoading(false);
  }, [base64URL]);

  const notSubmit = (e) => {
    e.preventDefault();
    alert("Process image first");
  };
  const getEncoding = () => {
    if (base64URL != "") {
      // console.log(base64URL);
      Promise.resolve(
        axios.post("http://127.0.0.1:5000/getEncodings", { data: base64URL })
      )
        .then((res) => {
          console.log("response: " + res.data.encodeList[0]);
          setEncoding(res.data.encodeList[0].toString());
          enqueueSnackbar("Face identified accurately", {
            variant: "success",
          });
        })
        .catch((error) => {
          console.log("error: " + error);
          enqueueSnackbar("Image not processed. Please try again", {
            variant: "error",
          });
          setEncoding(null);
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (encoding == null) {
      enqueueSnackbar("Image not processed. Please try again", {
        variant: "error",
      });
      return;
    }
    if (file != undefined && file !== null) {
      // console.log(encoding)
      uploadFiles(file)
    }
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          submit(url)
        });
      }
    );
  };
  

  const submit = (firebaseURL) => {
    try {
      const getdata = () => {
        const atoken = window.localStorage.getItem("accessToken");
        const rtoken = window.localStorage.getItem("refreshToken");
        if (atoken) {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${atoken}`,
            },
          };

          Promise.resolve(
            axios.post(
              "https://apis.techdevelopers.live/api/user/register",
              {
                userName: name,
                email: email,
                workProfile: workProfile,
                teamName: teamName,
                profileImgLink: firebaseURL,
                encodings: encoding,
                contactNumber: mobileNumber,
              },
              config
            )
          )
            .then((res) => {
              console.log(res.data);
              return;
            })
            .catch((error) => {
              console.log(error + "YoYoerror");
              if (error.response && error.response.status === 401) {
                axios
                  .post("https://apis.techdevelopers.live/api/user/refresh", {
                    refresh_token: rtoken,
                  })
                  .then((res) => {
                    localStorage.setItem("accessToken", res.data.access_token);
                    localStorage.setItem(
                      "refreshToken",
                      res.data.refresh_token
                    );
                    getdata();
                    return;
                  })
                  .catch((error) => {
                    enqueueSnackbar("You are not logged in", {
                      variant: "error",
                    });
                    window.localStorage.clear();
                    navigate("/");
                    return;
                  });
              }
            });
        } else {
          enqueueSnackbar("You need to login first", {
            variant: "error",
          });
          window.localStorage.clear();
          navigate("/");
          return;
        }
      };

      getdata();
      return;
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Some error occured", {
        variant: "error",
      });
      return;
    }
  };

  return (
    <>
      <Navbar pageType="Admin" />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Add New Participant</h1>
          <form
            className={styles.form}
            onSubmit={(e) =>
              encoding != null ? submitHandler(e) : notSubmit(e)
            }
          >
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setName(e.target.value)}
            />
            <label className={styles.label}>Rank</label>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setWorkProfile(e.target.value)}
            />
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles.label}>Mobile Number</label>
            <input
              type="number"
              className={styles.input}
              required
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <label className={styles.label}>Image</label>
            <div className={styles.inputGroup}>
              <input
                type="file"
                name="myImage"
                accept="image/*"
                className={styles.inputImage}
                onChange={(e) => {
                  handleFileInputChange(
                    e,
                    setLoading,
                    setFile,
                    setbase64URL,
                    setEncoding
                  );
                }}
              />
              <input
                type="button"
                className={styles.btnGetEncodings}
                value="Get Encodings"
                onClick={getEncoding}
              />
            </div>
            <input type="submit" className={styles.btnSubmit} value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddParticipants;
