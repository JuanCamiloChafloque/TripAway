import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { deleteTourById, getTourByUser } from "../actions/tourActions";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tours);

  useEffect(() => {
    if (user) {
      dispatch(getTourByUser(user.user._id));
    }
  }, [dispatch, user]);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTourById(id, toast));
    }
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
      <h4 className="text-center">Dashboard: {user.user.name}</h4>
      <hr style={{ maxWidth: "570px" }} />
      {userTours &&
        userTours.map((tour, idx) => (
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
                      <small className="text-muted">
                        {excerpt(tour.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn
                        className="mt-1"
                        tag="a"
                        color="none"
                        onClick={() => handleOnDelete(tour._id)}
                      >
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                        />
                      </MDBBtn>
                      <Link to={"/editTour/" + tour._id}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
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

export default Dashboard;
