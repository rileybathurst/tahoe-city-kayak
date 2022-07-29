// Im sure this is possible but not in like 5 mins

import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import BookNow from "../../src/components/peek/book-now";
import Seo from "../../src/components/seo";

import WaterTexture from "../../src/images/watertexture";

function Deck(props) {
  return (
    <>
      {props.name.map(item => (
        <>
          <article>
            <hr />
            <Link to={`/retail/kayak/${item}`}>
              <h2>{item}</h2>
            </Link>
          </article>

          <section className="deck">
            {{ item }.edges.map(retail => (
              <>

              </>
            ))}

          </section>
        </>
      ))
      }
    </>
  )
}

const DeckPage = () => {
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


          <Deck
            name={[
              "hobie",
              "cross",
            ]}
          />

        )}
      />}

      <Footer />
    </>
  )
}

export default DeckPage

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
      }
    }
  }
}
`
