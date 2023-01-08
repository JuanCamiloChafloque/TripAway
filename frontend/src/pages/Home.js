import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { getTours } from "../actions/tourActions";
import TourCard from "../components/tour/TourCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();

  const { tours, loading } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 ? (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        ) : (
          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {tours &&
                  tours.map((tour, idx) => <TourCard key={idx} tour={tour} />)}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
