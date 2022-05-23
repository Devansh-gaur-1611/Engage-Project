import React,{useState,useEffect} from "react";
import axios from "axios"
import { useSnackbar } from "notistack";
import {useParams,useNavigate} from "react-router-dom"
import Calender from "../calender/Calender";
import Navbar from "../navbar/Navbar";
import Profile from "../userProfile/Profile";
import styles from "./ProfilePage.module.css";

const ProfilePage = ({pageType}) => {
  const params = useParams()
  const[name,setName] = useState("")
  const[imgURL,setImgURL] = useState("")
  const[workProfile,setWorkProfile] = useState("")
  const[teamName,setTeamName] = useState("")
  const[mobileNumber,setMobileNumber] = useState("")
  const[email,setEmail] = useState("")
  const[currentMonthAttendence,setCurrentMonthAttendence] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  console.log("first")

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
  console.log("first123")
          
            axios.get("https://apis.techdevelopers.live/api/users/"+params.userId, config)
          
            .then((res) => {
              console.log("object");
              console.log(res.data.users.attendance.currentMonth)
              setName(res.data.users.userName)
              setTeamName(res.data.users.teamName)
              setEmail(res.data.users.email)
              setMobileNumber(res.data.users.contactNumber)
              setWorkProfile("CTO")
              setCurrentMonthAttendence(res.data.users.attendance.currentMonth)
             
              return;
            })
            .catch((error) => {
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
      navigate("/")
      return;
    }
  },[])

  return (
    <>
      <Navbar pageType={pageType} />
      <div className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <Profile name={name} imgURL={imgURL} workProfile={workProfile} teamName={teamName} mobileNumber={mobileNumber} email={email}/>
          <Calender currentMonthAttendence={currentMonthAttendence}/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
