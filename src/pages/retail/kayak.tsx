import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import Header from "../../components/header";
import Footer from "../../components/footer";
import KayakBrandList from "../../components/kayak-brand-list"
import KayakFeatureList from "../../components/kayak-feature-list";
import Store from "../../components/locations/store";
import Shop from "../../content/shop";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Brand from "../../components/brand";
import OtherBrand from "../../components/other-brand";

const RetailKayakPage = (data: any) => {
  const query = useStaticQuery(graphql`
    query KayaksQuery {
      hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
        nodes {
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
            inflatable
            brand {
              slug
            }

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

      eddyline: allStrapiBrand(filter: {name: {eq: "eddyline"}}) {
        nodes {
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
          inflatable
          brand {
              slug
            }
            
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

      perception: allStrapiBrand(filter: {name: {eq: "perception"}}) {
        nodes {
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
            inflatable
            brand {
              slug
            }
            
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

      wildernesssystems: allStrapiBrand(filter: {name: {eq: "wilderness systems"}}) {
        nodes {
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
          inflatable
          brand {
              slug
            }
            
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

      delta: allStrapiBrand(filter: {name: {eq: "delta"}}) {
        nodes {
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
            inflatable
            brand {
              slug
            }
            
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
            inflatable
            brand {
              slug
            }
            
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

      brusurf: allStrapiBrand(filter: {name: {eq: "brusurf"}}) {
        nodes {
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
            inflatable
            brand {
              slug
            }
            
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

      other: allStrapiBrand(filter: {name: {nin: [ "hobie", "eddyline", "perception", "wilderness systems", "delta", "bote", "brusurf" ] }}) {
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
            inflatable
            brand {
              slug
            }
            
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
  let eddyline = query.eddyline;
  let perception = query.perception;
  let wildernesssystems = query.wildernesssystems;
  let delta = query.delta;
  let bote = query.bote;
  let brusurf = query.brusurf;
  let other = query.other;

  let title = "Kayak Retail";
  let parent = "retail";

  return (
    <>
      <Header />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
            <Shop />
          </div>

          <div className="location_card">
            <Store />
          </div>
        </div>

        <h2>Browse By Feature</h2>
        <KayakFeatureList />

        <hr />
      </main>

      <section className="passage">
        <h2>Browse By Brand</h2>
      </section>

      <KayakBrandList />

      <div className="brand_blocks">

        {hobie.nodes.map(brand => (
          <div key={brand.slug} >
            {/* // * wrap this for react keys */}
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {eddyline.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {perception.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {wildernesssystems.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {delta.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {bote.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        {brusurf.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="kayak" />
          </div>
        ))}

        <OtherBrand nodes={other.nodes} type="kayak" />

      </div>

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
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
