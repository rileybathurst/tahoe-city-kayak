import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

const Logo = () => {
  return <StaticImage
    // the best version I could find. its small at best
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/TCK-admin-logo.png"
    alt="tahoe city kayak and paddleboard logo"
    breakpoints={[294]}
    width={294}
  />
};

export default Logo;