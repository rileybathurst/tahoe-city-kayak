import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import FeatureLayout from "../../../components/feature-layout";
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import BreadcrumbThree from "../../../components/breadcrumb-three";

let title = "Rigid Standup Paddleboards";
let description = "Shop Tahoe City Kayak&apos;s selection of rigid paddleboards for sale! Our paddleboards are designed with high strength advanced hull design and feature miragedrive w/ glide technology, removable kick-up rudder, high-grip EVA deckpads, cargo bungee, quick set adjustable handlebar and steering controls. Our paddleboards are perfect for those looking for a fun and exciting way to explore Lake Tahoe’s crystal clear waters.";
let type = "sup";

const RigidPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query RigidKayakQuery {
      allStrapiRetail(filter: {type: {eq: "sup"}, inflatable: {eq: false}}) {
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

export default RigidPage

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
