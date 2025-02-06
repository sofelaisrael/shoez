import { TbZoomReset } from "react-icons/tb";
import { TfiFilter } from "react-icons/tfi";
import React, { useEffect, useState } from 'react'
import { filterAll } from "../features/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import Filtered from '../Components/Filtered';
import FilterInput from '../Components/FilterInput';
import SliderRange from '../Components/SliderRange';
import FilteredItems from "../Components/FilteredItems";
import allData from '../data/amazon_uk_shoes_dataset.json'
import Pagination from "../Components/Pagination";
import Navbar from "../Components/Navbar";
import hero from '../assets/Nike.png'


const FilteredProducts = () => {
    const dispatch = useDispatch()
    const [mini, setMini] = useState(0)
    const [max, setMax] = useState(500)
    const [filt, setFilt] = useState('')
    const [cate, setCate] = useState('(Any)')
    const [brds, setBrds] = useState('(Any)')
    const products = useSelector((state) => state.products.filteredProducts);
    const result = useSelector((state) => state.products.results);
    const [brands, setBrands] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {
        const allbrands = allData.map(prod => {
            const visit = prod.brand.split('Visit the ')
            const store = visit.toString().split('Store')

            if (visit.length > 1) {
                let com = visit[1].split(' Store').toString();
                com = com.slice(0, com.length - 1)
                return com
            } else {
                return store.toString()
            }
        })
        const unique = [...new Set(allbrands)]
        setBrands(unique.sort())

    }, [])
    useEffect(() => {
        let onearr = []
        allData.map(prod => {
            // prod.breadcrumbs.split('Shoes/').slice(1)

            prod.breadcrumbs.split('Shoes/').slice(1).map(sh => {
                if (sh.includes('/')) {
                    const sp = sh.split('/')
                    sp.map(a => onearr.push(a))
                } else {
                    onearr.push(sh)
                }

            })
        })
        const unique = [...new Set(onearr)]
        setBreadcrumbs(unique.sort())

    }, [])
    const data = products
    const itemsPerPage = 16;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        let bg = document.querySelector('.circ')
        let val = window.scrollY
        bg.style.top = ((val * .7)) + 100 + 'px'

        window.addEventListener('scroll', function () {
            let val = this.window.scrollY
            bg.style.top = ((val * .7)) + 100 + 'px'
        })
    })
    useEffect(() => {
        let bg = document.querySelector('.prodimg')
        let val = window.scrollY
        bg.style.top = ((val * .5) * -1) - 40 + 'px'

        window.addEventListener('scroll', function () {
            let val = this.window.scrollY
            bg.style.top = ((val * .5) * -1) - 40 + 'px'
        })
    })


    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>

            <div className="hero pt-20 bg-[#26292e] relative h-[500px] max-md:h-[300px] overflow-hidden">
                <img className="absolute -top-0 max-md:w-full -bottom-20 w-[60%] left-1/2 -translate-x-1/2 -rotate-[10deg] prodimg" src={hero} alt="" />
                <div className="titletext  absolute top-[65%] left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-[100px] w-full text-center font-extrabold max-lg:text-[60px] max-md:text-[32px] mix-blend-difference">
                    Products Page
                </div>
                <div className="absolute w-[150px] circ rounded-full bg-blue-400 mix-blend-difference h-[150px] top-[25%] left-[65%]"></div>
            </div>
            <div className="grid grid-cols-7 max-lg:flex  max-lg:flex-col-reverse pb-10 ">
                <div className="filters px-10 col-span-2 max-lg:h-full flex flex-col justify- py-10 gap-2 items-center ">
                    {/* <h4 class="sidebar">Top Categories</h4> */}
                    <FilterInput data={breadcrumbs} setArr={setCate} name='Category' content='content1' select='select1' />
                    <FilterInput data={brands} setArr={setBrds} content='content2' select='select2' name='Brand' />
                    <SliderRange min={0} max={500} onChange={({ min, max }) => {
                        setMini(min)
                        setMax(max)
                    }} />
                    <div className="btns flex gap-5 max-lg:gap-2 my-5 w-full max-md:flex-col ">
                        <button className="flex max-md:w-full gap-2 border bg-black rounded-md text-white items-center justify-center p-3 w-32" onClick={() => {
                            setCurrentPage(1)
                            console.log(mini, max, cate, brds);

                            dispatch(filterAll({ brand: brds, breadcrumb: cate, min: mini, max: max }));
                        }}>Filter<TfiFilter /></button>
                        <button onClick={() => {
                            setCurrentPage(1)
                            dispatch(filterAll({ brand: 'Any', breadcrumb: 'Any', min: 0, max: 500 }));
                        }} className="flex max-md:w-full gap-2 border bg-black rounded-md text-white items-center justify-center p-3 w-32">Reset<TbZoomReset /></button>
                    </div>
                </div>

                {
                    currentItems.length > 0 ? (
                        <div id="data-container" className="grid grid-cols-4  gap-10 p-10 col-span-5 max-lg:col-span-full relative max-lg:grid-cols-3 max-md:grid-cols-2">
                            {currentItems.map((item, index) => (
                                <FilteredItems data={item} />
                            ))}
                            <div className="col-span-4 max-lg:col-span-3 max-md:col-span-2 absolue flex justify-center items-center ">

                                <Pagination
                                    totalItems={data.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="none border w-full col-span-5 flex justify-center items-center font-bold text-[32px] flex-col gap-3">
                            No items available match your search
                            <button onClick={() => {
                                setCurrentPage(1)
                                dispatch(filterAll({ brand: 'Any', breadcrumb: 'Any', min: 0, max: 500 }));
                            }} className="flex font-normal max-md:w-full gap-2 w-[150px] border bg-black rounded-md text-white items-center justify-center h-[50px] ">Reset</button>
                        </div>
                    )
                }



                {/* <div id="data-container"></div>
                <ul className="pagination" id="pagination"></ul>

                <div className="grid grid-cols-3 place-content-evenly gap-10 p-10 col-span-5">
                    <FilteredItems />
                    <FilteredItems />
                    <FilteredItems />
                    <FilteredItems />
                    <FilteredItems />
                    <FilteredItems />

                </div> */}
            </div>


        </div>
    )
}

export default FilteredProducts
