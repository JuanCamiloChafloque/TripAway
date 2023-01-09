import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import moment from "moment";
import { getRelatedTours, getTourById } from "../../actions/tourActions";
import RelatedTours from "../../components/tour/RelatedTours";
import DisqusThread from "../../components/DisqusThread";

const TourDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tour, relatedTours } = useSelector((state) => state.tours);

  useEffect(() => {
    if (tour) {
      dispatch(getRelatedTours(tour.tags));
    }
  }, [dispatch, tour]);

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
          <MDBBtn
            tag="a"
            color="none"
            style={{ float: "left", color: "#000" }}
            onClick={() => navigate("/")}
          >
            <MDBIcon fas icon="long-arrow-alt-left" size="lg" />
          </MDBBtn>
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
        <RelatedTours tours={relatedTours} id={id} />
      </MDBCard>
      <DisqusThread id={id} title={tour.title} path={"/tour/" + id} />
    </MDBContainer>
  );
};

export default TourDetails;
