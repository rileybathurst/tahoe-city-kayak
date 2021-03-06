import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Seo from "../../../components/seo";

import WaterTexture from "../../../images/watertexture";

const RetailPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Boardworks SUPS"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Link to="/retail/sup">SUP</Link>&nbsp;/&nbsp;
        Boardworks
      </div>

      <main>
        <h1>Boardworks</h1>
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
query BoardworksSupQuery {
  allStrapiRetail(
    filter: {type: {eq: "sup"},
    brand: {eq: "boardworks"}}
    ) {
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
