import { AiFillHeart } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";
import { singleProduct } from "../features/productSlice";
import React from 'react'
import { addToCart } from "../features/cartSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = ({ data }) => {
    const dispatch = useDispatch()

    const defdata = data

    return (
        <Link to={`/filteredProducts/${defdata.asin}`}  className="col-span-1 border rounded-lg p-2">
            <div className="product-item w-[100%] mx-auto">
                <div className="inner-content relative">
                    <div className="product-thum relative h-[150px] overflow-hidden" onClick={() => {
                        // location.reload()
                         dispatch(singleProduct(defdata.asin));
                    }}>
                        <Link to={`/filteredProducts/${defdata.asin}`}>

                            {/* {defdata.images_list.length > 1 ? (
                                <div className="imgs"> */}

                                    {/* <img src={defdata.images_list[1]} className="w p-5 lg:p-12" /> */}
                                    <img src={defdata.images_list[0]} className="w p-5 lg:p-12" />
                                {/* </div>
                            ) : (
                                <img src={defdata.images_list[0]} className="w p-5" />

                            )} */}
                        </Link>

                    </div>

                    <div className="product-info  flex flex-col text-nowrap">
                        <span className="font-bold text-[18px] overflow-x-clip text-ellipsis">{defdata.title}</span>
                        <span className="font-bold text-[10px] text-[#8a8a8a] overflow-clip">{defdata.brand}</span>
                        <div className="prices">
                        </div>
                    </div>
                    <div className="view border rounded-full text-center text-[12px]">View Product</div>
                </div>
            </div>
        </Link>
    )
}

export default Product
