import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"

function WaterTexture(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
    alt="water texture"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

const RetailPage = () => {
  return (
    <>
      <Header />
      <main>
        <h3>Retail</h3>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel.</p>

        <p>Our Store and our retail prices are competitive with big-city retailers! Hobie, Wilderness Systems, Eddyline, Tahoe SUP, Pau Hana, Amundson, Bic Paddlesurf and more. Try before you buy!</p>

        <p>Retail and Reservations
          Open 7 days a week 9:00am&ndash;6:00pm</p>

        <p>Located at
          <address>
            521 N Lake Blvd<br />
            Tahoe City,<br />
            CA 96145
          </address>
        </p>
      </main>

      {<StaticQuery
        query={query}
        render={data => (
          <section className="deck">
            {
              data.allStrapiRetail.edges.map(retail => (
                <article key={retail.node.id} className="card">
                  <WaterTexture className="card__placeholder" />
                  <h4 className="card__title">
                    <Link to={`/retail/${retail.node.slug}`}>
                      {retail.node.title}
                    </Link>
                  </h4>
                  <hr />
                  <p>TODO: add a description</p>
                  <hr />
                  <div className="card__details">
                    <h5>$cost</h5>
                    <button>Book Now</button>
                  </div>
                </article>
              ))
            }
          </section>
        )}
      />}

      <Footer />
    </>
  )
}

export default RetailPage

const query = graphql`
query RetailsQuery {
  allStrapiRetail {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
}
`
