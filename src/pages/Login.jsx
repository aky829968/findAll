import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const ctx = useContext(UserContext);
  let emailRef = useRef("");
  let passwordRef = useRef("");
  let arr = JSON.parse(localStorage.getItem("Ecom-User")) || [];
  const handleSubmit = (e) => {
    // e.preventDefault();
    e.preventDefault();
    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(obj);
    let existingUser = arr.find((ele) => ele.email === obj.email);
    if (existingUser) {
      if (existingUser.password === obj.password) {
        toast.success("Login Successfully");
        navigate("/");

        ctx.loginUser({ email: obj.email, login: true });
      } else {
        toast.error("Wrong Password");
      }
    } else {
      toast.error("User Not Found,Please SignUp");
    }
  };
  return (
    <div>
      <form className="max-w-sm mx-auto bg-blue-200 p-8 rounded-lg">
        <h1 className="text-3xl text-center mb-4">Login Form</h1>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <p>
          Don't have a Account <Link to={"/signup"}>Register</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
