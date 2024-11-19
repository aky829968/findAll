import React, { useState } from "react";
import UserContext from "./UserContext";
import { toast } from "react-toastify";

const UserState = (props) => {
  let userAuth = JSON.parse(localStorage.getItem("ecom-login"));
  console.log(userAuth);
  // console.log(userAuth.login);
  const [userLogin, setUserLogin] = useState({
    email: userAuth ? userAuth.email : " ",
    login: userAuth ? userAuth.login : false,
  });
  console.log(userLogin.login);
  const loginUser = (obj) => {
    localStorage.setItem(
      "ecom-login",
      JSON.stringify({ email: obj.email, login: true })
    );
    setUserLogin({ email: obj.email, login: true });
  };
  const logout = () => {
    localStorage.removeItem("ecom-login");
    setUserLogin({ email: "", login: false });
    toast.success("Logout successfully", { position: "top-center" });
  };
  return (
    <UserContext.Provider
      value={{ userLogin, setUserLogin, loginUser, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
