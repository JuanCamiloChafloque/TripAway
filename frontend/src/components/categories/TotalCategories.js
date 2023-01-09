import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCardTitle,
  MDBListGroup,
  MDBBadge,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const TotalCategories = ({ categories }) => {
  return (
    <>
      <MDBCardTitle className="title text-start">Categories</MDBCardTitle>
      <MDBListGroup style={{ width: "22rem" }}>
        {categories &&
          categories.map((item, idx) => (
            <Link to={"/tours/categories/" + item.category} key={idx}>
              <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                {item.category}
                <MDBBadge pill>{item.count}</MDBBadge>
              </MDBListGroupItem>
            </Link>
          ))}
      </MDBListGroup>
    </>
  );
};

export default TotalCategories;
