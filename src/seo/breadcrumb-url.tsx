import React from 'react';
// Import the metaquery
import { graphql, useStaticQuery } from "gatsby"

import { useSiteUrl } from "../hooks/use-site-url"

console.log('🍔');
console.log(useSiteUrl);
// console.log(useSiteUrl()); // nope
console.log(useSiteUrl.siteMetadata); // undefined
console.log(useSiteUrl.url); // undefined

export const URLQuery = () => {
  const { } = useSiteUrl()

  return (
    <>
      {/*<meta url=${useSiteUrl} />
    // <meta url="${useSiteUrl}" />
    // <meta a={useSiteUrl} /> // fails
    // <meta a=${useSiteUrl} /> // fails
  null */}
    </>
  )
}

export default URLQuery;