import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import Header from "../../components/header";
import Footer from "../../components/footer";
import TextureBackgrounds from "../../components/texturebackgrounds";
import Remainder from "../../components/remainder";
import Danger from "../../components/danger";
import KayakBrandList from "../../components/kayak-brand-list"
import KayakFeatureList from "../../components/kayak-feature-list";
import Store from "../../components/locations/store";
import More from "../../components/more";
import Retail from "../../content/retail";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";

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
          <h4><strong><Remainder inches={props.length} /></strong> long by <strong>{props.width}"</strong> wide</h4>
          <h5 className="capitalize">Capacity <strong>{props.capacity}lbs</strong></h5>
        </div>
      </article>
    )
  } else {
    return null;
  }
}

const RetailKayakPage = (data) => {
  let title = "Kayak Retail";
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
        <KayakFeatureList />

        <hr />
      </main>

      <section className="pelican-inline">
        <h2>Browse By Brand</h2>
      </section>

      <KayakBrandList />

      <StaticQuery
        query={query}
        render={data => (
          <div className="brand_blocks">

            {data.hobie.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}

            {data.eddyline.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}

            {data.perception.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}

            {data.wildernesssystems.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}

            {data.delta.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}


            {data.bote.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
                />
              </div>
            ))}

            {data.brusurf.edges.map(brand => (
              <div key={brand.node.id}>
                <section className="pelican-inline">
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
                      key={retail.id}
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
                  type="kayak"
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

export default RetailKayakPage

export const Head = () => {
  return (
    <SEO
      title={`Kayak | ${useSiteName()}`}
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    // TODO Image
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
            "name": "Kayaks",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}

const query = graphql`
      query KayaksQuery {
        hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
        edges {
        node {
        id
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
        id
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
        id
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
        id
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
        id
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

      bote: allStrapiBrand(
      filter: {name: {eq: "bote"}, kayak: {eq: true}}
      ) {
        edges {
        node {
        id
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
        id
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