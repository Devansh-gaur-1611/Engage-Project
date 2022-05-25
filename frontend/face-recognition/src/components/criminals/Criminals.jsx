import React from "react";
import Navbar from "../navbar/Navbar";
import Webcam from "react-webcam";

const Criminals = () => {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [currDeviceIndex,setCurrDeviceIndex] = React.useState(0)
  

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  React.useEffect(() => {console.log(devices)},[devices])
  const getScreenShot = () => {
      console.log(currDeviceIndex)
    setDeviceId(devices[setCurrDeviceIndex(currDeviceIndex+1)].deviceId)
  }

  return (
    <>
      <Navbar pageType="Normal" />
      {devices.map((device, key) => (
          <div>
            <Webcam audio={false} mirrored="true" videoConstraints={{width:300,height:300, deviceId: device.deviceId }} />
            {device.label || `Device ${key + 1}`}

            <button onClick={getScreenShot}>Get</button>
          </div>

        ))}
    </>
  );
};

export default Criminals;
