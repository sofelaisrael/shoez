import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { fetchCart } from "../features/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const amount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <>
      <div className="nav flex h-[80px] justify-between items-center px-10 max-md:px-5 fixed z-[1000000] bg-[#26292e] text-white top-0 w-full">
        <Link to={"/"} className="nav-brand titletext font-bold text-[32px] ">
          Shoe-z
        </Link>

        <div className="nav-actions">
          <Unauthenticated>
            <SignInButton mode="modal">
              <button className="sign-in-button">Sign In</button>
            </SignInButton>
          </Unauthenticated>
        </div>
        <Authenticated>
          <div className="icons flex justify-center items-center gap-5 ">
            <UserButton />
            <Link to={"/wishlist"} className="wish cursor-pointer">
              <CiHeart className="text-[32px] max-md:text-[24px]" />
            </Link>
            <Link to={"/cart"} className="cart relative cursor-pointer">
              <div className="text-white text-[12px] w-4 flex justify-center items-center h-4 rounded-full bg-[#EB3E32]  absolute right-0 top-0">
                {amount}
              </div>
              <CiShoppingCart className="text-[32px] max-md:text-[24px]" />
            </Link>
          </div>
        </Authenticated>
      </div>
    </>
  );
};

export default Navbar;
