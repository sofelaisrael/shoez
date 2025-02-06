import { CgProfile } from "react-icons/cg"; 
import { CiHeart } from "react-icons/ci"; 
import { CiShoppingCart } from "react-icons/ci"; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const Navbar = () => {
    const [navState, setNavState] = useState(false);
    const dispatch = useDispatch();
    const amount = useSelector((state) => state.cart.totalAmount)
    // const totalQTY = useSelector(selectTotalQTY);

    // const onCartToggle = () => {
    //     dispatch(setOpenCart({
    //         cartState: true
    //     }))
    // }
    // window.scrollTo(0,0)

    return (
        <>
            <div className="nav flex h-[80px] justify-between items-center px-10 max-md:px-5 fixed z-[1000000] bg-[#26292e] text-white top-0 w-full">
                <Link to={'/'} className="nav-brand titletext font-bold text-[32px] ">
                    Shoe-z
                </Link>
                <div className="icons flex justify-center items-center gap-5 ">
                    <div className="acc cursor-pointer">
                        <CgProfile className="text-[32px] max-md:text-[24px]" />
                    </div>
                    <Link to={'/wishlist'} className="wish cursor-pointer">
                        <CiHeart className="text-[32px] max-md:text-[24px]" />
                    </Link>
                    <Link to={'/cart'}  className="cart relative cursor-pointer">
                        <div className="text-white text-[12px] w-4 flex justify-center items-center h-4 rounded-full bg-[#EB3E32]  absolute right-0 top-0">{amount}</div>
                        <CiShoppingCart className="text-[32px] max-md:text-[24px]" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar