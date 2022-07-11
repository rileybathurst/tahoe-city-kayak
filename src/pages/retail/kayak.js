import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../components/header"
import Footer from "../../components/footer"
import BookNow from "../../components/peek/book-now";

import WaterTexture from "../../images/watertexture";

const RetailPage = () => {
  return (
    <>
      <Header />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        Kayak
      </div>

      <main>
        <h1>Kayaks</h1>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel. Our Store and our retail prices are competitive with big-city retailers!</p>

        <ul>
          <li><Link to="/retail/kayak/hobie">Hobie</Link></li>
          <li><Link to="/retail/kayak/wilderness-systems">Wilderness Systems</Link></li>
          <li><Link to="/retail/kayak/eddyline">Eddyline</Link></li>
          <li><Link to="/retail/kayak/perception">Perception</Link></li>
          <li><Link to="/retail/kayak/delta">Delta</Link></li>
          <li><Link to="/retail/kayak/bote">BOTE</Link></li>
          <li><Link to="/retail/kayak/bru-surf">Bru Surf</Link></li>
        </ul>

        <p>Try before you buy!</p>

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
                    <BookNow />
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
query KayaksQuery {
  allStrapiRetail(filter: {type: {eq: "kayak"}}) {
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
