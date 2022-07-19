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
        title="Eddyline Kayaks"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Link to="/retail/kayak">Kayak</Link>&nbsp;/&nbsp;
        Eddyline
      </div>

      <main>
        <h1>Eddyline</h1>
      </main>

      {<StaticQuery
        query={query}
        render={data => (
          <>

            <article>
              <h2>Recreational Series</h2>
            </article>

            <section className="deck">
              {
                data.recreational.edges.map(retail => (
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

            <article>
              <h2>Sit On Top Series</h2>
            </article>

            <section className="deck">
              {
                data.sitontop.edges.map(retail => (
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

          </>
        )}
      />}

      <Footer />
    </>
  )
}

export default RetailPage

const query = graphql`
query EddylineQuery {
  recreational: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "eddyline"},
    series: {eq: "recreational"}
  }
    ) {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
  
  sitontop: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "eddyline"},
    series: {eq: "sit-on-top"}
  }
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
