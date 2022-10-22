import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Seo from "../components/seo";
import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";
import Store from "../components/locations/store";
import WaterTexture from "../images/watertexture";

import Demos from "../content/demos";

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

// TODO move this to its own file
function Danger(props) {
  const svg = (props.svg)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function KayakDemoBrands(props) {
  // console.log(props.brand);// brand={data.kayak.edges.map(brand => (brand.node.brand))}

  // TODO I cant bring through more than one piece of info
  const KayakSetNames = new Set();
  props.brand.forEach(brand => {
    KayakSetNames.add(brand.name);
  });

  console.log(KayakSetNames);

  return (
    <>
      {[...KayakSetNames].map(brand => (
        <li key={brand} className="capitalize">
          {/* <Danger svg={brand.svg} /> */}
          {brand}
        </li>
      ))}
    </>
  )
}

function SupDemoBrands(props) {
  const SupSetNames = new Set();
  props.brand.forEach(brand => {
    SupSetNames.add(brand.name);
  });
  return (
    <>
      {[...SupSetNames].map(brand => (
        <li key={brand} className="capitalize">
          {/* <Danger svg={brand.svg} /> */}
          {brand}
        </li>
      ))}
    </>
  )
}

const DemosPage = () => {
  let title = "Demos";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
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
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
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
              <div className="sand_backed--wide baseline-spacing">
                <article className="main__full main__full--tour ">
                  <div>
                    <h3>Demos</h3>
                    <hr />
                    <h4>Kayaks from these brands</h4>
                    {/* // TODO add brands here */}
                    <ul>
                      <KayakDemoBrands
                        brand={data.kayak.edges.map(brand => (brand.node.brand))}
                      />
                    </ul>

                  </div>

                  <section>
                    <div className="collage tour-collage">
                      <TextureBackgrounds />
                      <WaterTexture className="texture card__image" />
                      <Kayaker />
                    </div>
                  </section>

                </article>

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
              </div>

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
        }
      }
    }
  }
}
`