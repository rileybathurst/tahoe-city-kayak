import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Seo from "../../../components/seo";
import TextureBackgrounds from "../../../components/texturebackgrounds";
import Remainder from "../../../components/remainder";
import KayakFeatureList from "../../../components/kayak-feature-list";

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
        <h5 className="capitalize">Hull Weight {props.hullweight}lbs</h5>
      </div>
    </article>
  )
}

const DemosPage = () => {
  let title = "Ultralight Kayaks";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Our ultralight kayaks are Single kayaks under 46 pounds"
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/retail" itemProp="item">
            <span itemProp="name">Retail</span>
            <meta itemProp="position" content="2" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/retail/kayak" itemProp="item">
            <span itemProp="name">Kayak</span>
            <meta itemProp="position" content="3" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="4" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>

        <p>Our ultralight kayaks are Single kayaks under 46 pounds.</p>
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
                    hullweight={retail.node.hullweight}
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

      <section>
        <h3>Browse Kayaks by Feature</h3>
        <KayakFeatureList />
      </section>


      <Footer />
    </>
  )
}

export default DemosPage

const query = graphql`
query UltraLightQuery {
  allStrapiRetail(filter: {type: {eq: "kayak"}, hullweight: {lt: 46}, crew: {eq: "single"}}
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
}
`