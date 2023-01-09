import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ children, style }) => {
  const colorKey = {
    Sea: "primary",
    Beach: "success",
    Temple: "danger",
    City: "warning",
    Historic: "info",
  };
  return (
    <h5 className="mt-2">
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  );
};

export default Badge;
