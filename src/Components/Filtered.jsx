import React from 'react'
import { singleProduct } from "../features/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const Filtered = ({ data }) => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.filteredProducts);
    const error = useSelector((state) => state.products.error);
    return (
        <div>
            {data.map((d, index) => (
                <div className="filters" key={index}>
                    {d.title}
                    {d.price}
                    {d.brand}
                    <Link to={`/filteredProducts/${d.asin}`}>
                        <button onClick={() => dispatch(singleProduct(d.asin))}>Check it out</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Filtered
