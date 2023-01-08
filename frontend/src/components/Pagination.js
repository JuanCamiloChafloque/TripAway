import React from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";
import { SET_CURRENT_PAGE } from "../actions/types";

const Pagination = ({ currentPage, numberPages, dispatch }) => {
  const renderPagination = () => {
    if (currentPage === numberPages && currentPage === 1) {
      return null;
    }
    if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <p className="fw-bold mt-1">1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() =>
                dispatch({ type: SET_CURRENT_PAGE, payload: currentPage + 1 })
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberPages) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() =>
                dispatch({ type: SET_CURRENT_PAGE, payload: currentPage - 1 })
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() =>
                dispatch({ type: SET_CURRENT_PAGE, payload: currentPage + 1 })
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() =>
                dispatch({ type: SET_CURRENT_PAGE, payload: currentPage - 1 })
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className="mt-5 mb-3">{renderPagination()}</div>;
};

export default Pagination;
