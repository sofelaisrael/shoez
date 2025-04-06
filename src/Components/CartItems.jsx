import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeOneFromCart,
  removeItem,
} from "../features/cartSlice";
import { useNavigate} from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const CartItems = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();

  return (
    <div>
      <div className="item flex p-5 max-md:px-2 m-2 border rounded max-md:flex-col">
        <div className="w-1/3 relative max-md:w-full max-md:p-10">
          <img className="px-10 max-md:px-5" src={item.img} alt="" />
        </div>
        <div className="content px-5 w-2/3 max-md:w-full">
          <div className="title text-bold text-[32px] pb-5 leading-[30px] max-md:leading-[20px] max-md:text-[20px]">
            {item.name}
          </div>

          <div className="prices font-extrabold max-md:text-[12px]">
            <span className="text-[gray]">Price: </span>£{item.price}
          </div>

          <div className="w-fit flex items-center p-2 text-[18px] max-md:text-[14px] my-3 text-start font-bold qty border">
            <span
              className="px-2 cursor-pointer"
              onClick={() => {
                if (user?.id && item.asin) {
                  dispatch(removeOneFromCart({ userId: user.id, productId: item.asin }));
                } else {
                  console.error("Missing userId or productId:", { userId: user?.id, productId: item.asin });
                }
              }}
            >
              -
            </span>
            <span className="px-4 max-md:py-0 max-md:px-1">{item.amount}</span>
            <span
              className=" px-2 cursor-pointer "
              onClick={() => {
                const product = {
                  asin: item.asin, 
                  price: item.price,
                  name: item.name,
                  amount: 1,
                  img: item.img,
                };

                if (product.asin && product.price && product.name) {
                  dispatch(addToCart({ userId: user.id, product }));
                } else {
                  console.error("Invalid product object:", product);
                }
              }}
            >
              +
            </span>
          </div>

          <div className="amount font-extrabold max-md:text-[12px]">
            <span className="text-[gray]">Total: </span>£
            {item.totalPrice.toFixed(2)}
          </div>

          <div className="btns pt-5 max-md:pt-2">
            <button
              className="bg-black text-white rounded px-4 py-2 font-bold mr-3 text-[18px] max-md:text-[12px] cursor-pointer"
              onClick={() => navigate(`/filteredProducts/${item.asin}`)}
            >
              Visit
            </button>
            <button
              className="bg-[red] text-[18px] max-md:text-[12px] text-white rounded px-4 py-2 font-bold cursor-pointer"
              onClick={() => {
                if (user?.id && item.asin) {
                  dispatch(removeItem({ userId: user.id, productId: item.asin }));
                } else {
                  console.error("Missing userId or productId:", { userId: user?.id, productId: item.asin });
                }
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
