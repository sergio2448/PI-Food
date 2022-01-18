import React from "react";
import './Pagination.css';

const Pagination = ({ recipesAll, recipesPerPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipesAll / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button className='pagedButton' key={number} onClick={() => pagination(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
