import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import Spinner from "../components/Spinner";

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const { totalTours, loading } = useSelector((state) => state.tours);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Category: {category}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {totalTours &&
        totalTours
          .filter((tour) => tour.category === category)
          .map((tour, idx) => (
            <MDBCardGroup key={idx}>
              <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                <MDBRow className="g-0">
                  <MDBCol md="4">
                    <MDBCardImage
                      className="rounded"
                      src={tour.imageFile}
                      alt={tour.title}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {tour.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(tour.description)}
                      </MDBCardText>
                      <div style={{ float: "left", marginTop: "-10px" }}>
                        <MDBBtn
                          size="sm"
                          rounded
                          color="info"
                          onClick={() => navigate("/tour/" + tour._id)}
                        >
                          Read More
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          ))}
    </div>
  );
};

export default Category;
