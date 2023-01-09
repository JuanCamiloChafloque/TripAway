import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import { logout } from "../actions/authActions";
import { getToursBySearch } from "../actions/tourActions";

const Header = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  if (token) {
    const decoded = decode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      dispatch(logout());
    }
  }

  const displayNotification = ({ senderName }) => {
    return (
      <span className="notification">{senderName + " liked your tour"}</span>
    );
  };

  const onLogoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNotifications = () => {
    if (notifications.length) {
      setOpen(!open);
    }
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(getToursBySearch(search));
      setSearch("");
      navigate("/search?searchQuery=" + search);
    } else {
      navigate("/");
    }
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <div
          style={{
            color: "#606080",
            fontWeight: "600",
            fontSize: "22px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          TripAway
        </div>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.user?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "23px" }}>
                Logged in as: {user?.user?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <p className="header-text" onClick={() => navigate("/")}>
                Home
              </p>
            </MDBNavbarItem>
            {user?.user?._id ? (
              <>
                <MDBNavbarItem>
                  <p
                    className="header-text"
                    onClick={() => navigate("/addTour")}
                  >
                    Add Tour
                  </p>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <p
                    className="header-text"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </p>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <p className="header-text" onClick={onLogoutHandler}>
                    Logout
                  </p>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <p className="header-text" onClick={() => navigate("/login")}>
                  Login
                </p>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form
            className="d-flex input-group w-auto"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Tour"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
          {user && (
            <div className="mx-3" onClick={handleNotifications}>
              <MDBIcon fas icon="bell" style={{ cursor: "pointer" }} />
              <MDBBadge color="danger" notification pill>
                {notifications.length > 0 && (
                  <div className="counter">{notifications.length}</div>
                )}
              </MDBBadge>
            </div>
          )}
          {open && (
            <div className="notifications">
              {notifications.map((not) => displayNotification(not))}
              <div className="align-item-center">
                <MDBBtn
                  size="sm"
                  style={{ width: "150px", backgroundColor: "#ec4a89" }}
                  onClick={handleRead}
                >
                  Mark as Read
                </MDBBtn>
              </div>
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
