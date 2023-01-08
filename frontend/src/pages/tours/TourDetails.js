import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import moment from "moment";
import { getTourById } from "../../actions/tourActions";

const TourDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch, id]);

  return (
    <MDBContainer>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
          src={tour.imageFile}
          alt={tour.title}
        />
        <MDBCardBody>
          <h3>{tour.title}</h3>
          <span>
            <p className="text-start tour-name">Created by: {tour.name}</p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {tour && tour.tags && tour.tags.map((tag) => "#" + tag + " ")}
            </span>
          </div>
          <br />
          <MDBCardText
            className="text-start mt-2"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MDBIcon
              style={{ margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            ></MDBIcon>
            <div>
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </div>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {tour.description}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default TourDetails;
