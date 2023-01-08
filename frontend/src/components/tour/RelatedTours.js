import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

const RelatedTours = ({ tours, id }) => {
  const excerpt = (str) => {
    if (str.length > 70) {
      str = str.substring(0, 70) + "...";
    }
    return str;
  };

  return (
    <>
      {tours && tours.length > 0 && (
        <>
          {tours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {tours
              .filter((tour) => tour._id !== id)
              .splice(0, 3)
              .map((tour, idx) => (
                <MDBCol key={idx}>
                  <MDBCard>
                    <Link to={"/tour/" + tour._id}>
                      <MDBCardImage
                        src={tour.imageFile}
                        alt={tour.title}
                        position="top"
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {tour.tags.map((tag, idx) => (
                        <Link to={"/tours/tags/" + tag} key={idx}>
                          {" "}
                          #{tag}
                        </Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {tour.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(tour.description)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;
