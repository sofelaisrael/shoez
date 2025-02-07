import { IoTrashOutline } from "react-icons/io5";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart } from "../../features/slices/cartSlice";
import {
  addToCart,
  removeFromCart,
  clearCart,
  removeItem,
} from "../features/cartSlice";
import { Link } from "react-router-dom";
import CartItems from "../Components/CartItems";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const loading = useSelector((state) => state.cart.loading);
  const getLastPrice = (price) => {
    const last = price.lastIndexOf("£");
    return price.slice(last + 1);
  };
  const dispatch = useDispatch();

  return (
    <div className="min-h-[100vh] pt-20">
      {loading ? (
        <>
          <div className="h-[100vh]"></div>
          <CgSpinnerTwo
            className="absolute top-1/2 left-1/2 animate-spin"
            size={50}
          />
        </>
      ) : cart.length > 0 ? (
        <div className="mx-auto px-10 max-md:px-5 relative flex flex-col gap-5">
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <CartItems item={item} />
              {/* <hr /> */}
            </React.Fragment>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="none mx-auto w-[80%]  max-lg:w-[90%] relative text-center text-[32px] font-bold h-[200px] flex items-center justify-center">
            No items available in your cart
          </div>
        )
      )}
      <div className="btns flex items-center justify-between max-lg:gap-3 w-[80%] max-lg:w-[90%] max-lg:flex-col mx-auto py-10">
        <div className="shop max-lg:w-full  max-lg:h-[50px]">
          <Link
            to={"/filteredProducts"}
            className="shopping p-5 cursor-pointer text-white font-bold bg-[#232324] rounded-md max-lg:h-full  max-lg:p-0  max-lg:flex justify-center items-center block hover:bg-[#EB3E32] transition-all max-lg:text-[14px] duration-300 border max-lg:w-full text-center"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="cart flex items-center gap-5  max-lg:gap-8 max-lg:flex-col-reverse max-lg:w-full ">
          <div className="tot font-bold">
            Subtotal: £{totalPrice.toFixed(2)}
          </div>
          <div
            className="clear p-5 max-lg:p-0  max-lg:flex justify-center items-center cursor-pointer hover:text-white max-lg:h-[50px] font-bold bg-transparent rounded-md hover:bg-[#232324] text-center transition-all duration-300 border max-lg:text-[14px] max-lg:w-full"
            onClick={() => dispatch(clearFirestoreCart())}
          >
            Clear Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
