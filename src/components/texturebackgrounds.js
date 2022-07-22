import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

function BaseOne() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/tim-mossholder-z3Xp1ZcvzgE-unsplash.webp"
    alt="deepwater texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function BaseTwo() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/marissa-rodriguez-2mKYEVGA4jE-unsplash.webp"
    alt="clear texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function BaseThree() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/samara-doole-peaTniZsUQs-unsplash.webp"
    alt="splash texture"
    className="texture-slice"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopOne() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/dewang-gupta-ESEnXckWlLY-unsplash.webp"
    alt="sunset texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopTwo() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leem-50bzI1F6urA-unsplash.webp"
    alt="forrest texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function TopThree() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jim-gade-eYWNaMffWHI-unsplash.webp"
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
  return (
    <>
      <BaseTexture />
      <TopTexture />
      <svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="630" x2="1200" y2="0" stroke="whitesmoke" strokeWidth="3" />
      </svg>
    </>
  )
}

export default TextureBackgrounds