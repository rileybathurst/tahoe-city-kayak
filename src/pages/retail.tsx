import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import Header from "../components/header";
import Footer from "../components/footer";
import Remainder from "../components/remainder";
import StoreIcon from "../images/store";
import KayakFeatureList from "../components/kayak-feature-list";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";
import TextureBackgrounds from "../components/texturebackgrounds";
import WaterTexture from "../images/watertexture";

import Retail from "../content/retail";

function Kayaker(props) {
  return <StaticImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.jpg"
    alt="tahoe city kayak kayaker"
    className="paddler img__wrapped"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Supper(props) {
  return <StaticImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash-crop.jpg"
    alt="tahoe city kayak paddleboarder"
    className={`${props.className} paddler img__wrapped`}
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

const RetailPage = () => {
  let title = "Retail";

  return (
    <>
      <Header />

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

      <main className="location_card-wrapper">
        <div>
          <h1>{title}</h1>
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
          <h3>Browse By Brand</h3>
          <KayakBrandList />
        </section>

        <section>
          <div className="collage tour-collage">
            <TextureBackgrounds />
            <WaterTexture className="texture card__image" />
            <Kayaker />
          </div>
        </section>

      </article>



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

            <div className="main__full main__full--tour">
              <article>
                {/* <hr /> */}
                <h2><Link to="/retail/sup">Stand Up Paddleboards (SUPs)</Link></h2>
                <section>
                  <h2>Browse By Brand</h2>
                </section>
                <SupBrandList />
              </article>

              <section>
                <div className="collage tour-collage">
                  <TextureBackgrounds />
                  <WaterTexture className="texture card__image" />
                  <Supper />
                </div>
              </section>
            </div>

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

export const Head = () => {
  return (
    <SEO
      title={`Retail${TitleTemplate}`}
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    />
  )
}

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
