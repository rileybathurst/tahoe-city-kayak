import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

const AndyPaddling = (props) => {
  return <StaticImage
    // src="../images/andy-paddling.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/andy-paddling.webp"
    alt="andy paddling in the sunshine"
    className={`img__wrapped ${props.className}`}
    breakpoints={[300, 600, 900]}
    width={650}
  />
};

export default AndyPaddling;