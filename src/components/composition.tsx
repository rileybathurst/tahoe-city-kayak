import * as React from "react"
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";

import WaterTexture from "../images/watertexture";
import Kayaker from "../images/kayaker";
import Supper from "../images/supper";
import { useStrapiTextures } from "../hooks/use-strapi-textures"

const Paddler = ({ sport }: { sport?: string; }) => {
  if (sport === "sup") {
    return <Supper className="paddler" />
  }
  return <Kayaker className="paddler" />
}

const TopThree = () => {

  const { query } = useStrapiTextures()
  // console.log(query.baseone);

  return <GatsbyImage
    image={query.topthree.image.localFile.childImageSharp.gatsbyImageData}
    alt="deepwater texture"
    className='texture-slice crops t2 img__wrapped'
    // ? this seems a weird place to be
    objectFit="contain"
  />
}

type compositionTypes = {
  sport?: string;
  image?: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    alternativeText: string;
  };
}
const Composition = ({ sport, image }: compositionTypes) => {
  return (
    <div className="composition">
      <WaterTexture className="t1" />
      <TopThree />
      {image ?
        <GatsbyImage
          image={image.localFile.childImageSharp.gatsbyImageData}
          alt={image.alternativeText || "Composition Image"}
          className="img__wrapped paddler"
        />
        :
        <Paddler sport={sport} />
      }
    </div>
  )
}

export default Composition