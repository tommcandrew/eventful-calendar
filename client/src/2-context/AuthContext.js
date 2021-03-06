import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const token = localStorage.getItem("my-token");
    if (token) {
      axios
        .get("/api/checkAuth", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          if (res.data.user) {
            setUserEmail(res.data.user.email);
            setUserName(res.data.user.name);
            setAuthenticated(true);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, []);

  //login and register are called from Home component
  const login = e => {
    let errorMessage;
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios
      .post("/api/login", { email, password })
      .then(res => {
        const { token, userName } = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        setUserName(userName);
      })
      .catch(err => {
        errorMessage = err.response.data;
        setErrorMessage(errorMessage);
      });
  };

  const register = e => {
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    let errorMessage;
    axios
      .post("/api/register", { name, email, password, password2 })
      .then(res => {
        const token = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        setUserName(name);
      })
      .catch(err => {
        errorMessage = err.response.data;
        setErrorMessage(errorMessage);
      });
  };

  const loginDemo = () => {
    const email = "demouser@gmail.com";
    const password = "demo12345";
    axios
      .post("/api/login", { email, password })
      .then(res => {
        const { token, userName } = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        setUserName(userName);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        errorMessage,
        loading,
        login,
        register,
        setAuthenticated,
        setErrorMessage,
        userEmail,
        userName,
        loginDemo
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
