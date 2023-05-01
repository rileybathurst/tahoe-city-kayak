import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import FeatureLayout from "../../../components/feature-layout";
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import BreadcrumbThree from "../../../components/breadcrumb-three";

let title = "Inflatable Standup Paddleboards";
let description = "Inflatable stand up paddleboards tend to be lighter Much of Tahoe&apos;s coastline isn&apos;t ultra accessible by land when you&apos;re carrying a 10-foot-long, 30-pound paddleboard. Going with an inflatable SUP can help solve that problem.";
let type = "sup";

const InflateablePage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query InflatableKayakQuery {
      allStrapiRetail(filter: {type: {eq: "sup"}, inflatable: {eq: true}}) {
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

export default InflateablePage

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
