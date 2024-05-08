import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';

import Header from "../components/header";
import Footer from "../components/footer";
import KayakFeatureList from "../components/kayak-feature-list";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";
import PaddleboardFeatureList from "../components/paddleboard-feature-list";
import Card from "../components/card";
// import Store from "../components/locations/store";
import Composition from "../components/composition";
import Shop from "../content/shop";

import SEOShowcase from "seo-showcase"
import SEOcase from "../components/seocase"
import { CardType } from "../types/card";
import LocationCard from "../components/location-card";

const RetailPage = () => {
  const query = useStaticQuery(graphql`
    query RetailsQuery {
      kayak: allStrapiRetail(filter: {type: {eq: "kayak"}}, limit: 4, sort: {featured: ASC}) {
        nodes {
          ...retailCard
        }
      }

    sup: allStrapiRetail(filter: {type: {eq: "sup"}}, limit: 4, sort: {featured: ASC}) {
      nodes {
      ...retailCard
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

  return (
    <>

      <Header />

      <main className="location_card-wrapper">
        <div>
          <h1>Retail</h1>
          <Shop />
          <h3><Link to="/retail/demos">Demos</Link></h3>
        </div>

        <LocationCard location={query.strapiLocation} />
      </main>

      <article className="main__full main__full--tour">
        <section className="blocked">
          <h2><Link to="/retail/kayak">Kayaks</Link></h2>
          <h3 className="condensed">Browse By Feature</h3>
          <KayakFeatureList />
        </section>

        <Composition sport="kayak" />

      </article>

      <section className="brand_list">
        <h3>Browse By Brand</h3>
      </section>
      <KayakBrandList />

      <section className="deck">
        {query.kayak.nodes.map((kayak: CardType) => (
          <div key={kayak.id}>
            <Card retail={kayak} />
          </div>
        ))}

        <h2><Link to="/retail/kayak">All Kayaks</Link></h2>
      </section>

      <article className="main__full main__full--tour">
        <section className="blocked">
          {/* <hr /> */}
          <h2><Link to="/retail/sup">Stand Up Paddleboards (SUPs)</Link></h2>
          <h3 className="condensed">Browse By Feature</h3>
          <PaddleboardFeatureList />
        </section>

        <Composition sport="sup" />
      </article>

      <section className="brand_list">
        <h3>Browse By Brand</h3>
      </section>
      <SupBrandList />

      <section className="deck">
        {query.sup.nodes.map((sup: CardType) => (
          <div key={sup.id}>
            <Card retail={sup} />
          </div>
        ))}
        <h2><Link to="/retail/sup">All Paddleboards</Link></h2>
      </section>

      <Footer />

      {/* <SEOShowcase test="this" /> */}
      <SEOcase
        title={`Retail | ${useSiteMetadata().title}`}
        description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."

      />
    </>
  )
}

export default RetailPage

export const Head = () => {
  return (
    <SEO
      title={`Retail | ${useSiteMetadata().title}`}
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    />
  )
}

