import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Card from "../userCard/Card";
import Navbar from "../navbar/Navbar";
import styles from "./Employees.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DepartmentSidenavBar from "../navbar/DepartmentSidenavBar";
const EmployeesPage = () => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState(null);

  useEffect(() => {
    try {
      const getdata = () => {
        const atoken = window.localStorage.getItem("accessToken");
        const rtoken = window.localStorage.getItem("refreshToken");
        if (atoken) {
          const config = {
            headers: {
              Authorization: `Bearer ${atoken}`,
            },
          };

          Promise.resolve(
            axios.get(
              "https://apis.techdevelopers.live/api/users/team/" +
                params.className,
              config
            )
          )
            .then((res) => {
              console.log(res);
              setEmployeeList(res.data.users);
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
  }, []);
  return (
    <>
      <Navbar pageType="Admin" />

      <DepartmentSidenavBar />

      {employeeList != null && employeeList.length > 0 ? (
        <div className={styles.mainContainer}>
          {employeeList.map((e, i) => {
            return (
              <Card
                name={e.userName}
                rank={e.teamName}
                image="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319946.png"
                presentDays={e.attendance.previousMonth.P}
                absentDays={e.attendance.previousMonth.A}
                userId="6287c0407433a51b80464df4"
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.noEmployeeDiv}>
          <h1 className={styles.noEmployeeText}>
            Currently, No Member in this Department. Click on the{" "}
            <AiOutlinePlusCircle /> icon to add new members
          </h1>
        </div>
      )}
    </>
  );
};

export default EmployeesPage;
