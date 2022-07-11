import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../components/header";
import Footer from "../../components/footer";
import BookNow from "../../components/peek/book-now";
import Seo from "../../components/seo";

import WaterTexture from "../../images/watertexture";

const RetailPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="SUP Retail"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        SUP
      </div>

      <main>
        <h1>Stand Up Paddleboards (SUPs)</h1>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel. Our Store and our retail prices are competitive with big-city retailers!</p>

        <ul>
          <li><Link to="/retail/sup/hobie">Hobie</Link></li>
          <li><Link to="/retail/sup/cross">Cross</Link></li>
          <li><Link to="/retail/sup/tahe">Tahe</Link></li>
          <li><Link to="/retail/sup/sic">Sic</Link></li>
          <li><Link to="/retail/sup/bic">Bic</Link></li>
          <li><Link to="/retail/sup/bote">bote</Link></li>
          <li><Link to="/retail/sup/hala">Hala</Link></li>
          <li><Link to="/retail/sup/pau-hana">Pau Hana</Link></li>
          <li><Link to="/retail/sup/drift">Drift</Link></li>
        </ul>

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
query SupQuery {
  allStrapiRetail(filter: {type: {eq: "sup"}}) {
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
