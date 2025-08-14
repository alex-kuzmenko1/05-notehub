import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: { selected: number }) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ 
  pageCount, 
  currentPage, 
  onPageChange 
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={onPageChange} 
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      previousLabel="‹"
      nextLabel="›"
      breakLabel="..."
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
    />
  );
};

export default Pagination;