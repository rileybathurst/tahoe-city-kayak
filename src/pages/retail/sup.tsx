import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SupBrandList from "../../components/sup-brand-list";
import Store from "../../components/locations/store";
import Retail from "../../content/retail";
import PaddleboardFeatureList from "../../components/paddleboard-feature-list";
import Brand from "../../components/brand";
import OtherBrand from "../../components/other-brand";

const RetailSupPage = () => {

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
            inflatable
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
            inflatable
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
            inflatable
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
            inflatable
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
            inflatable
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
            inflatable
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
  
      pauhana: allStrapiBrand(filter: {name: {eq: "pau hana"}}) {
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

      other: allStrapiBrand(filter: {name: {nin: [ "hobie", "bote", "tahe", "sic", "hala", "boardworks", "pau hana" ] }}) {
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
  let other = query.other;

  let title = "Paddleboard Retail";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent="retail"
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
          <div key={brand.slug} >
            {/* // * wrap this for react keys */}
            <Brand brand={brand} type="sup" />
          </div>
        ))}

        {bote.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}

        {tahe.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}


        {sic.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}

        {hala.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}


        {boardworks.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}

        {pauhana.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} type="sup" />
          </div>
        ))}

        <OtherBrand nodes={other.nodes} type="sup" />

      </div >

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
