// LATER: these can be split by brand
// ! this page is breaking the build

import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import FeatureLayout from "../../src/components/feature-layout";
import { SEO } from "../../src/components/seo";
import { useSiteMetadata } from "../../src/hooks/use-site-metadata";
import BreadcrumbThree from "../../src/components/breadcrumb-three";

let title = "Inflatable Kayaks";
let description = "Inflatable kayaks are great for paddling around Lake Tahoe because they are convenient, maneuverable, and accessible. They are also lightweight and easy to transport.";
let type = "kayak";

const InflatableKayakPage = () => {

  /*   const { allStrapiRetail } = useStaticQuery(graphql`
      query RigidKayakQuery {
        allStrapiRetail(filter: {type: {eq: "kayak"}, inflatable: {eq: true}}) {
          nodes {
            id
            title
            slug
            excerpt
            capacity
            length
            width
            type
  
            cutout {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              alternativeText
            }
          }
        }
      }
    `) */

  return (
    <>
    // ! broken
      {/*     <FeatureLayout
      title={title}
      description={description}
      type={type}
      // query={allStrapiRetail}
  /> */}
    </>
  )
}

export default InflatableKayakPage

export const Head = () => {
  return (
    <SEO
      title={`${title} | ${useSiteMetadata().title}`}
      description={description}
    >
      <BreadcrumbThree
        one="retail"
        two={type}
        three={title}
      />
    </SEO>
  )
}
