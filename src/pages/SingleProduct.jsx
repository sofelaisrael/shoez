import { AiFillStar } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { addToWishlist } from "../features/wishListSlice";
import data from "../data/amazon_uk_shoes_dataset.json";
import Product from "../Components/Product";
import hero from "../assets/Puma.png";
import { useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useUser();
  const [num, setNum] = useState(1);
  const product = useSelector((state) => state.products.singleProduct);
  console.log(user);

  const getLastPrice = (price) => {
    const last = price.lastIndexOf("£");
    return price.slice(last + 1);
  };

  function findSimilarProducts(referenceProduct) {
    const referenceValues = referenceProduct.features.map(
      (feature) => Object.values(feature)[0]
    );

    return data.filter((prod) => {
      const productValues = prod.features.map(
        (feature) => Object.values(feature)[0]
      );
      const commonValues = referenceValues.filter((value) =>
        productValues.includes(value)
      );
      return commonValues.length == 2;
    });
  }

  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => {
    color.onclick = () => {
      colors.forEach((it) => it.classList.remove("colorselect"));
      color.classList.add("colorselect");
    };
  });

  const sizes = document.querySelectorAll(".size");
  sizes.forEach((size) => {
    size.onclick = () => {
      sizes.forEach((it) => it.classList.remove("sizeselect"));
      size.classList.add("sizeselect");
    };
  });

  const decrease = () => {
    if (!(num <= 1)) {
      setNum(parseInt(num) - 1);
    }
  };
  const increase = () => {
    setNum(parseInt(num) + 1);
  };

  const checkselect = (ind) => {
    const items = document.querySelectorAll(".items");
    const img = document.querySelector(".selimg");
    img.src = items[ind].querySelector("img").src;
    items.forEach((item) => item.classList.remove("selected"));
    items[ind].classList.add("selected");
  };

  const referenceProduct = product[0];

  const similarProducts = findSimilarProducts(referenceProduct);

  useEffect(() => {
    let bg = document.querySelector(".prodimg");
    let val = window.scrollY;
    bg.style.top = val * 0.5 * -1 - 40 + "px";

    window.addEventListener("scroll", function () {
      let val = this.window.scrollY;
      bg.style.top = val * 0.5 * -1 - 40 + "px";
    });
  });

  useEffect(() => {
    let bg = document.querySelector(".circ");
    let val = window.scrollY;
    bg.style.top = val * 0.7 + 100 + "px";

    window.addEventListener("scroll", function () {
      let val = this.window.scrollY;
      bg.style.top = val * 0.7 + 100 + "px";
    });
  });

  const handleAddToWishlist = (product) => {
    if (user?.id) {
      dispatch(addToWishlist({ userId: user.id, product }));
    }
  };
  return (
    <div>
      <div className="hero pt-20 bg-[#26292e] relative h-[500px] max-md:h-[300px] overflow-hidden">
        <img
          className="absolute -top-0 max-md:w-full -bottom-20 w-[60%] left-1/2 -translate-x-1/2 -rotate-[10deg] prodimg"
          src={hero}
          alt=""
        />
        <div className="titletext absolute top-[65%] left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-[100px] w-full text-center font-extrabold max-lg:text-[60px] max-md:text-[32px] mix-blend-difference">
          Product Details
        </div>
        <div className="absolute w-[150px] circ rounded-full bg-blue-400 mix-blend-difference h-[150px] top-[25%] left-[35%]"></div>
      </div>
      {data
        .filter((prod) => prod.asin == id)
        .map((item, index) => {
          console.log(item.product_details.split("\n\n"));

          return (
            <div className="flex w-full">
              <div className="flex max-lg:flex-col w-full p-10 max-md:p-5 lg:gap-20 ">
                <div className="imageside lg:w-1/2 max-lg:w-2/3 max-md:w-full lg:sticky h-[500px] lg:h-fit top-10">
                  <div className="img lg:h-[400px] h-[350px] lg:px0 w-full flex justify-center self-start border-[3px] rounded-lg">
                    <img
                      className="selimg object-contain p-20"
                      src={item.images_list[0]}
                      alt=""
                    />
                  </div>
                  <div className="aside flex gap-5 py-7 pl-2 overflow-y-hidden overflow-x-scroll">
                    {item.images_list.map((img, index) => (
                      <div
                        className="min-w-[150px] max-xl:min-w-[100px] max-xl:h-[50px] h-[100px] border flex rounded-md  justify-center items-center items "
                        onMouseEnter={() => checkselect(index)}
                      >
                        <img
                          src={img}
                          className=" h-full object-contain p-2"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="details flex flex-col">
                  <div className="title text-[24px] max-lg:text-[20px] text-[#666666]">
                    {item.title}
                  </div>

                  <div className="price text-[#666] text-[32px] max-lg:text-[24px] lg:my-3">
                    <span className="text-black font-semibold">
                      £{getLastPrice(item.price)}
                    </span>
                  </div>

                  <div className="rate flex gap-5 max-lg:gap-1 max-lg:pb-3 pb-8">
                    <div className="ratings text-[#FFDE00] text-[24px] max-lg:text-[20px] max-lg:gap-1 flex gap-2">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </div>

                    <div className="text-[#ccc] text-[16px] max-lg:text-[14px]">
                      (5 Customer Reviews)
                    </div>
                  </div>

                  <hr />

                  <div className="dummytext py-10 max-lg:py-4 font-bold text-[18px] max-lg:text-[15px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    quidem soluta nobis esse magni reiciendis provident iure,
                    voluptate quo quod odio omnis sunt. Atque, pariatur dicta
                    quis aliquam asperiores eum.
                  </div>

                  <div className="features my-10 flex flex-col gap-3 max-lg:my-5">
                    <span className="text-2xl max-lg:text-[20px] font-extrabold text-[#000] ">
                      Product Features
                    </span>
                    <div className="feat text-[#555]">
                      {item.features.map((feature, index) => {
                        return (
                          <div
                            className={`feat ${
                              Object.values(feature).toString().length > 20
                                ? "hidden"
                                : ""
                            } flex gap-5 text-lg max-lg:text-[16px]`}
                          >
                            <div className="obj w-[150px] font-bold">
                              {Object.keys(feature)}
                            </div>
                            <div className="value">
                              {Object.values(feature).slice(0, 20)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="brand font-extrabold text-[#008296] text-[20px] cursor-pointer max-lg:text-[17px]">
                    {item.brand.toUpperCase()}
                  </div>

                  <Authenticated>
                    <div className="flex mt-10 gap-5 max-lg:mt-5">
                      <div className="amount">
                        <div className="w-[80px] h-[50px] border rounded-none">
                          <input
                            className="border text-xl w-full h-[30px] text-center focus:outline-none "
                            type="text"
                            value={num}
                            onChange={(e) => setNum(e.target.value)}
                          />
                          <div className="btns flex h-[20px]">
                            <div
                              className="minus w-full hover:bg-[#EB3E32] hover:text-white transition-all duration-200 font-extrabold hover:border-[#EB3E32]  cursor-pointer flex justify-center items-center text-center text-xl border h-full selection:w-20"
                              onClick={decrease}
                            >
                              -
                            </div>
                            <div
                              className="plus w-full hover:bg-[#EB3E32] hover:text-white transition-all duration-200 font-extrabold hover:border-[#EB3E32]  cursor-pointer flex justify-center items-center text-center text-xl border h-full selection:w-20"
                              onClick={increase}
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-[#EB3E32] border-[#EB3E32] hover:bg-white border transition-all duration-200 hover:text-[#EB3E32] text-white w-fit px-10 py-1  text-md font-bold"
                        onClick={() => {
                          if (!isNaN(num) && num >= 0) {
                            const product = {
                              asin: id,
                              price: getLastPrice(item.price),
                              name: item.title,
                              amount: parseFloat(num),
                              img: item.images_list[0],
                            };
                            if (product.asin && product.price && product.name) {
                              dispatch(addToCart({ userId: user.id, product }));
                            } else {
                              console.error("Invalid product object:", product);
                            }
                          } else {
                            return;
                          }
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                    <div className="wishlist my-5">
                      <button
                        className=" border-[#EB3E32] hover:border-white transition-all duration-200 hover:bg-[#26292e] hover:text-white border px-5 py-3 text-[#EB3E32] font-bold click"
                        onClick={() =>
                          handleAddToWishlist({
                            price: parseFloat(getLastPrice(item.price)),
                            name: item.title,
                            asin: id,
                            img: item.images_list[0],
                          })
                        }
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </Authenticated>
                </div>
              </div>
            </div>
          );
        })}

      <hr className="my-10 max-lg:my-5" />
      {similarProducts.length > 0 && (
        <div className="similars p-10 flex flex-col gap-5 max-lg:p-5">
          <span className="text-[50px] max-lg:text-[30px] text-center font-bold">
            Related Products
          </span>
          <div className="related grid grid-cols-5 gap-5 max-md:grid-cols-2  max-lg:grid-cols-3 max-xl:grid-cols-4">
            {similarProducts.slice(0, 10).map((sim) => (
              <Product data={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
