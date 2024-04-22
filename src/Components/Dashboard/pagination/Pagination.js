import { useState } from "react";
import ReactPaginate from "react-paginate";
import './pagination.css'


export default function PaginatedItems({ itemsPerPage,setpage,total }) {
  const pageCount=total /itemsPerPage;



  return (
    <>
    
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setpage(e.selected +1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-center"
        pageLinkClassName="pagination-tag-anchor mx-2  rounded-circle"
        activeLinkClassName='bg-primary text-white'
      />
    </>
  );
}