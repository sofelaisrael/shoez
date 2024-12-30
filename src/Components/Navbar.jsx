import { HiOutlineCheck } from "react-icons/hi";
import { CgClose, CgProfile } from "react-icons/cg";
import { CiEdit, CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { getInitials } from "../helpers/helper";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { initializeServerApp } from "firebase/app";
import { fetchFirestoreCart } from "../features/cartSlice";

const Navbar = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("random name");
  const [search, setSearch] = useState("random email");
  const [init, setInit] = useState("");

  useEffect(() => {
    setName(localStorage.getItem('displayName'));
    setSearch(localStorage.getItem('email'));
    setInit(getInitials(name));
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        setError("No user found. Please log in.");
        navigate("/sign-in");
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);
  return (
    <>
      <div className="nav flex h-[80px] justify-between items-center px-10 max-md:px-5 fixed z-[1000000] bg-[#26292e] text-white top-0 w-full">
        <Link to={"/"} className="nav-brand titletext font-bold text-[32px] ">
          Shoe-z
        </Link>
        <div className="icons flex justify-center items-center gap-5 ">
          <div className="acc cursor-pointer">
            {/* <CgProfile className="text-[32px] max-md:text-[24px]" /> */}
            <Popup
              arrow={false}
              modal
              contentStyle={{
                borderRadius: "10px",
                minWidth: "270px",
                background: "transparent",
              }}
              overlayStyle={{ width: "100vw" }}
              position={"bottom right"}
              trigger={
                <div className="init w-[40px] h-[40px] rounded-full bg-white text-black flex items-center justify-center cursor-pointer relative">
                  {init}
                </div>
              }
            >
              <div className="name  overflow-clip p-5 dark:bg-[#0a0a0a] dark:text-white bg-white z-50 rounded-lg flex gap-5 flex-col">
                <div className="name flex flex-col">
                  <div className="text-sm text-slate-300">Username:</div>
                  <div className="na flex justify-between items-center text-clip">
                    {name}
                  
                  </div>
                </div>

                <div className="name overflow-hidden text-ellipsis">
                  <div className="text-clp text-sm text-slate-300">Email:</div>
                  {search}
                </div>
                <div className="btns flex flex-col gap-2">
                  <div
                    onClick={() => {
                      navigate("/sign-in");
                      localStorage.clear();
                    }}
                    className="logout border text-[#210331] transition-all duration-200 underline cursor-pointer text-sm self-center hover:bg-[#210331] hover:text-white w-full text-center p-3 rounded-lg dark:text-white"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </Popup>
          </div>
          {/* </div> */}

          <Link to={"/wishlist"} className="wish cursor-pointer">
            <CiHeart className="text-[32px] max-md:text-[24px]" />
          </Link>

          <Link to={"/cart"} className="cart relative cursor-pointer">
            <CiShoppingCart className="text-[32px] max-md:text-[24px]" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
