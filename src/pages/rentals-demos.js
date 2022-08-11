import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Seo from "../components/seo";
import MapStore from "../components/map-store";
import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";

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
        <Link to={`/retail/${props.slug}`}>
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

const RentalsDemosPage = () => {
  let title = "Rentals & Demos";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
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
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
        <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>

        <article>
          <h4>Season: May &ndash; October</h4>
          <p>On Water Rental Hours<br />
            Located at<br />
            <address>
              <MapStore>
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145
              </MapStore>
            </address>
          </p>
          <p>Open Daily Weather Permitting 9:30am &ndash;5:30pm</p>

          <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>

          <PricingChart />
        </article>
        <hr />
      </main>

      {<StaticQuery
        query={query}
        render={data => (
          <>

            <article>
              <h3>Demos</h3>
            </article>

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
                  />
                ))
              }
            </section>
          </>
        )}
      />}


      <Footer />
    </>
  )
}

export default RentalsDemosPage

const query = graphql`
query RentalsQuery {
  allStrapiRetail(filter: {demo: {eq: true}}) {
    edges {
      node {
        id
        title
        slug
        excerpt
        capacity
        length
        width

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