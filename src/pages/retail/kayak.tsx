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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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
            ...retailCard
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

  let hobie = query.hobie;
  let eddyline = query.eddyline;
  let perception = query.perception;
  let wildernesssystems = query.wildernesssystems;
  let delta = query.delta;
  let bote = query.bote;
  let brusurf = query.brusurf;
  let other = query.other;

  let brands = [
    hobie,
    eddyline,
    perception,
    wildernesssystems,
    delta,
    bote,
    brusurf
  ]

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

          <LocationCard location={query.strapiLocation} />
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

        {brands.map(brand => (
          <div key={brand.nodes[0].slug}>
            <Brand brand={brand.nodes[0]} type="kayak" />
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
      title={`Kayak | ${useSiteMetadata().title}`}
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
