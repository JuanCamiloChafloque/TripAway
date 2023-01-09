import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { getTours, getAllTags } from "../actions/tourActions";
import TourCard from "../components/tour/TourCard";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import PopularTags from "../components/tags/PopularTags";

const Home = ({ socket }) => {
  const dispatch = useDispatch();

  const { tours, loading, currentPage, numberPages, totalTags } = useSelector(
    (state) => state.tours
  );

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1400px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours && tours.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        ) : (
          <>
            <MDBCol>
              <MDBContainer>
                <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                  {tours &&
                    tours.map((tour, idx) => (
                      <TourCard key={idx} tour={tour} socket={socket} />
                    ))}
                </MDBRow>
              </MDBContainer>
            </MDBCol>
            <MDBCol size="3" className="mt-4">
              <PopularTags totalTags={totalTags} />
            </MDBCol>
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                numberPages={numberPages}
                dispatch={dispatch}
              />
            </div>
          </>
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
