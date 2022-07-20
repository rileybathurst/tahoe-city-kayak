import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../../components/header"
import Footer from "../../components/footer"
import Seo from "../../components/seo";
import Remainder from "../../components/remainder";
import MapStore from "../../components/map-store";

import WaterTexture from "../../images/watertexture";

function Card(props) {
  return (
    <article key={props.id} className="card">
      <div className="card-collage">
        <WaterTexture className="card__placeholder" />
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
        <h4><Remainder inches={props.length} /> tall by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

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
            <MapStore>
              521 N Lake Blvd<br />
              Tahoe City,<br />
              CA 96145
            </MapStore>
          </address>
        </p>
      </main>

      {<StaticQuery
        query={query}
        render={data => (
          <>
            <article>
              <Link to="/retail/sup/cross">
                <h2>cross</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.cross.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/tahe">
                <h2>tahe</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.tahe.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/hobie">
                <h2>Hobie</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.hobie.edges.map(retail => (
                  <Card
                    id={retail.node.id}
                    slug={retail.node.slug}
                    title={retail.node.title}
                    capacity={retail.node.capacity}
                    length={retail.node.length}
                    width={retail.node.width}
                  />
                ))
              }
            </section>

            <article>
              <Link to="/retail/sup/sic">
                <h2>sic</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.sic.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/bic">
                <h2>bic</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.bic.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/bote">
                <h2>bote</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.bote.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/hala">
                <h2>Hala</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.hala.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/boardworks">
                <h2>boardworks</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.boardworks.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/pauhana">
                <h2>pauhana</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.pauhana.edges.map(retail => (
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

            <article>
              <Link to="/retail/sup/drift">
                <h2>drift</h2>
              </Link>
            </article>
            <section className="deck">
              {
                data.drift.edges.map(retail => (
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

export default RetailPage

const query = graphql`
query SupQuery {
  cross: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "cross"}
    }) {
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
  
  tahe: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "tahe"}
    }) {
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
  
  hobie: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "hobie"}
    }) {
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

  sic: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "sic"}
    }) {
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
  
  bic: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "bic"}
    }) {
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

  bote: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "bote"}
    }) {
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
  
  hala: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "hala"}
    }) {
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
  
  boardworks: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "boardworks"}
    }) {
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
  
  pauhana: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "pau hana"}
    }) {
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
  
  drift: allStrapiRetail(
    filter: {
      type: {eq: "sup"},
      brand: {eq: "drift"}
    }) {
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
