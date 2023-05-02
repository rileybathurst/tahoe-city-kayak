// ! this isnt used am I still working on it or skipping it?

import * as React from "react"
import { Script } from 'gatsby'
import { useSiteUrl } from "../../../hooks/use-site-url";;

const BreadcrumbSEO = (props) => {
  return (
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "${props.one}",
            "item": "${useSiteUrl()}/${props.one}"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${props.two}",
            "item": "${useSiteUrl()}/${props.one}/${props.two}/"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "${props.child}"
          }]
        }
      `}
    </Script>
  )
}

export default BreadcrumbSEO
