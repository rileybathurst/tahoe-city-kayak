import * as React from "react"
import { graphql, Script } from "gatsby"
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";

import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
      id
      name
      information {
        data {
          information
        }
      }
      start
      finish
      duration
      minimum
      fitness
      peek
      sport
      excerpt
      price
      slug

      ogimage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    allStrapiTour(filter: {slug: {nin: [$slug] }}) {
      nodes {
        id
        name
        slug
        excerpt
        start
        finish
        duration
        fitness
        price
        peek

        ogimage {
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
`

const TourPage = ({ data }) => {
  const tour = data.strapiTour;
  const other = data.allStrapiTour;
  return (
    <TourView
      tour={tour}
      other={other}
    />
  );
};

export default TourPage;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiTour.name} | ${useSiteName()}`}
      description={data.strapiTour.excerpt}
      // TODO image
      // github copilot gave me the extra
      image={data.strapiTour.ogimage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
      imageAlt={data.strapiTour.ogimage.alternativeText}
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Retail",
            "item": "${useSiteUrl()}/tours-lessons"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "${data.strapiTour.name}",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}