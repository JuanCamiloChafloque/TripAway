import React from "react";
import { useSelector } from "react-redux";
import Unauthorized from "./Unauthorized";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return user.user ? children : <Unauthorized />;
};

export default PrivateRoute;
