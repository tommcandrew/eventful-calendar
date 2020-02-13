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
  const login = (e, cb) => {
    let errorMessage;
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios.post("/api/login", { email, password }).then(res => {
      if (res.status === 200) {
        const { token, userName } = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        setUserName(userName);
        cb();
      } else {
        errorMessage = res.data;
        setErrorMessage(errorMessage);
      }
    });
  };

  const register = (e, cb) => {
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    let errorMessage;
    axios
      .post("/api/register", { name, email, password, password2 })
      .then(res => {
        if (res.status === 200) {
          const token = res.data;
          localStorage.setItem("my-token", token);
          setAuthenticated(true);
          setUserEmail(email);
          setUserName(name);
          cb();
        } else {
          errorMessage = res.data;
          setErrorMessage(errorMessage);
        }
      });
  };

  const logout = cb => {
    localStorage.removeItem("my-token");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        errorMessage,
        loading,
        login,
        logout,
        register,
        setAuthenticated,
        setErrorMessage,
        userEmail,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
