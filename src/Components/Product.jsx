import { singleProduct } from "../features/productSlice";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Product = ({ data }) => {
  const dispatch = useDispatch();

  const defdata = data;

  return (
    <Link
      to={`/filteredProducts/${defdata.asin}`}
      className="col-span-1 border rounded-lg p-2"
    >
      <div className="product-item w-[100%] mx-auto">
        <div className="inner-content relative">
          <div
            className="product-thum relative h-[150px] overflow-hidden"
            onClick={() => {
              dispatch(singleProduct(defdata.asin));
            }}
          >
            <Link to={`/filteredProducts/${defdata.asin}`}>
              <img src={defdata.images_list[0]} className="w p-5 lg:p-12" />
            </Link>
          </div>

          <div className="product-info  flex flex-col text-nowrap">
            <span className="font-bold text-[18px] overflow-x-clip text-ellipsis">
              {defdata.title}
            </span>
            <span className="font-bold text-[10px] text-[#8a8a8a] overflow-clip">
              {defdata.brand}
            </span>
            <div className="prices"></div>
          </div>
          <div className="view border rounded-full text-center text-[12px]">
            View Product
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
