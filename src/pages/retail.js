import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";
import Remainder from "../components/remainder";
import MapStore from "../components/map-store";
import StoreIcon from "../images/store";
import KayakFeatureList from "../components/kayak-feature-list";

import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";

import TextureBackgrounds from "../components/texturebackgrounds";

const RetailPage = () => {
  let title = "Retail";

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
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, touring, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel. Our Store and our retail prices are competitive with big-city retailers! Try before you buy!</p>

        <div className="here__location here__card">
          <StoreIcon />
          <p>
            <strong>Retail Location</strong><br />
            <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" >
              521 North Lake Blvd,<br />
              Tahoe City 96145</a>
          </p>

          <p>
            Open Daily<br />
            9am &ndash; 6pm<br />
          </p>
        </div>

        <h2><Link to="/retail/kayak">Kayaks</Link></h2>
        <h2>Browse By Feature</h2>
        <KayakFeatureList />
      </main>
      <section>
        <h2>Browse By Brand</h2>
      </section>
      <KayakBrandList />

      <StaticQuery
        query={query}
        render={data => (

          <>

            <section className="deck">
              {
                data.kayak.edges.map(kayak => (
                  <article key={kayak.node.id} className="card">
                    <div className="card-collage">
                      <TextureBackgrounds />
                      <GatsbyImage
                        image={kayak.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={kayak.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>
                    <h4 className="card__title">
                      <Link to={`/retail/${kayak.node.type}/${kayak.node.slug}`}>
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
            </article>
            <section>
              <h2>Browse By Brand</h2>
            </section>
            <SupBrandList />

            <section className="deck">
              {
                data.sup.edges.map(sup => (
                  <article key={sup.node.id} className="card">
                    <div className="card-collage">
                      <TextureBackgrounds />
                      <GatsbyImage
                        image={sup.node?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={sup.node?.cutout?.alternativeText}
                        className="cutout"
                      />
                    </div>
                    <h4 className="card__title">
                      <Link to={`/retail/${sup.node.type}/${sup.node.slug}`}>
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
              <h2><Link to="/retail/sup">All Paddleboards</Link></h2>
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
