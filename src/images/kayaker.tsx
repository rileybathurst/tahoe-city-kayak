import * as React from "react";
import { StaticImage } from "gatsby-plugin-image"

const Kayaker = () => {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.jpg"
    alt="tahoe city kayak kayaker"
    className="paddler img__wrapped"
    objectFit="contain"
  />
};

export default Kayaker;