import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

import WaterTexture from "../images/watertexture";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";

const RetailPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Retail"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        Retail
      </div>

      <main>
        <h1>Retail</h1>
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

        <h2><Link to="/retail/kayak">Kayaks</Link></h2>
        <KayakBrandList />

        <h2><Link to="/retail/sup">Stand Up Paddleboards (SUPs)</Link></h2>
        <SupBrandList />
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
                  <p>{retail.node.childStrapiRetailDescriptionTextnode?.description}</p>
                  <hr />
                  <div className="card__details">
                    <h4>{retail.node.type}</h4>
                    <h5>{retail.node.length}' x {retail.node.width}"</h5>
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
        length
        width
        type

        childStrapiRetailDescriptionTextnode {
          description
        }
      }
    }
  }
}
`
