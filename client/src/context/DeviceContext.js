import React, { useState, createContext, useEffect } from "react";

const DeviceContext = createContext();

export const DeviceContextProvider = props => {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const w = window.innerWidth;
    if (w > 1264) {
      setDevice("desktop");
    } else if (w < 1264 && w > 480) {
      setDevice("tablet");
    } else {
      setDevice("mobile");
    }
  }, []);

  return (
    <DeviceContext.Provider value={{ device }}>
      {props.children}
    </DeviceContext.Provider>
  );
};

export default DeviceContext;
