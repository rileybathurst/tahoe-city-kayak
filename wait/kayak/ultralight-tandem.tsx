import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../src/components/seo";
import { useSiteMetadata } from "../../src/hooks/use-site-metadata";
import { useSiteUrl } from "../../src/hooks/use-site-url";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import Ultralight from "../../src/components/ultralight";
import Card from "../../src/components/card";
import KayakFeatureList from "../../src/components/kayak-feature-list";

const UltralightTandemPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
query UltraLightTandemQuery {
  allStrapiRetail(
    filter: {type: {eq: "kayak"}, hullweight: {lt: 70}, crew: {eq: "tandem"}}
    sort: {hullweight: ASC}
    ) {
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

  let title = "Ultralight Two Person Kayaks";

  return (
    <>
      <Header />

      <main>
        <h1>{title}</h1>

        <Ultralight />
      </main>
      <section className="deck">
        {
          allStrapiRetail.nodes.map(retail => (
            <div key={retail.id}>
              <Card
                retail={retail}
              />
            </div>
          ))
        }
      </section>


      < hr className="passage" />

      <section className="passage" >
        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to={`/retail`}>Retail</Link>&nbsp;/&nbsp;
          </li>
          <li>
            <Link to={`/retail/kayak`}>Kayak</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <Footer />
    </>
  )
}

export default UltralightTandemPage

export const Head = () => {
  return (
    <SEO
      title={`Ultralight Tandem Kayaks | ${useSiteMetadata().title}`}
      description="Our ultralight kayaks are two person kayaks under 70 pounds"
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
              "item": "${useSiteMetadata().url}/retail"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Kayak",
              "item": "${useSiteMetadata().url}/retail/kayak"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Ultralight Two Person Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
