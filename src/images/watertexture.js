import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

const WaterTexture = (props) => {
  return <StaticImage
    // src="../images/jason-leung-Oc81QL8Crtg-unsplash-hd.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.webp"
    alt="two kayakers paddling across lake Tahoe"
    className={`img__wrapped ${props.className}`}
    breakpoints={[300, 600, 900]}
    width={650}
  />
};

export default WaterTexture;