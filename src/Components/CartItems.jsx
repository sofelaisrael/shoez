import React from "react";
import { useDispatch } from "react-redux";
import {
  addToFirestoreCart,
  removeFromFirestoreCart,
  removeOneFromFirestoreCart,
} from "../features/cartSlice";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  const elem = item;
  const dispatch = useDispatch();

  return (
    <div>
      <div className="item flex p-5 max-md:px-2 m-2 border rounded max-md:flex-col">
        <div className="w-1/3 relative max-md:w-full max-md:p-10">
          <img className="px-10 max-md:px-5" src={elem.img} alt="" />
        </div>
        <div className="content px-5 w-2/3 max-md:w-full">
          <div className="title text-bold text-[32px] pb-5">{elem.name}</div>

          <div className="prices font-extrabold">
            <span className="text-[gray]">Price: </span>£{elem.price}
          </div>

          <div className="w-fit flex items-center p-2 text-[18px] max-md:text-[14px] my-3 text-start font-bold qty border">
            <span
              className=" px-2 cursor-pointer"
              onClick={() => dispatch(removeOneFromFirestoreCart(item.asin))}
            >
              -
            </span>
            <span className="h- -t -b px-4 max-md:p-">{item.amount}</span>
            <span
              className=" px-2 cursor-pointer "
              onClick={() =>
                dispatch(
                  addToFirestoreCart({
                    price: item.price,
                    text: item.text,
                    name: item.name,
                    amount: 1,
                    asin: item.asin,
                  })
                )
              }
            >
              +
            </span>
          </div>

          <div className="amount font-extrabold">
            <span className="text-[gray]">Total: </span>£
            {item.totalPrice.toFixed(2)}
          </div>

          <div className="btns pt-5">
            <Link
              className="flex-grow w-[500px] max-md:w-[200px] max-md:text-[12px]  max-lg:w-[300px]"
              to={`/filteredProducts/${item.asin}`}
            >
              <button className="bg-black text-white rounded px-4 py-2 font-bold mr-3 text-[18px]">
                Visit
              </button>
            </Link>
            <button
              className="bg-[red] text-[18px] text-white rounded px-4 py-2 font-bold"
              onClick={() => dispatch(removeFromFirestoreCart(item.id))}
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
