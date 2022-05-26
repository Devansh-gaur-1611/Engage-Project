import React from "react";
import Navbar from "../components/navbar/Navbar";
import WebCam from "../components/landingPage/webcam";

const Home = () => {
  return (
    <>
      <Navbar pageType="Normal"/>
      <WebCam />
    </>
  );
};

export default Home;
