import React, { useState, useEffect } from "react";
// import { useStaticQuery, graphql } from "gatsby";
// import { GatsbyImage } from "gatsby-plugin-image"

/* function LogoLight(props) {
  return <GatsbyImage
    // the best version I could find. its small at best
    image={props.logo}
    alt="tahoe city kayak and paddleboard logo"
  // breakpoints={[294]}
  // width={294}
  // objectFit="contain"
  />
} */

/* function LogoDark(props) {
  return <GatsbyImage
    // the best version I could find. its small at best
    // image="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/TCK-admin-logo-negative.png"
    image={props.logo}
    alt="tahoe city kayak and paddleboard logo"
  // breakpoints={[294]}
  // width={294}
  // objectFit="contain"
  />
}
 */
// light to dark switch
/* export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
  }, [matches, query]);

  return matches;
} */

function Logo() {
  // let isSiteDark = useMediaQuery("(prefers-color-scheme: dark)");

  const query = useStaticQuery(graphql`
  query LogoQuery {
    light: strapiImagegrab(title: {eq: "logoLight"}) {
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }

    dark: strapiImagegrab(title: {eq: "logoDark"}) {
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`)

  let light = query.light.image.localFile.childImageSharp.gatsbyImageData;
  // let dark = query.dark.image.localFile.childImageSharp.gatsbyImageData;

  return (
    <>
      {/*       {isSiteDark && <LogoDark logo={dark} />}
      {isSiteDark || <LogoLight logo={light} />} */}

      logo

      {/* {isSiteDark ? <LogoDark logo={dark} /> : <LogoLight logo={light} />} */}

      {/* <LogoLight logo={light} /> */}
      {/* <LogoDark logo={dark} /> */}
    </>
  );
}

export default Logo;