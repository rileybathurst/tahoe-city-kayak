// TODO this can be a template

import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import { useSiteUrl } from "../../../hooks/use-site-url";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import TextureBackgrounds from "../../../components/texturebackgrounds";
import Remainder from "../../../components/remainder";
import KayakFeatureList from "../../../components/kayak-feature-list";

function Card(props) {
  // console.log(props.kayak);

  return (
    <article key={props.kayak.id} className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props.kayak.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props.kayak.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${props.kayak.type}/${props.kayak.slug}`}>
          {props.kayak.title}
        </Link>
      </h4>
      <hr />
      <p>{props.kayak.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.kayak.length} /> long by {props.kayak.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.kayak.capacity}lbs</h5>
        {/* // TODO: if no capacity */}
      </div>
    </article>
  )
}

const InflatableKayakPage = () => {
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
          <li aria-current="page">Inflatable Kayaks</li>
        </ol>
      </nav>

      <main>
        <h1>Inflatable Kayaks</h1>
        <p>// TODO: </p>
      </main>


      <StaticQuery
        query={query}
        render={data => (
          <>
            <section className="deck">
              {
                data.allStrapiRetail.edges.map(retail => (
                  <Card
                    kayak={retail.node}
                  />
                ))
              }
            </section>

            <hr className="pelican-inline" />
          </>
        )}
      />

      <section className="pelican-inline">

        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <Footer />
    </>
  )
}

export default InflatableKayakPage

export const Head = () => {
  return (
    <SEO
      title={`Two Person Kayaks | ${useSiteName()}`}
      description="Our tandem kayaks are the perfect way to explore the water with friends"
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
              "name": "Inflatable Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}

const query = graphql`
query InflatableKayakQuery {
  allStrapiRetail(filter: {inflatable: {eq: false}, type: {eq: "kayak"}}) {
    nodes {
      title
    }
  }
}
`

// filter: {inflatable: {eq: true}, type: {eq: "kayak"}}(limit: 4), 
/* allStrapiRetail {
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
} */