import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";

const TourCard = ({ tour }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={tour.imageFile}
          alt={tour.title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{tour && tour.name}</div>
        <span className="text-start tag-card">
          {tour &&
            tour.tags &&
            tour.tags.map((tag, idx) => (
              <Link key={idx} to={"/tours/tags/" + tag}>
                {" "}
                #{tag}
              </Link>
            ))}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">
            {tour && tour.title}
          </MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(tour && tour.description)}
            <Link to={"/tour/" + tour._id}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourCard;
