import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { likeTourById } from "../../actions/tourActions";

const TourCard = ({ tour, socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const handleLikeButton = () => {
    if (tour) {
      const userId = user.user._id || user.user.googleId;
      dispatch(likeTourById(tour._id));
      const alreadyLiked = tour.likes.find((like) => like === userId);
      if (!alreadyLiked && userId !== tour.creator) {
        socket.emit("sendNotification", {
          senderName: user.user.name,
          receiverName: tour.name,
        });
      }
    }
  };

  const Likes = () => {
    if (user && user.user && tour && tour.likes.length > 0) {
      const userId = user.user._id || user.user.googleId;
      return tour.likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {tour.likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={"You and " + (tour.likes.length - 1) + " others likes"}
            >
              {tour.likes.length} Likes
            </MDBTooltip>
          ) : (
            <>
              {tour.likes.length} Like{tour.likes.length > 1 ? "s" : ""}
            </>
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{tour.likes.length} {tour.likes.length > 1 ? "Likes" : "Like"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
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
        <span className="text-start tag-card me-3">
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={handleLikeButton}
          >
            <Likes />
          </MDBBtn>
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
