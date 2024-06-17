// TODO: I can be smart enough to combine this with sup

import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Header from "../../components/header";
import Footer from "../../components/footer";
import KayakBrandList from "../../components/kayak-brand-list"
import KayakFeatureList from "../../components/kayak-feature-list";
import LocationCard from "../../components/location-card";
import Shop from "../../content/shop";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Brand from "../../components/brand";
import OtherBrand from "../../components/other-brand";

const RetailKayakPage = (data) => {

  const query = useStaticQuery(graphql`
    query KayaksQuery {
      hobie: strapiBrand(name: {eq: "hobie"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }

      eddyline: strapiBrand(name: {eq: "eddyline"}) {
        ...retailBrand
      retail {
          ...retailCard
        }
      }

      perception: strapiBrand(name: {eq: "perception"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }

      wildernesssystems: strapiBrand(name: {eq: "wilderness systems"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }

      delta: strapiBrand(name: {eq: "delta"}) {
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

      brusurf: strapiBrand(name: {eq: "brusurf"}) {
        ...retailBrand
        retail {
          ...retailCard
        }
      }

      other: allStrapiBrand(filter: {name: {nin: [ "hobie", "eddyline", "perception", "wilderness systems", "delta", "bote", "brusurf" ] }}) {
        nodes {
          ...retailBrand

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
    query.eddyline,
    query.perception,
    query.wildernesssystems,
    query.delta,
    query.bote,
    query.brusurf
  ]

  const title = "Kayak Retail";
  const parent = "retail";

  return (
    <>
      <Header />

      <main className="condor">
        <h1>Kayak Retail</h1>

        <Shop />

        <LocationCard location={query.strapiLocation} />

        <hr />

        <h2>Browse By Feature</h2>

        {/* // ? should we if by the sport on the location like a 404? or be passing down the query? */}
        <KayakFeatureList />

        <hr />
      </main >

      <section className="passage">
        <h2>Browse By Brand</h2>
      </section>

      <KayakBrandList />

      <div className="brand_blocks">

        {brands.map(brand => (
          <Brand
            key={brand.id}
            type="kayak"
            svg={brand.svg}
            slug={brand.slug}
            name={brand.name}
            tagline={brand.tagline}
            retail={brand.retail}
          />
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
      title={`Kayak | ${useSiteMetadata().title}`}
      // TODO: query the description
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
            "item": "${useSiteMetadata().url}/retail"
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
