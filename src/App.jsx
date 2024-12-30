import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchFirestoreCart } from "./features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchFirestoreCart());
  }, [dispatch]);
  const amount = cart.reduce((sum, item) => sum + item.amount, 0);
  console.log(amount);
  

  useEffect(() => {
    const userID = localStorage.getItem("userID");

    if (userID) {
      //
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, []);

  const [error, setError] = useState("");
  const userDetails = useRef([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       
        userDetails.current = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        console.log(user);

        console.log(userDetails);
      } else {
       
        setError("No user found. Please log in.");
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      {pathname != "/sign-in" && pathname != "/sign-up" ? (
        <Navbar info={amount} />
      ) : (
        ""
      )}
      <Outlet />
      {pathname != "/sign-in" && pathname != "/sign-up" ? <Footer /> : ""}
    </>
  );
}

export default App;
