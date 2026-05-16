import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";

type LogoQueryData = {
  strapiBranch: {
    logoImage: PaddleGatsbyImageType;
    logoImageNegative: PaddleGatsbyImageType;
  };
};

function LogoLight({ query }: { query: PaddleGatsbyImageType }) {
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.localFile.childImageSharp.gatsbyImageData}
    alt="tahoe city kayak and paddleboard logo"
  />
}

function LogoDark({ query }: { query: PaddleGatsbyImageType }) {
  return <GatsbyImage
    // the best version I could find. its small at best
    image={query.localFile.childImageSharp.gatsbyImageData}
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
  const { strapiBranch } = useStaticQuery<LogoQueryData>(graphql`
    query LogosQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        logoImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
        logoImageNegative {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `);

  var isSiteDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      {isSiteDark && <LogoDark query={strapiBranch.logoImageNegative} />}
      {isSiteDark || <LogoLight query={strapiBranch.logoImage} />}
    </>
  );
}

export default Logo;

