import { IoTrashOutline } from "react-icons/io5";
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart } from "../../features/slices/cartSlice";
import { addToCart, removeFromCart, clearCart, removeitem } from "../features/cartSlice";
import { Link } from 'react-router-dom';


const Cart = () => {

    const cart = useSelector((state) => state.cart.cart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const getLastPrice = (price) => {
        const last = price.lastIndexOf('£')
        return price.slice(last + 1)
    }
    const dispatch = useDispatch();

    return (
        <div className='h-[100vh] pt-20'>
            <div className="flex w-[80%] max-lg:w-[90%] items-center mx-auto h-[70px] max-md:h-[50px] max-md:gap10 bg-[#f7f7f7] justify-end  gap20 max-md:text-[14px] max-md:w-[90%]">
                <div className="px-10 font-bold prod flex-grow max-md:px-5 ">Product</div>
                <div className="w-[120px] max-lg:w-[100px]  max-md:w-[70px] max-md: text-center font-bold pri">Price</div>
                <div className="w-[120px] max-lg:w-[100px]  max-md:w-[70px] text-center font-bold qty">Quantity</div>
                <div className="w-[120px] max-lg:w-[100px]  max-md:w-[70px] text-center font-bold tot">Total</div>
            </div>
            {cart.length > 0 ? (
                <div className='mx-auto w-[80%]  max-lg:w-[90%] relative'>
                    {cart.map((item, index) => {
                        return (
                            <>
                                <div className="flex  items-center mx-auto h-[70px]  justify-start  gap20 my-10  max-md:text-[14px] relative max-md:h-[50px] max-md:gap10">
                                    <IoTrashOutline className='absolute top-1/2 text-[24px] max-lg:-left-6 max-lg:text-[18px] -translate-y-1/2 max-md:-left-5 max-md:text-[16px]' onClick={() => dispatch(removeitem(item))} />
                                    <Link className='flex-grow w-[500px] max-md:w-[200px] max-md:text-[12px]  max-lg:w-[300px]' to={`/filteredProducts/${item.asin}`}>
                                        <div className="lg:px-10 font-bold flex items- prod lg:flex-grow gap-10 items-center max-lg:gap-3">
                                            <div className="img h-[70px] flex  w-[100px] max-lg:w-[100px]   p2 ma-md:hidden">

                                                <img className='w-full object-contain' src={item.img} alt="" />
                                            </div>
                                            {item.name}
                                        </div>
                                    </Link>
                                    <div className="w-[120px] max-lg:w-[100px] max-md:w-[70px] max-md:text-[12px]  text-center  font-bold pri">
                                        £{item.price}
                                    </div>
                                    <div className="w-[120px] max-lg:w-[100px] max-md:w-[70px] max-md:text-[12px]  text-center font-bold qty">
                                        <span className=' p-2 cursor-pointer border-r-0 border' onClick={() => dispatch(removeFromCart(item))}>-</span>
                                        <span className="h- border-t border-b p-2">
                                            {item.amount}

                                        </span>
                                        <span className=' p-2 cursor-pointer border-l-0 border' onClick={() => dispatch(addToCart({
                                            price: item.price,
                                            text: item.text,
                                            name: item.name,
                                            amount: 1,
                                            asin: item.asin
                                        }))}>+</span>
                                    </div>
                                    <div className="w-[120px] max-lg:w-[100px] max-md:w-[70px] max-md:text-[12px]  text-center font-bold tot">
                                        £{(item.totalPrice).toFixed(2)}
                                    </div>
                                </div>
                                <hr />

                            </>

                        );
                    })}

                </div>
            ) : (
                <div className="none mx-auto w-[80%]  max-lg:w-[90%] relative text-center text-[32px] font-bold h-[200px] flex items-center justify-center">No items avaiable in your cart</div>
            )}


            <div className="btns flex items-center justify-between max-lg:gap-3 w-[80%] max-lg:w-[90%] max-lg:flex-col mx-auto py-10">
                <div className="shop max-lg:w-full  max-lg:h-[50px]">
                    <Link to={'/filteredProducts'} className="shopping p-5 cursor-pointer text-white font-bold bg-[#232324] rounded-md max-lg:h-full  max-lg:p-0  max-lg:flex justify-center items-center block hover:bg-[#EB3E32] transition-all max-lg:text-[14px] duration-300 border max-lg:w-full text-center">
                        Continue Shopping
                    </Link>
                </div>
                <div className="cart flex items-center gap-5  max-lg:gap-8 max-lg:flex-col-reverse max-lg:w-full ">
                    <div className="tot font-bold">
                        Subtotal:
                        £{(totalPrice).toFixed(2)}
                    </div>
                    <div className="clear p-5 max-lg:p-0  max-lg:flex justify-center items-center cursor-pointer hover:text-white max-lg:h-[50px] font-bold bg-transparen rounded-md hover:bg-[#232324] text-center transition-all duration-300 border max-lg:text-[14px] max-lg:w-full" onClick={() => dispatch(clearCart())}>
                        Clear Cart
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart
