import React,{useEffect, useState} from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import styles from "./Department.module.css";
import Dept from "./dept";
import DeptCard from "./DeptCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CreateDeptModal from "../createDept/CreateDept";
import MainSideNavbar from "../navbar/MainSideNavbar";

const ProfilePage = () => {
  const [isOpen,setIsOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [dept,setDept]=useState()
  const [totalClasses,setTotalClasses] = useState(0)

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
            axios.get("https://apis.techdevelopers.live/api/getallteams", config)
          )
            .then((res) => {
              console.log(res.data)
              setDept(res.data.teams)
              setTotalClasses(res.data.length);
              return;
            })
            .catch((error) => {
              console.log(error+"YoYoerror")
              if (error.response && error.response.status === 401) {
                axios.post("https://apis.techdevelopers.live/api/user/refresh", {
                    refresh_token: rtoken,
                  }
                ).then((res) => {
                    localStorage.setItem("accessToken",res.data.access_token);
                    localStorage.setItem("refreshToken",res.data.refresh_token);
                    getdata();
                    return;
                  })
                  .catch((error) => {
                    enqueueSnackbar("You are not logged in", {
                      variant: "error",
                    });
                    window.localStorage.clear();
                    navigate("/")
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
      enqueueSnackbar("Some error occured" , {
        variant: "error",
      });
      return;
    }
  },[])

  return (
    <>
      <Navbar pageType="Admin"/>

      <MainSideNavbar currentPage="Department" />
      <div className={styles.mainContainer}>
        <div className={styles.createDept}>
          <h1 className={styles.create} onClick={()=>setIsOpen(!isOpen)}>
            <AiOutlinePlusCircle /> &nbsp;&nbsp;Create Dept.
          </h1>
        </div>
        <div className={styles.container}>
          {(dept!==undefined) && dept.map((e, i) => {
            return (
              <DeptCard
                key={e._id}
                name={e.teamName}
                abv={e.abreviation}
                color={e.teamBg}
              />
            );
          })}
        </div>
        {isOpen && <CreateDeptModal setIsOpen={setIsOpen} totalClasses={totalClasses} setTotalClasses={setTotalClasses}/>}
      </div>
    </>
  );
};

export default ProfilePage;
