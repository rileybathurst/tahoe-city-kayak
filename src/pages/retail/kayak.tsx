import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";
import TextureBackgrounds from "../../components/texturebackgrounds";
import Remainder from "../../components/remainder";
import MapStore from "../../components/map-store";
import Danger from "../../components/danger";
import KayakBrandList from "../../components/kayak-brand-list"

function Card(props) {
  if (props.type === 'kayak') {
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
          <Link to={`/retail/kayak/${props.slug}`}>
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
  } else {
    return null;
  }
}

function More(props) {
  // console.log(props.retail.length);
  let length = props.retail.length;

  if (length > 4) {
    return (
      <section>
        <h3 className='capitalize'>
          <Link to={props.slug}>
            All {props.brand} kayaks
          </Link>
        </h3>
        <hr />
      </section>
    )
  } else {
    // console.log('less');
    return null;
  }
}

const RetailKayakPage = (data) => {
  let title = "Kayak Retail";
  let parent = "retail";

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
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to={`/${parent}`} itemProp="item">
            <span itemProp="name">{parent}</span>
            <meta itemProp="position" content="2" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
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

        <p>Retail and Reservations<br />
          {/* // TODO: single update */}
          Open 7 days a week 9:00am&ndash;6:00pm</p>

        <p>Located at
          <address>
            <MapStore>
              521 N Lake Blvd<br />
              Tahoe City,<br />
              CA 96145
            </MapStore>
          </address>
        </p>
        <hr />

        <KayakBrandList />
      </main>

      <StaticQuery
        query={query}
        render={data => (

          <>

            {data.hobie.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

            {data.eddyline.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

            {data.perception.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

            {data.wildernesssystems.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

            {data.delta.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}


            {/* // TODO: // this is where I need to get rid of the sups */}
            {data.bote.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

            {data.brusurf.edges.map(brand => (
              <>
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
                <div className='deck'>
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
                </div>
                {/* // TODO: this needs an if more than 4 */}
                <More
                  retail={brand.node.retail}
                  brand={brand.node.name}
                  slug={brand.node.slug}
                />
              </>
            ))}

          </>
        )}
      />

      <Footer />
    </>
  )
}

export default RetailKayakPage

const query = graphql`
query KayaksQuery {
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

  eddyline: allStrapiBrand(filter: {name: {eq: "eddyline"}}) {
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
  
  perception: allStrapiBrand(filter: {name: {eq: "perception"}}) {
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
  
  wildernesssystems: allStrapiBrand(filter: {name: {eq: "wilderness-systems"}}) {
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
  
  delta: allStrapiBrand(filter: {name: {eq: "delta"}}) {
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
  
  brusurf: allStrapiBrand(filter: {name: {eq: "brusurf"}}) {
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