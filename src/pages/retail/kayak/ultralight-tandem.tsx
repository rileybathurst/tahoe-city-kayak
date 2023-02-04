import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../../components/seo";
import TitleTemplate from "../../../components/title-template";
import { useSiteUrl } from "../../../hooks/use-site-url";

import Header from "../../../components/header";
import Footer from "../../../components/footer";

import TextureBackgrounds from "../../../components/texturebackgrounds";
import Remainder from "../../../components/remainder";

function Card(props) {
  return (
    <article key={props.id} className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.type}/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.length} /> long by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

const UltralightTandemPage = () => {
  let title = "Ultralight Two Person Kayaks";

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
        <h1>{title}</h1>

        <p>Many companies are finding ways to make their kayaks or paddleboards weigh less.</p>
        <ul>
          <li><Link to="/retail/kayak/eddyline">Eddyline Kayaks</Link> uses a lightweight polycarbonate material called “Carbonlite” that mimics the properties of fiberglass, but is far more durable. Both fiberglass and Carbonlite are considerably lighter than the polyethylene plastics that most kayaks are constructed with.</li>
          <li><Link to="/retail/kayak/hobie">Hobie</Link> and <Link to="/retail/sup/pauhana">Pau Hana</Link> are using the latest inflatable technology on some of their watercraft, and have been able to shave about 20% of the weight that their older inflatable designs had.</li>
          <li>Oru kayaks has made a folding kayak out of an innovative polymer. Some of their models are weighing in around 20 lbs.</li>
        </ul>
      </main>

      {
        <StaticQuery
          query={query}
          render={data => (
            <section className="deck">
              {
                data.allStrapiRetail.edges.map(retail => (
                  <Card
                    id={retail.node.id}
                    slug={retail.node.slug}
                    title={retail.node.title}
                    capacity={retail.node.capacity}
                    length={retail.node.length}
                    width={retail.node.width}
                    excerpt={retail.node.excerpt}
                    cutout={retail.node?.cutout}
                    type={retail.node.type}
                  />
                ))
              }
            </section>
          )}
        />
      }

      <Footer />
    </>
  )
}

export default UltralightTandemPage

export const Head = () => {
  return (
    <SEO
      title={`Ultralight Tandem Kayaks | ${useSiteName()}`}
      description="Our ultralight kayaks are two person kayaks under 70 pounds"
    // TODO image
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

const query = graphql`
query UltraLightTandemQuery {
  allStrapiRetail(
    filter: {type: {eq: "kayak"}, hullweight: {lt: 70}, crew: {eq: "tandem"}}
    sort: {order: ASC, fields: hullweight}
    ) {
    edges {
      node {
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
}
`