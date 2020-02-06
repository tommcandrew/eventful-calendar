import React, { useState, createContext, useEffect } from "react";

const DeviceContext = createContext();

export const DeviceContextProvider = props => {
  const [device, setDevice] = useState(null);
  const [windowSize, setWindowSize] = useState(getWidth());

  useEffect(() => {
    window.addEventListener("resize", e => {
      console.log("window has resized");
      setWindowSize(getWidth());
    });
  }, []);

  useEffect(() => {
    console.log(windowSize);
    if (windowSize > 1264) {
      setDevice("desktop");
      console.log("desktop");
    } else if (windowSize < 1264 && windowSize > 480) {
      setDevice("tablet");
      console.log("tablet");
    } else {
      setDevice("mobile");
      console.log("mobile");
    }
  }, [windowSize]);

  function getWidth() {
    const width = window.innerWidth;
    return width;
  }

  return (
    <DeviceContext.Provider value={{ device }}>
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
