import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { login, googleSignIn } from "../../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      const loginData = {
        email,
        password,
      };
      dispatch(login(loginData, navigate, toast));
    }
  };

  const googleSuccess = (response) => {
    const email = response?.profileObj.email;
    const name = response?.profileObj.name;
    const googleId = response?.googleId;
    const token = response?.tokenId;

    const result = {
      email,
      name,
      token,
      googleId,
    };

    dispatch(googleSignIn(result, navigate, toast));
  };

  const googleFailure = (error) => {
    toast.error(error);
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation
            onSubmit={onSubmitHandler}
            noValidate
            className="row g-3"
          >
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="639311573445-bchjoaugil8q8uivcu0ea178e2icchf6.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
