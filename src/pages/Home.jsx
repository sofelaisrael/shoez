import { BiSupport } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { GiWallet } from "react-icons/gi";
import { TfiTruck } from "react-icons/tfi";
import { BsArrowRight } from "react-icons/bs";
import React, { useEffect, useRef, useState } from 'react'
import dta from '../data/amazon_uk_shoes_dataset.json'
import Filtered from '../Components/Filtered'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Nike from '../assets/Nike.png'
import Puma from '../assets/Puma.png'
import sketchers from '../assets/sketchers.png'
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import sales1 from '../assets/sales1.jpg'
import sales2 from '../assets/sales2.jpg'
import sales3 from '../assets/sales3.jpg'
import sales4 from '../assets/sales4.jpg'
import sales5 from '../assets/sales5.jpg'
import sales6 from '../assets/sales6.jpg'


const Home = () => {
    const [filt, setFilt] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        let bg = document.querySelectorAll('.para')
        // let dark = document.querySelector('.dar')
        window.addEventListener('scroll', function () {
            bg.forEach((b, index) => {
                let val = this.window.scrollY
                b.style.top = val * 0.5 * (index - 1.5) / 2 + 'px'
                b.style.transform = `rotate(-${val * 0.03 + 12}deg)`
            })
            //   dark.style.top = val * 0.25 + 'px'
        })
    })

    return (
        <div>
            <div className="grid gridows-2 max-lg:grid-rws-6 grid-cols-5 max-lg:grid-cols-3 p-10 max-md:px-5 max-sm:px-0 border-b border-[#0a0a0a] max-sm:pb-5 pt-20">
                <div className="row-span-4 col-span-3 h-[500px] max-lg:h-ful p-2 max-lg:row-span-2 max-md:h-[300px]">
                    <div className="flex justify-center items-start bg-[#333] relative w-full overflow-hidden  h-full rounded-lg flex-col con">
                        <span className="text-white font-bold text-[32px] px-10 z-20" >
                            Start Exploring
                        </span>
                        <Link to={'/filteredProducts'} className='text-black transition-all duration-300 flex justify-start px-4 z-20 items-center font-bold w-20 h-10 rounded-md mx-10 bg-white hover:w-24 relative'>
                            GO
                            <BsArrowRight className="absolute right-3" />
                        </Link>
                        <img className=' h-full absolute right-0 top-0 -rotate-12 -translate-y-0 para  hover:rotate-0' src={Puma} alt="" />
                    </div>
                </div>

                <div className="row-span-1 max-lg:row-span-2 col-span-2 max-lg:col-span-3 p-2 h-[250px] max-lg:h-[300px] max-md:h-[250px]">
                    <div className="bg- w-full h-full overflow-hidden rounded-lg bg-[#6B522E] relative con flex-col flex justify-center items-start">
                        <span className="text-white font-bold text-[32px] px-10 z-20 w-[70%] max-sm:w-full" >
                            Quality Shoes You Can Trust
                        </span>
                        <img className='h-full absolute right-0 top-0 -rotate-12 -translate-y-0 para ' src={Nike} alt="" />
                    </div>
                </div>
                <div className="row-span-1  max-md:hidden max-lg:row-span-2 col-span-2 h-[250px] p-2 max-lg:col-span-3 max-lg:h-[300px]">
                    <div className="con bg- w-full h-full overflow-hidden rounded-lg bg-[#BAA2A0] relative flex-col flex justify-center items-start">
                        <span className="text-white leading-[30px] font-bold text-[32px] px-10 z-20 w-[70%] " >
                            Get For All Sizes, Colors and Types
                        </span>
                        <img className='h-full absolute right-0 top-0 -rotate-12 -translate-y-0 para ' src={sketchers} alt="" />
                    </div>

                </div>
            </div>

            <div className="exc uppercase flex flex-col justify-center items-center h-[400px] titletext leading-[44px] bg-[url('./assets/banner1.jpg')] bg-cover text-white">
                <span className="text-[24px] max-md:text-[18px] font-light" >up to 30% off</span>
                <span className="text-[50px] max-md:leading-[24px] max-md:text-[32px]">Exclusive</span>
                <span className="text-[50px] max-md:text-[32px] font-bold">new shoes</span>
                <Link to={'/filteredProducts'} className="border-2 b px-5  m-5 hover:px-10 max-md:text-[12px]  transition-all duration-200 ">
                    Shop Now
                </Link>
            </div>

            {/* <div className="grid pt-20 grid-cols-3 max-lg:grid-cols-1 gap-10 px-20 max-lg:px-10 max-sm:px-5 max-md:pt-10 max-sm:pt-5">
                <div className="flex flex-col justify-center item relative   overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-white">
                    <img src={sales1} alt="" className="absolute -z-20 top-0  left-0 object-cover max-sm:h-[100%] lg:h-[100%] lg:w-full" />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
                <div className="flex flex-col justify-center item relative  overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-white">
                    <img src={sales2} alt="" className="absolute -z-20 top-0 left-0 object-cover max-sm:h-[100%]  lg:h-[100%] lg:w-full" />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
                <div className="flex flex-col justify-center item relative  overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-black">
                    <img src={sales3} alt="" className="absolute -z-20 top-0 left-0 object-cover max-sm:h-[100%] lg:h-[100%] lg:w-full " />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
            </div> */}

            <div className="service flex justify-between p-10 text-center mt-10 bg-[#26292e] max-md:gap-5 text-white max-md:grid grid-cols-2 max-md:p-5 ">
                <div className="icon flex items-center gap-3 max-lg:text-[16px] max-md:text-[12px] text-[28px] jusc justify-center">
                    <TfiTruck />
                    <span>Free Home Delivery</span>
                </div>
                <div className="icon max-lg:text-[16px] flex items-center gap-3 max-md:text-[12px] text-[28px] justify-center">
                    <GiWallet />
                    <span>Secure Payment</span>
                </div>
                <div className="icon max-lg:text-[16px] flex items-center gap-3 max-md:text-[12px] text-[28px] justify-center" >
                    <CiDiscount1 />
                    <span>Order Discount</span>
                </div>
                <div className="icon max-lg:text-[16px] flex items-center gap-3 max-md:text-[12px] text-[28px] justify-center">
                    <BiSupport />
                    <span>24/7 Online Support</span>
                </div>
            </div>

            <div className="exc uppercase flex flex-col justify-center items-center h-[400px] titletext leading-[44px] bg-[url('./assets/banner2.jpg')] bg-center bg-cover text-white">
                <span className="text-[24px] max-md:text-[18px] font-light" >up to 30% off</span>
                <span className="text-[50px] max-md:leading-[24px] max-md:text-[32px]">Exclusive</span>
                <span className="text-[50px] max-md:text-[32px] font-bold">new shoes</span>
                <Link to={'/filteredProducts'} className="border-2 b px-5  m-5 hover:px-10 max-md:text-[12px]  transition-all duration-200 ">
                    Shop Now
                </Link>
            </div>

            {/* <div className="grid pt-20 grid-cols-3 max-lg:grid-cols-1 gap-10 px-20  max-md:pt-10 pb-10 max-sm:py-5 max-lg:px-10 max-sm:px-5">
                <div className="flex flex-col justify-center item relative  overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-white">
                    <img src={sales4} alt="" className="absolute -z-20 top-0 left-0 object-cover max-sm:h-[100%] lg:h-[100%] lg:w-full " />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
                <div className="flex flex-col justify-center item relative  overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-white">
                    <img src={sales5} alt="" className="absolute -z-20 top-0 left-0 object-cover max-sm:h-[100%] lg:h-[100%] lg:w-full " />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
                <div className="flex flex-col justify-center item relative  overflow-hidden items-center border h-[250px] max-md:h-[400px] max-sm:h-[300px] col-span-1 text-white">
                    <img src={sales6} alt="" className="absolute -z-20 top-0 left-0 object-cover max-sm:h-[100%]  lg:h-[100%] lg:w-full" />
                    <span className="text-[20px]">sale 50% off</span>
                    <span className="font-bold text-[24px] max-lg:text-[40px] max-sm:text-[32px] uppercase">New Arrivals</span>
                </div>
            </div> */}


        </div>
    )
}

export default Home
