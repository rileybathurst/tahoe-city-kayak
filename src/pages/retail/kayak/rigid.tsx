// LATER: these can be split by brand

import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import FeatureLayout from "../../../components/feature-layout";
import BreadcrumbThree from "../../../components/breadcrumb-three";

let title = "Rigid Kayaks";
let description = "Rigid kayaks are more durable and last longer. Generally speaking, rigid kayaks perform better in rough waters for this reason going with rigid kayaks will do well when you are looking at Lake Tahoe's conditions.";
let type = "kayak";

const RigidKayakPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query {
      allStrapiRetail(filter: {inflatable: {eq: false}, type: {eq: "kayak"}}) {
        nodes {
          id
          title
          type
          slug
          length
          width
          capacity
          excerpt
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
  `)

  return (
    <FeatureLayout
      title={title}
      description={description}
      type={type}
      query={allStrapiRetail}
    />
  )
}

export default RigidKayakPage

export const Head = () => {
  return (
    <SEO
      title={`${title} | ${useSiteName()}`}
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