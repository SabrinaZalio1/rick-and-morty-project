import React from 'react';

interface IPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

function Paginator({ currentPage, totalPages, onPrevPage, onNextPage }: IPaginatorProps) {

  return (
    <div className='d-flex justify-content-center gap-3 my-4'>
      <button className='rounded py-1 px-3 border border-light' onClick={onPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button className='rounded py-1 px-3 border border-light' onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Paginator;