import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NAvbar from "./components/NAvbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import UserContext from "./context/UserContext";
function App() {
  const ctx = useContext(UserContext);
  // console.log(ctx.userLogin.login);
  let login = ctx.userLogin.login;
  console.log(ctx);
  return (
    <>
      <BrowserRouter>
        <NAvbar />
        <Routes>
          <Route
            path="/"
            element={login === true ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/cart"
            element={login === true ? <Cart /> : <Navigate to={"/login"} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={login === false ? <Login /> : <Navigate to={"/"} />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
