import { AiFillInstagram } from "react-icons/ai"; 
import { AiFillTwitterCircle } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import React from 'react'

const Footer = () => {
    return (
        <div className=" p-20 max-md:p-5 footer-main bg-[#26292E] text-[#f6f6f6] ">
            <div className="grid grid-cols-4 max-md:grid-cols-2 max-lg:grid-cols-3 gap-10 place-content-center  ">
                <div className="item col-span-2 flex flex-col gap-5 font-bold">
                    <div className="text-[48px] ">
                        Shoe-z
                    </div>
                    <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptate quo laborum quaerat inventore provident mollitia nihil nulla vitae repudiandae soluta distinctio reprehenderit nesciunt vel iste, voluptates nobis facilis. Nihil.</p>
                    <div className="social-icons flex text-[32px] items-center  gap-3  max-md:text-[24px]">
                        <span><BsFacebook /></span>
                        <span><AiFillTwitterCircle /></span>
                        <span><AiFillInstagram /></span>
                        <span></span>
                    </div>
                </div>
                <div className="item  flex flex-col max-md:col-span-full  h-full widget-account-item">
                    <h4 className="h-[50px] text-[28px] max-md:text-[20px] mb-3  widget-title">My Account</h4>
                    <div className="widget-menu-wrap">
                        <ul className="flex flex-col gap-2 font-bold">
                            <li>Home</li>
                            <li>Shopping cart</li>
                            <li>Shop</li>
                        </ul>
                    </div>
                </div>
                <div className="item  flex flex-col h-full max-md:col-span-full">
                    <h4 className="text-[28px] max-md:text-[20px] mb-3  widget-title">Contact Info</h4>
                    <div className="">
                        <ul className='flex flex-col gap-2 font-bold'>
                            <li><span>Address:</span> Your address goes here.</li>
                            <li><span>Phone//fax:</span>0123456789</li>
                            <li>Email: demo@example.com</li>
                            <li>www.example.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
