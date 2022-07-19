import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";
import Remainder from "../components/remainder";

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


      </main>

      <StaticQuery
        query={query}
        render={data => (

          <>

            <section className="deck">
              {
                data.kayak.edges.map(kayak => (
                  <article key={kayak.node.id} className="card">
                    <div className="card-collage">
                      <WaterTexture className="card__placeholder" />
                      <GatsbyImage
                        image={kayak.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={kayak.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>
                    <h4 className="card__title">
                      <Link to={`/retail/${kayak.node.slug}`}>
                        {kayak.node.title}
                      </Link>
                    </h4>
                    <hr />
                    <p>{kayak.node.excerpt}</p>
                    <hr />
                    <div className="card__details">
                      <h4 className="capitalize">{kayak.node.type}</h4>
                      <h5><Remainder inches={kayak.node.length} /> tall by {kayak.node.width}" wide</h5>
                    </div>
                  </article>
                ))
              }

              <h2><Link to="/retail/kayak">All Kayaks</Link></h2>
            </section>

            <article>
              <hr />
              <h2><Link to="/retail/sup">Stand Up Paddleboards (SUPs)</Link></h2>
              <SupBrandList />
            </article>

            <section className="deck">
              {
                data.sup.edges.map(sup => (
                  <article key={sup.node.id} className="card">
                    <div className="card-collage">
                      <WaterTexture className="card__placeholder" />
                      <GatsbyImage
                        image={sup.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={sup.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>
                    <h4 className="card__title">
                      <Link to={`/retail/${sup.node.slug}`}>
                        {sup.node.title}
                      </Link>
                    </h4>
                    <hr />
                    <p>{sup.node.excerpt}</p>
                    <hr />
                    <div className="card__details">
                      <h4 className="capitalize">{sup.node.type}</h4>
                      <h5><Remainder inches={sup.node.length} /> tall by {sup.node.width}" wide</h5>
                    </div>
                  </article>
                ))
              }
              <h2><Link to="/retail/sup">All SUPs</Link></h2>
            </section>
          </>
        )} />

      <Footer />
    </>
  )
}

export default RetailPage

const query = graphql`
query RetailsQuery {
  kayak: allStrapiRetail(filter: {type: {eq: "kayak"}}, limit: 4) {
    edges {
      node {
        id
        title
        slug
        length
        width
        type
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
  
  sup: allStrapiRetail(filter: {type: {eq: "sup"}}, limit: 4) {
    edges {
      node {
        id
        title
        slug
        length
        width
        type
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
