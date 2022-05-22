import React, { useState, useEffect } from "react";
import styles from "./AddParticipants.module.css";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
const AddParticipants = () => {
  const params = useParams();
  const [file, setFile] = useState(null);
  const [base64URL, setbase64URL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    if (e.target.files[0] != undefined) {
      setLoading(true);
      setFile(e.target.files[0]);
    } else {
      setFile(null);
      setbase64URL("");
      setLoading(false);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    // console.log("file changes");
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

  const getEncoding = () => {
    if (base64URL != "") {
    }
  };

  return (
    <>
      <Navbar pageType="Admin" />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Add New Participant</h1>
          <form className={styles.form}>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} />
            <label className={styles.label}>Rank</label>
            <input type="text" className={styles.input} />
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} />
            <label className={styles.label}>Mobile Number</label>
            <input type="number" className={styles.input} required />
            <label className={styles.label}>Image</label>

            <div className={styles.inputGroup}>
              <input
                type="file"
                name="myImage"
                accept="image/*"
                className={styles.inputImage}
                onChange={(e) => {
                  handleFileInputChange(e);
                }}
              />
              <input
                type="button"
                className={styles.btnGetEncodings}
                value="Get Encodings"
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
