import { Link } from "gatsby";
import * as React from "react";
// import { Link } from "gatsby";

const TourView = ({ tour }) => {
  return (
    <>
      <Link to="/">Home</Link>
      <hr />
      {tour.name}
    </>
  );
};

export default TourView;
