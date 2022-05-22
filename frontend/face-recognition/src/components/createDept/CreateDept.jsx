import React, { useState,useEffect } from "react";
import styles from "./CreateDept.module.css";
import axios from "axios";
import RandomColor from "./randomColor";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
const CreateDeptModal = ({ setIsOpen,totalClasses,setTotalClasses }) => {
  const [deptName, setDeptName] = useState("");
  const [abv, setAbv] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const getAbrevation = () => {
    const allWords = deptName.split(" ");
    if (allWords.length < 2) {
      return deptName.slice(0, 2).toUpperCase();
    } else {
      return allWords[0][0].toUpperCase() + allWords[1][0].toUpperCase();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
              "https://apis.techdevelopers.live/api/create/team",
              {
                adminId: localStorage.getItem("userId"),
                teamName: deptName,
                teamBg: RandomColor(),
                abreviation:
                  abv.trim() != "" && abv.trim().length == 2
                    ? abv
                    : getAbrevation(),
              },
              config
            )
          )
            .then((res) => {
              enqueueSnackbar(res.data.msg, {
                variant: "Success",
              });
              setTotalClasses(totalClasses+1);
              setIsOpen(false);
              return;
            })
            .catch((error) => {
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
                    setIsOpen(false);
                    return;
                  })
                  .catch((error) => {
                    enqueueSnackbar("You are not logged in", {
                      variant: "error",
                    });
                    window.localStorage.clear();
                    setIsOpen(false);
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
          setIsOpen(false);
          navigate("/");
          return;
        }
      };

      getdata();
      setIsOpen(false);
      return;
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Some error occured", {
        variant: "error",
      });
      setIsOpen(false);
      return;
    }
  };

  useEffect(() => {},[totalClasses])
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Create New Department</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.modalContent}>
              <label className={styles.label}>Department Name</label>
              <input
                type="text"
                className={styles.input}
                required
                onChange={(e) => setDeptName(e.target.value)}
              />
              <label className={styles.label}>Abreviation {`(Optional)`}</label>
              <input
                className={styles.input}
                type="text"
                minLength="2"
                maxLength="2"
                onChange={(e) => setDeptName(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <input
                className={styles.submitBtn}
                type="submit"
                value="Submit"
                // onClick={() => setIsOpen(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateDeptModal;
