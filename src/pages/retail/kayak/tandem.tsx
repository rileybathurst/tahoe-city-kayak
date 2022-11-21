import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../../components/seo";
import TitleTemplate from "../../../components/title-template";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import PricingChart from "../../../components/pricing-chart";
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

const DemosPage = () => {
  let title = "Two Person Kayaks";

  return (
    <>
      <Header />

      {/*       <Seo
        title={title}
        description="Our tandem kayaks are the perfect way to explore the water with friends"
      /> */}

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

        <p>Tandem kayak.</p>
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

export default DemosPage

export const Head = () => {
  return (
    <SEO
      title={`Tandem${TitleTemplate}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}

const query = graphql`
query TandemQuery {
  allStrapiRetail(filter: {crew: {eq: "tandem"}, type: {eq: "kayak"}}) {
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