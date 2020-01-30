import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("my-token");
    if (token) {
      axios
        .get("/checkAuth", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(res => {
          if (res.data.user) {
            setUserEmail(res.data.user.email);
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

  const login = (e, cb) => {
    console.log("login");
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios.post("/login", { email, password }).then(res => {
      if (res.status === 200) {
        const token = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        cb();
      } else {
        console.log("unable to log in");
        cb();
      }
    });
  };

  const register = (e, cb) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    axios.post("/register", { email, password, password2 }).then(res => {
      if (res.status === 200) {
        const token = res.data;
        localStorage.setItem("my-token", token);
        setAuthenticated(true);
        setUserEmail(email);
        cb();
      } else {
        console.log("unable to log in");
        cb();
      }
    });
  };

  const logout = cb => {
    localStorage.removeItem("my-token");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, userEmail, login, logout, register, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
