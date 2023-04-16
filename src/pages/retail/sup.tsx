import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";
import More from "../../components/more";
import TextureBackgrounds from "../../components/texturebackgrounds";
import Remainder from "../../components/remainder";
import Danger from "../../components/danger";
import SupBrandList from "../../components/sup-brand-list";
import Store from "../../components/locations/store";
import Retail from "../../content/retail";
import PaddleboardFeatureList from "../../components/paddleboard-feature-list";

function Card(props) {

  return (
    <div className='deck'>
      {props.sups.map(retail => (
        <article key={retail.id} className="card">
          <div className="card-collage">
            <TextureBackgrounds />
            <GatsbyImage
              image={retail.cutout?.localFile?.childImageSharp?.gatsbyImageData}
              alt={retail?.cutout?.alternativeText}
              className="cutout"
            />
          </div>
          <h4 className="card__title">
            <Link to={`/retail/sup/${retail.slug}`}>
              {retail.title}
            </Link>
          </h4>
          <hr />
          <p>{retail.excerpt}</p>
          <hr />
          <div className="card__details">
            <h4><Remainder inches={retail.length} /> tall by {retail.width}" wide</h4>
            <h5 className="capitalize">Capacity {retail.capacity}lbs</h5>
          </div>
        </article>
      ))}
    </div>
  )
}

function Limiter(props) {
  // console.log(props);
  // console.log(props.brand);
  // console.log(props.brand.map(retail) => retail.brand);

  const sups = [];
  const quad = [];

  props.brand.map((retail => {
    if (retail.type === 'sup') {

      // create an array and add the things here
      // then do the card thing
      // console.log(retail.title);
      sups.push(retail);
    }
  }));

  // console.log(sups);
  sups.slice(0, 4).map((retail => {
    // console.log(retail.title);

    quad.push(retail);
  }));

  // console.log(quad);

  // get this out enough to return it?


  // putting this here lets its be a return at the lowest level which I need
  return (
    <Card sups={quad} />
  )
}

const RetailSupPage = (data) => {

  const query = useStaticQuery(graphql`
query SupQuery {
  hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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

  bote: allStrapiBrand(filter: {name: {eq: "bote"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
  
  tahe: allStrapiBrand(filter: {name: {eq: "tahe"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
  
  sic: allStrapiBrand(filter: {name: {eq: "sic"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
  
  hala: allStrapiBrand(filter: {name: {eq: "hala"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
  
  boardworks: allStrapiBrand(filter: {name: {eq: "boardworks"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
  
  pauhana: allStrapiBrand(filter: {name: {eq: "pauhana"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
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
`)

  let hobie = query.hobie;
  let bote = query.bote;
  let tahe = query.tahe;
  let sic = query.sic;
  let hala = query.hala;
  let boardworks = query.boardworks;
  let pauhana = query.pauhana;

  let title = "Paddleboard Retail";
  let parent = "retail";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
            <Retail />
          </div>
          <div className="location_card">
            <Store />

          </div>
        </div>

        <h2>Browse By Feature</h2>
        <PaddleboardFeatureList />

        <hr />
        <h2>Browse By Brand</h2>
      </main>
      <SupBrandList />

      <div className="brand_blocks">

        {hobie.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

        {bote.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.map(retail => (
                    <>

                      <Card
                        type={retail.type}
                        id={retail.id}
                        slug={retail.slug}
                        title={retail.title}
                        capacity={retail.capacity}
                        length={retail.length}
                        width={retail.width}
                        excerpt={retail.excerpt}
                        cutout={retail?.cutout}
                      />
                    </>
                  ))}
                </div> */}

            <Limiter brand={brand.retail} />

            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

        {tahe.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.slice(0, 4).map(retail => (
                    <Card
                      type={retail.type}
                      id={retail.id}
                      slug={retail.slug}
                      title={retail.title}
                      capacity={retail.capacity}
                      length={retail.length}
                      width={retail.width}
                      excerpt={retail.excerpt}
                      cutout={retail?.cutout}
                    />
                  ))}
                </div> */}
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

        {sic.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.slice(0, 4).map(retail => (
                    <Card
                      type={retail.type}
                      id={retail.id}
                      slug={retail.slug}
                      title={retail.title}
                      capacity={retail.capacity}
                      length={retail.length}
                      width={retail.width}
                      excerpt={retail.excerpt}
                      cutout={retail?.cutout}
                    />
                  ))}
                </div> */}
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

        {hala.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.slice(0, 4).map(retail => (
                    <Card
                      type={retail.type}
                      id={retail.id}
                      slug={retail.slug}
                      title={retail.title}
                      capacity={retail.capacity}
                      length={retail.length}
                      width={retail.width}
                      excerpt={retail.excerpt}
                      cutout={retail?.cutout}
                    />
                  ))}
                </div> */}
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}


        {boardworks.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.slice(0, 4).map(retail => (
                    <Card
                      type={retail.type}
                      id={retail.id}
                      slug={retail.slug}
                      title={retail.title}
                      capacity={retail.capacity}
                      length={retail.length}
                      width={retail.width}
                      excerpt={retail.excerpt}
                      cutout={retail?.cutout}
                    />
                  ))}
                </div> */}
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

        {pauhana.nodes.map(brand => (
          <div>
            <section className="passage">
              <div className='brand-logo'>
                <Danger svg={brand.svg} />
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
              </div>
              <p>{brand.tagline}.</p>
              <hr />
            </section>
            {/* <div className='deck'>
                  {brand.retail.slice(0, 4).map(retail => (
                    <Card
                      type={retail.type}
                      id={retail.id}
                      slug={retail.slug}
                      title={retail.title}
                      capacity={retail.capacity}
                      length={retail.length}
                      width={retail.width}
                      excerpt={retail.excerpt}
                      cutout={retail?.cutout}
                    />
                  ))}
                </div> */}
            <Limiter brand={brand.retail} />
            <More
              retail={brand.retail}
              brand={brand.name}
              slug={brand.slug}
              type='sup'
            />
          </div>
        ))}

      </div>

      <Footer />
    </>
  )
}

export default RetailSupPage

export const Head = () => {
  return (
    <SEO
      title={`Standup Paddleboard | ${useSiteName()}`}
      description="Shop Tahoe City Kayak and Paddleboards’s selection of stand up paddleboards for sale! Our paddleboards are perfect for those looking for a fun and exciting way to explore Lake Tahoe’s crystal clear waters. Our selection includes leading brands of standup paddleboards for sale. The beach is just outside our back door, so you can walk your purchase right out to the sand and launch into the lake for a day’s journey."
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Retail",
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Standup Paddleboard",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}
