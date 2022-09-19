import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image"

function LogoLight() {
  return <StaticImage
    // the best version I could find. its small at best
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/TCK-admin-logo.png"
    alt="tahoe city kayak and paddleboard logo"
    breakpoints={[294]}
    width={294}
    objectFit="contain"
  />
}

function LogoDark() {
  return <StaticImage
    // the best version I could find. its small at best
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/TCK-admin-logo-negative.png"
    alt="tahoe city kayak and paddleboard logo"
    breakpoints={[294]}
    width={294}
    objectFit="contain"
  />
}

// light to dark switch
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
  }, [matches, query]);

  return matches;
}

function Logo() {
  let isSiteDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      {isSiteDark && <LogoDark />}
      {isSiteDark || <LogoLight />}
    </>
  );
}

export default Logo;