import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      {/* {pathname == "register" && console.log("dont show")}
      <Navbar />
      <Outlet />
      <Footer /> */}
      {pathname != "/log-in" && pathname != "/register" ? (
        <Navbar />
      ) : (
        ""
      )}
      <Outlet />
      {pathname != "/log-in" && pathname != "/register" ? <Footer /> : ""}
    </>
  );
}

export default App;
