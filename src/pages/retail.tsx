import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";
import Remainder from "../components/remainder";
import StoreIcon from "../images/store";
import KayakFeatureList from "../components/kayak-feature-list";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";
import PaddleboardFeatureList from "../components/paddleboard-feature-list";
import TextureBackgrounds from "../components/texturebackgrounds";

import Composition from "../components/composition";

import Retail from "../content/retail";

const RetailPage = () => {


  const query = useStaticQuery(graphql`
    query RetailsQuery {
      kayak: allStrapiRetail(filter: {type: {eq: "kayak"}}, limit: 4) {
    
        nodes {
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

    sup: allStrapiRetail(filter: {type: {eq: "sup"}}, limit: 4) {
      nodes {
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
`)

  let kayak = query.kayak;
  let sup = query.sup;

  return (
    <>
      <Header />

      <main className="location_card-wrapper">
        <div>
          <h1>Retail</h1>
          <Retail />
        </div>

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
      </main>

      <article className="main__full main__full--tour">
        <section className="blocked">
          <h2><Link to="/retail/kayak">Kayaks</Link></h2>
          <h3 className="condensed">Browse By Feature</h3>
          <KayakFeatureList />
        </section>

        <Composition sport="kayak" />

      </article>

      <section className="brand_list">
        <h3>Browse By Brand</h3>
      </section>
      <KayakBrandList />

      <section className="deck">
        {kayak.nodes.map(kayak => (
          <article key={kayak.id} className="card">
            <div className="card-collage">
              <TextureBackgrounds />
              <GatsbyImage
                image={kayak.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                alt={kayak.cutout?.alternativeText}
                className="cutout"
                objectFit="contain"
              />
            </div>
            <h4 className="card__title">
              <Link to={`/retail/${kayak.type}/${kayak.slug}`}>
                {kayak.title}
              </Link>
            </h4>
            <hr />
            <p>{kayak.excerpt}</p>
            <hr />
            <div className="card__details">
              <h4 className="capitalize">{kayak.type}</h4>
              <h5><Remainder inches={kayak.length} /> tall by {kayak.width}" wide</h5>
            </div>
          </article>
        ))}

        <h2><Link to="/retail/kayak">All Kayaks</Link></h2>
      </section>

      <article className="main__full main__full--tour">
        <section className="blocked">
          {/* <hr /> */}
          <h2><Link to="/retail/sup">Stand Up Paddleboards (SUPs)</Link></h2>
          <h3 className="condensed">Browse By Feature</h3>
          <PaddleboardFeatureList />
        </section>

        <Composition sport="sup" />
      </article>

      <section className="brand_list">
        <h3>Browse By Brand</h3>
      </section>
      <SupBrandList />

      <section className="deck">
        {sup.nodes.map(sup => (
          <article key={sup.id} className="card">
            <div className="card-collage">
              <TextureBackgrounds />
              <GatsbyImage
                image={sup.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                alt={sup.cutout?.alternativeText}
                className="cutout"
                objectFit="contain"
              />
            </div>
            <h4 className="card__title">
              <Link to={`/retail/${sup.type}/${sup.slug}`}>
                {sup.title}
              </Link>
            </h4>
            <hr />
            <p>{sup.excerpt}</p>
            <hr />
            <div className="card__details">
              <h4 className="capitalize">{sup.type}</h4>
              <h5><Remainder inches={sup.length} /> tall by {sup.width}" wide</h5>
            </div>
          </article>
        ))}
        <h2><Link to="/retail/sup">All Paddleboards</Link></h2>
      </section>

      <Footer />
    </>
  )
}

export default RetailPage

export const Head = () => {
  return (
    <SEO
      title={`Retail | ${useSiteName()}`}
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    />
  )
}

