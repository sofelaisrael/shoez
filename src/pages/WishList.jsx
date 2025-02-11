import { IoTrashOutline } from "react-icons/io5";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearList, removeitem } from "../features/wishListSlice";
import { Link } from "react-router-dom";

const WishList = () => {
  const list = useSelector((state) => state.wishlist.list);
  const dispatch = useDispatch();
  console.log(list);

  return (
    <div className="min-h-[100vh] pt-20">
      <div className="flex w-[80%] max-lg:w-[90%] items-center mx-auto h-[70px] max-md:h-[50px] max-md:gap10 bg-[#f7f7f7] justify-end  gap20 max-md:text-[14px] max-md:w-[90%]">
        <div className="px-10 font-bold prod flex-grow max-md:px-5 ">
          Product
        </div>
        <div className="w-[120px] max-lg:w-[100px]  max-md:w-[70px] max-md: text-center font-bold pri">
          Price
        </div>
      </div>
      {list.length > 0 ? (
        <div className="mx-auto w-[80%]  max-lg:w-[90%] relative">
          {list.map((item, index) => {
            return (
              <>
                <div className="flex items-center mx-auto h-[70px]  justify-between  gap20 my-10  max-md:text-[14px] relative max-md:h-[50px] max-md:gap10">
                  <Link
                    className="flex-grow w-[500px] max-md:w-[200px] max-md:text-[12px]  max-lg:w-[300px]"
                    to={`/filteredProducts/${item.asin}`}
                  >
                    <div className="lg:px-10 font-bold flex items- prod lg:flex-grow gap-10 items-center max-lg:gap-3">
                      <div className="img h-[70px] flex  w-[100px] max-lg:w-[100px]   p2 ma-md:hidden">
                        <img
                          className="w-full object-contain"
                          src={item.img}
                          alt=""
                        />
                      </div>
                      {item.name}
                    </div>
                  </Link>
                  <div className="w-[120px] max-lg:w-[100px] max-md:w-[70px] max-md:text-[12px] text-center font-bold flex flex-col gap-3">
                    £{item.price}
                    <div className="p-2 bg-[red] text-white rounded">
                      Remove
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto w-[80%]  max-lg:w-[90%] relative text-center text-[32px] font-bold h-[70vh] flex items-center justify-center">
          No items avaiable in your wish list
        </div>
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
          <div
            className="clear p-5 max-lg:p-0  max-lg:flex justify-center items-center cursor-pointer hover:text-white max-lg:h-[50px] font-bold bg-transparen rounded-md hover:bg-[#232324] text-center transition-all duration-300 border max-lg:text-[14px] max-lg:w-full"
            onClick={() => dispatch(clearList())}
          >
            Clear List
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
