import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
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

  console.log(sups);
  sups.slice(0, 4).map((retail => {
    console.log(retail.title);

    quad.push(retail);
  }));

  console.log(quad);

  // get this out enough to return it?


  // putting this here lets its be a return at the lowest level which I need
  return (
    <Card sups={quad} />
  )
}

const RetailSupPage = (data) => {
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

      <StaticQuery
        query={query}
        render={data => (

          <div className="brand_blocks">

            {data.hobie.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

            {data.bote.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.map(retail => (
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

                <Limiter brand={brand.node.retail} />

                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

            {data.tahe.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.slice(0, 4).map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

            {data.sic.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.slice(0, 4).map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

            {data.hala.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.slice(0, 4).map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}


            {data.boardworks.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.slice(0, 4).map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

            {data.pauhana.edges.map(brand => (
              <div>
                <section>
                  <div className='brand-logo'>
                    <Danger svg={brand.node.svg} />
                    <h2 className='capitalize'>
                      <Link to={brand.node.slug}>
                        {brand.node.name}
                      </Link>
                    </h2>
                  </div>
                  <p>{brand.node.tagline}.</p>
                  <hr />
                </section>
                {/* <div className='deck'>
                  {brand.node.retail.slice(0, 4).map(retail => (
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
                <Limiter brand={brand.node.retail} />
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                  type='sup'
                />
              </div>
            ))}

          </div>
        )}
      />

      <Footer />
    </>
  )
}

export default RetailSupPage

export const Head = () => {
  return (
    <SEO
      title={`Standup Paddleboard | ${useSiteName()}`}
    // TODO description and image
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

const query = graphql`
query SupQuery {
  hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
    edges {
      node {
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

  bote: allStrapiBrand(filter: {name: {eq: "bote"}}) {
    edges {
      node {
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
  
  tahe: allStrapiBrand(filter: {name: {eq: "tahe"}}) {
    edges {
      node {
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
  
  sic: allStrapiBrand(filter: {name: {eq: "sic"}}) {
    edges {
      node {
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
  
  hala: allStrapiBrand(filter: {name: {eq: "hala"}}) {
    edges {
      node {
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
  
  boardworks: allStrapiBrand(filter: {name: {eq: "boardworks"}}) {
    edges {
      node {
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
  
  pauhana: allStrapiBrand(filter: {name: {eq: "pauhana"}}) {
    edges {
      node {
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


}
`