import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import { useStrapiTextures } from "../hooks/use-strapi-textures"
// const { query } = useStrapiTextures()
// console.log(query)

function BaseOne() {

  const { query } = useStrapiTextures()
  // console.log(query.baseone);

  return <GatsbyImage
    image={query.baseone.image.localFile.childImageSharp.gatsbyImageData}
    alt="deepwater texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function BaseTwo() {
  const { query } = useStrapiTextures()
  return <GatsbyImage
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/marissa-rodriguez-2mKYEVGA4jE-unsplash.jpg"
    image={query.basetwo.image.localFile.childImageSharp.gatsbyImageData}
    alt="clear texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function BaseThree() {
  const { query } = useStrapiTextures()

  return <GatsbyImage
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/samara-doole-peaTniZsUQs-unsplash.jpg"
    image={query.basethree.image.localFile.childImageSharp.gatsbyImageData}
    alt="splash texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopOne() {
  const { query } = useStrapiTextures()

  return <GatsbyImage
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/dewang-gupta-ESEnXckWlLY-unsplash.jpg"
    image={query.topone.image.localFile.childImageSharp.gatsbyImageData}
    alt="sunset texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopTwo() {
  const { query } = useStrapiTextures()

  return <GatsbyImage
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leem-50bzI1F6urA-unsplash.jpg"
    image={query.toptwo.image.localFile.childImageSharp.gatsbyImageData}
    alt="forrest texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopThree() {
  const { query } = useStrapiTextures()

  return <GatsbyImage
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jim-gade-eYWNaMffWHI-unsplash.jpg"
    image={query.topthree.image.localFile.childImageSharp.gatsbyImageData}
    alt="sand texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function BaseTexture() {
  const textures = [
    <BaseOne />,
    <BaseTwo />,
    <BaseThree />
  ];

  const random = Math.floor(Math.random() * textures.length);
  // console.log(random, textures[random]);
  return (
    <>{textures[random]}</>
  );
}

function TopTexture(props) {
  const textures = [
    <TopOne crop={props.crop} />,
    <TopTwo crop={props.crop} />,
    <TopThree crop={props.crop} />
  ];

  const random = Math.floor(Math.random() * textures.length);
  // console.log(random, textures[random]);
  return (
    <>{textures[random]}</>
  );
}

const TextureBackgrounds = (props) => {

  // const { baseone } = useStrapiTextures()

  return (
    <>

      {/* {baseone} */}

      <BaseTexture />
      <TopTexture />
      {/* // TODO: dark */}
      <svg
        viewBox="0 0 1200 630"
        xmlns="http://www.w3.org/2000/svg"
        className="texture-slice"
      >
        <line
          x1="0" y1="630" x2="1200" y2="0"
          // stroke="whitesmoke"
          strokeWidth="3"
        />
      </svg>
    </>
  )
}

export default TextureBackgrounds