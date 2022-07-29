import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";
import Remainder from "../../components/remainder";
import MapStore from "../../components/map-store";
import TextureBackgrounds from "../../components/texturebackgrounds";

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
        <h4><Remainder inches={props.length} /> tall by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

const RetailKayakPage = () => {
  let title = "Retail Kayak";
  let parent = "retail";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to="/" itemprop="item">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to={`/${parent}`} itemprop="item">
            <span itemprop="name">{parent}</span>
            <meta itemprop="position" content="2" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="item">
            <span
              itemprop="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemprop="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
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

        <p>Retail and Reservations<br />
          {/* // TODO: single update */}
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
              <Link to="/retail/kayak/hobie">
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
                    excerpt={retail.node.excerpt}
                    cutout={retail.node?.cutout}
                  />
                ))
              }
            </section>

            <article>
              <hr />
              <Link to="/retail/kayak/eddyline">
                <h2>Eddyline</h2>
              </Link>
            </article>

            <section className="deck">
              {
                data.eddyline.edges.map(retail => (
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
              <hr />
              <Link to="/retail/kayak/perception">
                <h2>Perception</h2>
              </Link>
            </article>

            <section className="deck">
              {
                data.perception.edges.map(retail => (
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
              <hr />
              <Link to="/retail/kayak/wildernesssystems">
                <h2>Wilderness Systems</h2>
              </Link>
            </article>

            <section className="deck">
              {
                data.wildernesssystems.edges.map(retail => (
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
              <hr />
              <Link to="/retail/kayak/delta">
                <h2>Delta</h2>
              </Link>
            </article>

            <section className="deck">
              {
                data.delta.edges.map(retail => (
                  <Card
                    id={retail.node.id}
                    slug={retail.node.slug}
                    title={retail.node.title}
                    capacity={retail.node.capacity}
                    length={retail.node.length}
                    width={retail.node.width}
                    excerpt={retail.node.excerpt}
                  />
                ))
              }
            </section>
            <article>
              <hr />
              <Link to="/retail/kayak/bote">
                <h2>Bote</h2>
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
              <hr />
              <Link to="/retail/kayak/brusurf">
                <h2>Bru Surf</h2>
              </Link>
            </article>

            <section className="deck">
              {
                data.brusurf.edges.map(retail => (
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

export default RetailKayakPage

const query = graphql`
query KayaksQuery {
  hobie: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "hobie"}}) {
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
  
  eddyline: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "eddyline"}}) {
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
  
  perception: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "perception"}}) {
    edges {
      node {
        id
        title
        slug
        excerpt
        capacity
        length
        width
      }
    }
  }
  
  wildernesssystems: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "wilderness systems"}}) {
    edges {
      node {
        id
        title
        slug
        excerpt
        capacity
        length
        width
      }
    }
  }
  
  delta: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "delta"}}) {
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
  
  bote: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "bote"}}) {
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
  
  brusurf: allStrapiRetail(filter: {type: {eq: "kayak"}, brand: {eq: "bru surf"}}) {
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
