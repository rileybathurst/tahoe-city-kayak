import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
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

// TODO these need to be image components
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

function TopTwo() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leem-50bzI1F6urA-unsplash.jpg"
    alt="forrest texture"
    className="texture-slice crop"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

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
        <Link to={`/retail/${props.type}/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.length} /> long by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

function KayakDemoBrands(props) {
  // console.log(props.brand);// brand={data.kayak.edges.map(brand => (brand.node.brand))}
  const dedupedbrands = getUniqueListBy(props.brand, 'name')
  console.log(dedupedbrands)

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

      {
        <StaticQuery
          query={query}
          render={data => (
            <>
              <section className="demo__kayak">
                <div className="demo__kayak--header">
                  <div>
                    <h3>Demos</h3>
                    <hr />
                    <h4>Kayaks from these brands</h4>
                    <ul>
                      <KayakDemoBrands
                        brand={data.kayak.edges.map(brand => (brand.node.brand))}
                      />
                    </ul>

                  </div>

                  <section>
                    <div className="collage tour-collage">
                      {/* <TextureBackgrounds /> */}
                      <TopTwo />
                      <WaterTexture className="texture card__image" />
                      <Kayaker />
                    </div>
                  </section>

                </div>

                <section className="deck">
                  {
                    data.kayak.edges.map(retail => (
                      <Card
                        id={retail.node.id}
                        slug={retail.node.slug}
                        title={retail.node.title}
                        capacity={retail.node.capacity}
                        length={retail.node.length}
                        width={retail.node.width}
                        excerpt={retail.node.excerpt}
                        cutout={retail.node?.cutout}
                        type={retail.node.type}
                      />
                    ))
                  }
                </section>
              </section>

              <article className="main__full main__full--tour baseline-spacing">
                <div>
                  <h4>Paddleboards from these brands</h4>

                  <ul>
                    <SupDemoBrands
                      brand={data.paddleboards.edges.map(brand => (brand.node.brand))}
                    />
                  </ul>
                </div>

                <section>
                  <div className="collage tour-collage">
                    <TextureBackgrounds />
                    <WaterTexture className="texture card__image" />
                    <Supper />
                  </div>
                </section>
              </article>

              <section className="deck">
                {
                  data.paddleboards.edges.map(retail => (
                    <Card
                      id={retail.node.id}
                      slug={retail.node.slug}
                      title={retail.node.title}
                      capacity={retail.node.capacity}
                      length={retail.node.length}
                      width={retail.node.width}
                      excerpt={retail.node.excerpt}
                      cutout={retail.node?.cutout}
                      type={retail.node.type}
                    />
                  ))
                }
              </section>
            </>
          )}
        />
      }
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

const query = graphql`
query DemosQuery {
  kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}) {
    edges {
      node {
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
  
  paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}) {
    edges {
      node {
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
}
`
