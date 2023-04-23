import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import { useSiteUrl } from "../../../hooks/use-site-url";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import KayakFeatureList from "../../../components/kayak-feature-list";
import Ultralight from "../../../components/ultralight";
import Card from "../../../components/card";

const UltralightPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query UltraLightQuery {
      allStrapiRetail(
        filter: {
          type: {eq: "kayak"},
          hullweight: {lt: 46},
          crew: {eq: "single"}
        }
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
          hullweight
          
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

  let title = "Ultralight Kayaks";

  return (
    <>
      <Header />

      <main>
        <h1>{title}</h1>
        <Ultralight />
      </main>

      <section className="deck">
        {allStrapiRetail.nodes.map(retail => (
          <div key={retail.id}>
            <Card
              retail={retail}
            />
          </div>
        ))}
      </section>
      <hr className="passage" />


      <section className="passage">
        <h3>Browse Kayaks by Feature</h3>
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

export default UltralightPage

export const Head = () => {
  return (
    <SEO
      title={`Ultralight Kayaks | ${useSiteName()}`}
      description="Our ultralight kayaks are Single kayaks under 46 pounds"
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
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Kayak",
            "item": "${useSiteUrl()}/retail/kayak"
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
