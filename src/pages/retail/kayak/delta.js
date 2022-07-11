import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../../components/header"
import Footer from "../../../components/footer"

import WaterTexture from "../../../images/watertexture";

const RetailPage = () => {
  return (
    <>
      <Header />
      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Link to="/retail/kayak">Kayak</Link>&nbsp;/&nbsp;
        Delta
      </div>

      <main>
        <h1>Delta</h1>
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
query DeltaQuery {
  allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "delta"}}
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
