// // import React, { useEffect, useState } from 'react'

// // const SliderRange = ({ setMini, mini, maxi, setMax }) => {
// //     window.onload = function () {
// //         slideOne();
// //         slideTwo();
// //     }
// //     // location.reload()

// //     let sliderOne = document.getElementById("slider-1");
// //     let sliderTwo = document.getElementById("slider-2");
// //     const min = document.querySelector('.min')
// //     const max = document.querySelector('.max')
// //     let minGap = 70;
// //     let sliderTrack = document.querySelector(".slider-track");
// //     let sliderMaxValue = 100;

// //     function slideOne() {
// //         if (parseInt(maxi) - parseInt(mini) <= minGap) {
// //             mini = parseInt(maxi) - minGap;
// //         }
// //         setMini(mini)
// //         min.style.left = (parseInt(mini) / (sliderMaxValue * 5)) * 100 + '%'
// //         // min.style.transform = `translateX(${mini*10}px)`
// //         // console.log(min, sliderOne);

// //         // displayValOne.textContent = mini;
// //         min.textContent = mini;
// //         fillColor();
// //     }
// //     function slideTwo() {
// //         if (parseInt(maxi) - parseInt(mini) <= minGap) {
// //             maxi = parseInt(mini) + minGap;
// //         }
// //         setMax(maxi)
// //         max.textContent = maxi;
// //         max.style.left = (parseInt(maxi) / (sliderMaxValue * 5)) * 100 + '%'
// //         // displayValTwo.textContent = maxi;
// //         fillColor();
// //     }

// //     function fillColor() {
// //         let percent1 = (parseInt(mi) / (sliderMaxValue * 5)) * 100;
// //         let percent2 = (parseInt(ma) / (sliderMaxValue * 5)) * 100;
// //         sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , black ${percent1}% , black ${percent2}%, #dadae5 ${percent2}%)`;
// //     }
// //     const [mi, setMi] = useState(-2)
// //     const [ma, setMa] = useState(500)
// //     const sli = () => {

// //         if (parseInt(ma) - parseInt(mi) <= minGap) {
// //             // mini = parseInt(maxi) - minGap;
// //             setMini(parseInt(ma) - minGap)
// //         }
// //         // setMini(mini)
// //         min.style.left = (parseInt(mi) / (sliderMaxValue * 5)) * 100 + '%'
// //         // min.style.transform = `translateX(${mini*10}px)`
// //         // console.log(min, sliderOne);

// //         // displayValOne.textContent = mini;
// //         min.textContent = mi;
// //         fillColor();
// //     }

// //     const slit = () => {

// //         // if (parseInt(ma) - parseInt(mi) <= minGap) {
// //         //     // maxi = parseInt(mini) + minGap;
// //         //     setMa(parseInt(mi) + minGap)
// //         // }
// //         // setMax(maxi)
// //         max.textContent = ma;
// //         max.style.left = (parseInt(ma) / (sliderMaxValue * 5)) * 100 + '%'
// //         // displayValTwo.textContent = maxi;
// //         fillColor();
// //     }


// //     return (
// //         <>
// //             <div className="wrapper2 border p-10 bg-[#fcfcfc] rounded-xl">
// //                 <span className="text-[24px] relative sidebar">
// //                     Price Range
// //                 </span>
// //                 <div className="w-[93%] mx-auto h-1 relative ">
// //                     <div className="min absolute w-10 h-7 flex items-center justify-center bg-black rounded-lg text-sm text-white"></div>
// //                     <div className="max absolute w-10 h-7 flex items-center justify-center bg-black rounded-lg text-sm text-white"></div>
// //                 </div>
// //                 <div className="contaner relative">
// //                     <div className="slider-track"></div>
// //                     <input type="range" min="2" max="502" value={mi} id="slider-1" onChange={(e) => {
// //                         console.log(mi);
// //                         setMi(e.target.value)
// //                         sli()

// //                     }} />
// //                     <input type="range" min="2" max="502" value={ma} id="slider-2" onChange={(e) => {
// //                         console.log(ma)
// //                         setMa(e.target.value)
// //                         slit()
// //                     }} />
// //                 </div>
// //             </div>

// //         </>
// //     )
// // }

// // export default SliderRange


// import React, { useEffect } from 'react'

// const SliderRange = ({ setMini, setMax }) => {
//     useEffect(() => {

//         let sliderOne = document.getElementById("slider-1");
//         let sliderTwo = document.getElementById("slider-2");
//         // sliderTwo.value = 500
//         const min = document.querySelector('.min')
//         const max = document.querySelector('.max')
//         let minGap = 70;
//         let sliderTrack = document.querySelector(".slider-track");
//         let sliderMaxValue = 100;

//         sliderOne.oninput = () => {
//             if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//                 sliderOne.value = parseInt(sliderTwo.value) - minGap;
//             }
//             setMini(sliderOne.value)
//             min.style.left = (parseInt(sliderOne.value) / (sliderMaxValue * 5)) * 100 + '%'
//             // min.style.transform = `translateX(${sliderOne.value*10}px)`
//             // console.log(min, sliderOne);

//             // displayValOne.textContent = sliderOne.value;
//             min.textContent = sliderOne.value;
//             fillColor();
//         }
//         sliderTwo.oninput = () => {
//             if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//                 sliderTwo.value = parseInt(sliderOne.value) + minGap;
//             }
//             setMax(sliderTwo.value)
//             max.textContent = sliderTwo.value;
//             max.style.left = (parseInt(sliderTwo.value) / (sliderMaxValue * 5)) * 100 + '%'
//             // displayValTwo.textContent = sliderTwo.value;
//             fillColor();
//         }
//         function fillColor() {
//             let percent1 = (parseInt(sliderOne.value) / (sliderMaxValue * 5)) * 100;
//             let percent2 = (parseInt(sliderTwo.value) / (sliderMaxValue * 5)) * 100;
//             sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , black ${percent1}% , black ${percent2}%, #dadae5 ${percent2}%)`;
//         }
//     })
//     // fillColor()


//     return (
//         <>
//             <div className="wrapper2 border p-10 bg-[#fcfcfc] rounded-xl">
//                 <span className="text-[24px] relative sidebar">
//                     Price Range
//                 </span>
//                 <div className="w-[93%] mx-auto h-1 relative ">
//                     <div className="min absolute w-10 h-7 flex items-center justify-center bg-black rounded-lg text-sm text-white"></div>
//                     <div className="max absolute w-10 h-7 flex items-center justify-center bg-black rounded-lg text-sm text-white"></div>
//                 </div>
//                 <div className="contaner relative">
//                     <div className="slider-track bg-black"></div>
//                     <input type="range" min="0" max="500" id="slider-1"  />
//                     <input type="range" min="0" max="500" id="slider-2"  />
//                 </div>
//             </div>

//         </>
//     )
// }

// export default SliderRange


import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const SliderRange = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    const mintext = document.querySelector('.min')
    const maxtext = document.querySelector('.max')
    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            // (parseInt(mini) / (sliderMaxValue * 5)) * 100 + '%'
            range.current.style.left = `${minPercent}%`;
            // mintext.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            // maxtext.style.left = `${maxPercent}%`
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {

        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="wrapper2 border px-5 max-md:px-5 pt-5 bg-[#fcfcfc] rounded-xl ">
            <span className="text-[24px] flex  relative sidebar ">
                Price Range: <span className="block text-[16px]">£{minVal} - £{maxVal}</span>
            </span>

            <div className="contaner relative  flex justify-center items-start ">

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={(event) => {
                        const value = Math.min(Number(event.target.value), maxVal - 80);
                        setMinVal(value);
                        minValRef.current = value;
                    }}
                    className="thumb thumb--left"
                    style={{ zIndex: minVal > max - 100 && "5" }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={(event) => {
                        const value = Math.max(Number(event.target.value), minVal + 80);
                        setMaxVal(value);
                        maxValRef.current = value;
                    }}
                    className="thumb thumb--right"
                />

                <div className="slider">
                    <div className="slider__track" />
                    <div ref={range} className="slider__range" />
                    {/* <div className="slider__left-value"></div>
                    <div className="slider__right-value"></div> */}
                </div>
            </div>
        </div>

    );
};

SliderRange.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SliderRange;
