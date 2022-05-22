import React from "react";
import Navbar from "../components/navbar/Navbar";
import WebCam from "../components/webcam";

const Home = () => {
  return (
    <>
      <Navbar pageType="Normal"/>
      <WebCam />
    </>
  );
};

export default Home;
