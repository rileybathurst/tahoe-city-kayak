import * as React from "react"
import { Script } from 'gatsby'
import { useSiteUrl } from "../../../hooks/use-site-url";;

const BreadcrumbTwo = (props) => {
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
          }]
        }
      `}
    </Script>
  )
}

export default BreadcrumbTwo
