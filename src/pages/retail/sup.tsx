import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SupBrandList from "../../components/sup-brand-list";
import LocationCard from "../../components/location-card";
import Shop from "../../content/shop";
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
          }
        }
      }

      strapiLocation: strapiLocation(
        locale: {slug: {eq: "tahoe-city"}}
        name: {eq: "Retail Location"}
      ) {
        ...locationCard
      }

    }
  `)

  let other = query.other;

  let brands = [
    query.hobie,
    query.bote,
    query.tahe,
    query.sic,
    query.hala,
    query.boardworks,
    query.pauhana
  ]

  let title = "Paddleboard Retail";

  return (
    <>
      <Header />

      <main>
        <div className="albatross wrap">
          <div>
            <h1>{title}</h1>
            <Shop />
          </div>
          <LocationCard
            location={query.strapiLocation}
            background={false}
          />
        </div>

        <h2>Browse By Feature</h2>
        <PaddleboardFeatureList />

        <hr />
        <h2>Browse By Brand</h2>
      </main>
      <SupBrandList />

      <div className="brand_blocks">

        {brands.map(brand => (
          <div key={brand.nodes[0].slug}>
            <Brand brand={brand.nodes[0]} type="sup" />
          </div>
        ))}

        <OtherBrand nodes={other.nodes} type="sup" />

      </div >

      <ParentTitleBreadcrumb
        parent="retail"
        title={title}
      />

      <Footer />
    </>
  )
}

export default RetailSupPage

export const Head = () => {
  return (
    <SEO
      title={`Standup Paddleboard | ${useSiteMetadata().title}`}
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
            "item": "${useSiteMetadata().url}/retail"
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
