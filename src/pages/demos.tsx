import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";
import Store from "../components/locations/store";
import WaterTexture from "../images/watertexture";
import Danger from "../components/danger";
import Demos from "../content/demos";

import { useStrapiKayaker } from "../hooks/use-strapi-kayaker";
import { useStrapiSupper } from "../hooks/use-strapi-supper";

function Kayaker(props) {

  const { title, image } = useStrapiKayaker()

  return <GatsbyImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.webp"
    image={image.localFile.childImageSharp.gatsbyImageData}
    alt={title}
    className="paddler img__wrapped"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Supper(props) {

  const { title, image } = useStrapiSupper()

  return <GatsbyImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash.webp"
    image={image.localFile.childImageSharp.gatsbyImageData}
    alt={title}
    className={`${props.className} paddler img__wrapped`}
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Deck(props) {

  // console.log(props.retail);

  const cards = props.retail.map(card => (
    <article
      key={card.id}
      className="card"
    >
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={card.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={card.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${card.type}/${card.slug}`}>
          {card.title}
        </Link>
      </h4>
      <hr />
      <p>{card.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={card.length} /> long by {card.width}" wide</h4>
        <h5 className="capitalize">Capacity {card.capacity}lbs</h5>
      </div>
    </article>
  ))

  return (
    <section className="deck">
      {cards}
    </section>
  )
}

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

function KayakDemoBrands(props) {
  // console.log(props.brand);// brand={kayak.nodes.map(brand => (brand.brand))}
  const dedupedbrands = getUniqueListBy(props.brand, 'name')

  // console.log(dedupedbrands)

  return (
    <>
      {dedupedbrands.map(brand => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/kayak/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  )
}

function SupDemoBrands(props) {
  const dedupedbrands = getUniqueListBy(props.brand, 'name')

  return (
    <>
      {dedupedbrands.map(brand => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/sup/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  )
}

const DemosPage = () => {

  const query = useStaticQuery(graphql`
    query DemosQuery {
      kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type

          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }

          brand {
            name
            slug
          }
        }
      }
  
      paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type

          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }

          brand {
            name
            slug
          }
        }
      }
    }
  `)

  let kayak = query.kayak;
  let paddleboards = query.paddleboards;

  return (
    <>
      <Header />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>Demos</h1>
            <Demos />
            <p>Phone:&nbsp;
              <a href="phone:(530) 581-4336" rel="norel norefferer" className="book-now">
                (530) 581-4336
              </a>
            </p>
          </div>

          <div className="location_card">
            <Store />
          </div>
        </div>

        <PricingChart />
        <hr />
      </main>


      <section className="demo__kayak">
        <div className="demo__kayak--header">
          <div>
            <h3>Demos</h3>
            <hr />
            <h4>Kayaks from these brands</h4>
            <ul>
              <KayakDemoBrands
                brand={kayak.nodes.map(brand => (brand.brand))}
              />
            </ul>

          </div>

          <section>
            <div className="collage composition">
              {/* <TopTwo /> // ! fix */}
              <WaterTexture className="texture card__image" />
              <Kayaker />
            </div>
          </section>

        </div>


        <Deck retail={kayak.nodes} />

      </section>

      <article className="main__full main__full--tour baseline-spacing">
        <div>
          <h4>Paddleboards from these brands</h4>

          <ul>
            <SupDemoBrands
              brand={paddleboards.nodes.map(brand => (brand.brand))}
            />
          </ul>
        </div>

        <section>
          <div className="collage composition">
            <WaterTexture className="texture card__image" />
            <Supper />
          </div>
        </section>
      </article>

      <Deck retail={paddleboards.nodes} />

      <Footer />
    </>
  )
}

export default DemosPage

export const Head = () => {
  return (
    <SEO
      title={`Demos | ${useSiteName()}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
    />
  )
}

