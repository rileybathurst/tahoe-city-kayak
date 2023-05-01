// * this is in /wait
// * im moving to a template
// * images are showing different and wrong here

import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../src/components/seo";
import { useSiteName } from "../../src/hooks/use-site-name";
import { useSiteUrl } from "../../src/hooks/use-site-url";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import KayakFeatureList from "../../src/components/kayak-feature-list";
import Card from "../../src/components/card";

const TandemPage = () => {

  const data = useStaticQuery(graphql`
    query TandemQuery {
      allStrapiRetail(filter: {crew: {eq: "tandem"}, type: {eq: "kayak"}}) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type
          inflatable

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

      strapiFaq(question: {eq: "Is it best to go in a two-person (tandem) kayak?"}) {
        question
        answer
      }
    }
  `)

  let allStrapiRetail = data.allStrapiRetail.nodes;
  let tandem = data.strapiFaq;

  let title = "Two Person Kayaks";

  return (
    <>
      <Header />

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

      <main>
        <h1>Two Person (Tandem) Kayaks</h1>
        <p>Our tandem kayaks are the perfect way to explore the water with friends.</p>
      </main>

      <section
        // className="faq"
        className="stork-inline"
      >

        <h2 className="h3">{tandem.question}</h2>
        {/* // TODO ? is this markdown */}
        <p>{tandem.answer}</p>
        <Link to="/about/faq">Read more of our FAQs</Link>
      </section>

      <section className="deck">
        {allStrapiRetail.map(retail => (
          <div key={retail.id}>
            <Card
              retail={retail}
            />
          </div>
        ))}
      </section>

      <hr className="passage" />


      <section className="passage" >

        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <Footer />
    </>
  )
}

export default TandemPage

export const Head = () => {
  return (
    <SEO
      title={`Two Person Kayaks | ${useSiteName()}`}
      description="Our tandem kayaks are the perfect way to explore the water with friends"
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
              "name": "Two Person Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
