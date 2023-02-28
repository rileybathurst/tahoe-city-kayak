import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../../components/seo";

import { useSiteName } from "../../../hooks/use-site-name";
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

const InflateablePage = () => {

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

  let title = "Rigid Paddleboards";

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
            <Link to={`/retail/sup`}>Standup Paddleboard</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      <main>
        <h1>{title}</h1>

        <p>Our tandem kayaks are the perfect way to explore the water with friends.</p>
      </main>

      <section className="deck">
        {/* // TODO: send everything to card */}
        {allStrapiRetail.nodes.map(retail => (
          <Card
            id={retail.id}
            slug={retail.slug}
            title={retail.title}
            capacity={retail.capacity}
            length={retail.length}
            width={retail.width}
            excerpt={retail.excerpt}
            cutout={retail.cutout}
            type={retail.type}
          />
        ))
        }
      </section>

      <Footer />
    </>
  )
}

export default InflateablePage

export const Head = () => {
  return (
    <SEO
      title={`Rigid StandUp Paddleboards | ${useSiteName()}`}
    // TODO description
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
            "name": "Standup Paddleboard",
            "item": "${useSiteUrl()}/retail/sup"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "Rigid Paddleboards"
          }]
        }
      `}
      </Script>

    </SEO>
  )
}