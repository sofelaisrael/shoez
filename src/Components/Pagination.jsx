import { CgChevronRight } from "react-icons/cg";
import { CgChevronLeft } from "react-icons/cg";
import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <ul className="pagination w-full">
            <li onClick={handlePrevClick} style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: currentPage === 1 ? 'none' : 'flex'  }}>
                <CgChevronLeft />
            </li>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <li
                    key={startPage + index}
                    onClick={() => onPageChange(startPage + index)}
                    className={currentPage === startPage + index ? 'active' : ''}
                >
                    {startPage + index}
                </li>
            ))}
            <li onClick={handleNextClick} style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', display: currentPage === totalPages ? 'none' : 'flex' }}>
                <CgChevronRight />
            </li>
        </ul>
    );
};

export default Pagination;
