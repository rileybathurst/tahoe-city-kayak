// TODO: rename this witha redirect to paddleboard

import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';

// Paddle
import { PaddleLocationCard } from "@rileybathurst/paddle";

import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SupBrandList from "../../components/sup-brand-list";
import Shop from "../../content/shop";
import PaddleboardFeatureList from "../../components/paddleboard-feature-list";
import Brand from "../../components/brand";
import OtherBrand from "../../components/other-brand";

const RetailSupPage = () => {

  const query = useStaticQuery(graphql`
    query SupQuery {
      hobie: strapiBrand(name: {eq: "hobie"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }

      bote: strapiBrand(name: {eq: "bote"}) {
        ...retailBrand
          retail {
            ...retailCard
          }
      }
  
      tahe: strapiBrand(name: {eq: "tahe"}) {
        ...retailBrand
          retail {
            ...retailCard
          }

      }

      sic: strapiBrand(name: {eq: "sic"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }
  
      hala: strapiBrand(name: {eq: "hala"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }
  
      boardworks: strapiBrand(name: {eq: "boardworks"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }
  
      pauhana: strapiBrand(name: {eq: "pau hana"}) {
        ...retailBrand
        retail {
          ...retailCard
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

      strapiLocation(
        locale: {slug: {eq: "tahoe-city"}}
        name: {eq: "Retail Location"}
      ) {
        ...locationCard
      }

    }
  `)

  const other = query.other;

  const brands = [
    query.hobie,
    query.bote,
    query.tahe,
    query.sic,
    query.hala,
    query.boardworks,
    query.pauhana
  ]

  const title = "Paddleboard Retail";

  return (
    <>
      <Header />

      <main className="condor">
        <h1>Paddleboard Retail</h1>
        <Shop />
        <PaddleLocationCard
          {...query.strapiLocation}
          background={false}
        />

        <h2>Browse By Feature</h2>
        <PaddleboardFeatureList />

        <hr />
        <h2>Browse By Brand</h2>
      </main>
      <SupBrandList />

      <div className="brand_blocks">

        {brands.map(brand => (
          <Brand
            key={brand.id}
            type="sup"
            svg={brand.svg}
            slug={brand.slug}
            name={brand.name}
            tagline={brand.tagline}
            retail={brand.retail}
          />
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
