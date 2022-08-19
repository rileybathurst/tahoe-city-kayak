import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

const TwoKayakers = (props) => {
  return <StaticImage
    // src="../images/tck-slide-2.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tck-slide-2.jpg"
    alt="two kayakers paddling across lake Tahoe"
    className={`img__wrapped ${props.className}`}
    breakpoints={[325, 650, 1300]}
    width={650}
  />
};

export default TwoKayakers;