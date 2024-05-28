import * as React from "react"
import { Link, graphql, Script } from "gatsby"
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Header from "../../components/header"
import Footer from "../../components/footer"
import TourView from "../../views/tour-view"

export const query = graphql`
  query TourQuery($slug: String!) {
    strapiTour(slug: { eq: $slug }) {
      ...tourCard
      
      minimum
      information {
        data {
          information
        }
      }
    }

    allStrapiTour(
      filter: {
        slug: {ne: $slug },
        locale: {slug: {eq: "tahoe-city"}}
      },
      sort: {featured: ASC}
      ) {
      nodes {
        ...tourCard
      }
    }
  }
`

const TourPage = ({ data }) => {
  if (data.strapiTour) {
    return (
      <TourView
        tour={data.strapiTour}
        other={data.allStrapiTour}
      />
    );
  }
  // ! having one inline and one on a template is a mess
  return (
    <>
      <Header />
      <main className="condor">
        {/*         <h2 className="crest">
          <Link to="/tours">Tours</Link> / {params.name}
          </h2> */}

        {/* // TODO: this should be a component */}
        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        {/* // TODO: this is a broken tour page add a set of tours it should be with cards */}
      </main>
      <Footer />
    </>
  );
}

export default TourPage;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.strapiTour.name} | ${useSiteMetadata().title}`}
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
            
            "itemListElement":
            [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Retail",
                "item":
                {
                  "@id": "${useSiteMetadata().url}/tours-lessons",
                  "name": "Tours Lessons"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item":
                {
                  "@id": "${useSiteMetadata().url}/tours-lessons/${data.strapiTour.slug}",
                  "name": "${data.strapiTour.name}"
                }
              }
            ]

          }
        `}
      </Script>

    </SEO>
  )
}