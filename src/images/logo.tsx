import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";

type LogoQueryData = {
  logoLight: {
    image: PaddleGatsbyImageType;
  };
  logoDark: {
    image: PaddleGatsbyImageType;
  };
};

function LogoLight({ query }: { query: LogoQueryData }) {
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.logoLight.image.localFile.childImageSharp.gatsbyImageData}
    alt="tahoe city kayak and paddleboard logo"
  />
}

function LogoDark({ query }: { query: LogoQueryData }) {
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.logoDark.image.localFile.childImageSharp.gatsbyImageData}
    alt="tahoe city kayak and paddleboard logo"
  />
}

// light to dark switch
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
  }, [matches, query]);

  return matches;
}

function Logo() {
  const query = useStaticQuery<LogoQueryData>(graphql`
    query LogosQuery {
      logoLight: strapiImagegrab(title: {eq: "logoLight"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 294
                transformOptions: {fit: CONTAIN}
              )
            }
          }
        }
      }

      logoDark: strapiImagegrab(title: {eq: "logoDark"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 294)
            }
          }
        }
      }
    }
  `);

  var isSiteDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      {isSiteDark && <LogoDark query={query} />}
      {isSiteDark || <LogoLight query={query} />}
    </>
  );
}

export default Logo;

