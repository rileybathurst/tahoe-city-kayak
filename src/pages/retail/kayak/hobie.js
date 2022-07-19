import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Seo from "../../../components/seo";

import WaterTexture from "../../../images/watertexture";

const RetailPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Hobie Kayaks"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Link to="/retail/kayak">Kayak</Link>&nbsp;/&nbsp;
        Hobie
      </div>

      <main>
        <h1>Hobie</h1>
      </main>

      {<StaticQuery
        query={query}
        render={data => (
          <>

            <article>
              <h2>Mirage Series</h2>
            </article>

            <section className="deck">
              {
                data.mirage.edges.map(retail => (
                  <article key={retail.node.id} className="card">
                    <div className="card-collage">
                      <WaterTexture className="card__placeholder texture" />
                      <GatsbyImage
                        image={retail.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={retail.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>

                    <h4 className="card__title">
                      <Link to={`/retail/${retail.node.slug}`}>
                        {retail.node.title}
                      </Link>
                    </h4>
                    <hr />
                    <p>{retail.node.excerpt}</p>
                  </article>
                ))
              }
            </section>


            <article>
              <h2>Island Series</h2>
            </article>

            <section className="deck">
              {
                data.island.edges.map(retail => (
                  <article key={retail.node.id} className="card">
                    <div className="card-collage">
                      <WaterTexture className="card__placeholder texture" />
                      <GatsbyImage
                        image={retail.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={retail.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>

                    <h4 className="card__title">
                      <Link to={`/retail/${retail.node.slug}`}>
                        {retail.node.title}
                      </Link>
                    </h4>
                    <hr />
                    <p>{retail.node.excerpt}</p>
                  </article>
                ))
              }
            </section>

            <article>
              <h2>Inflatable Series</h2>
            </article>

            <section className="deck">
              {
                data.inflatable.edges.map(retail => (
                  <article key={retail.node.id} className="card">
                    <div className="card-collage">
                      <WaterTexture className="card__placeholder texture" />
                      <GatsbyImage
                        image={retail.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={retail.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>

                    <h4 className="card__title">
                      <Link to={`/retail/${retail.node.slug}`}>
                        {retail.node.title}
                      </Link>
                    </h4>
                    <hr />
                    <p>{retail.node.excerpt}</p>
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
query HobieQuery {
  mirage: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "mirage"}
  }) {
    edges {
      node {
        id
        title
        slug
        excerpt

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
  
  island: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "island"}
  }) {
    edges {
      node {
        id
        title
        slug
        excerpt

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
  
  inflatable: allStrapiRetail(
    filter: {type: {eq: "kayak"},
    brand: {eq: "hobie"},
    series: {eq: "inflatable"}
  }) {
    edges {
      node {
        id
        title
        slug
        excerpt

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
