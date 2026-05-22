// TODO: loop this

import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { SEO } from "../components/seo";

import { PaddleCard, PaddleBrandList, type PaddleBrandListTypes } from "@rileybathurst/paddle";

import Header from "../components/header";
import Footer from "../components/footer";
import FeatureList from "../components/feature-list";
import Shop from "../content/shop";

import Locales from "../components/locales";

import Markdown from "react-markdown";

import type { RetailCardTypes } from "../types/retail-card-types";
import Hero from "../components/hero";

const RetailPage = () => {
  const query = useStaticQuery(graphql`
    query RetailsQuery {
      kayak: allStrapiRetail(
        filter: {
          type: {eq: "kayak"},
          cutout: { id: { ne: null } }
          }
        , limit: 4,
        sort: {featured: ASC}
        ) {
        nodes {
          ...CardRetailFragmentPlusBrand
        }
      }

    paddleBoard: allStrapiRetail(
      filter: {
        type: {eq: "sup"},
        cutout: { id: { ne: null } }
      }
      , limit: 4,
      sort: {featured: ASC}
      ) {
      nodes {
        ...CardRetailFragmentPlusBrand
      }
    }

    strapiDemo {
      text {
        data {
          text
        }
      }
    }

    strapiLocation(
      name: {eq: "Retail Location"}
      branch: {slug: {eq: "tahoe-city"}}
    ) {
      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

  }
`);

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={query.strapiLocation.hero}
        overlay={<Locales
          retail={true}
        />}
      />

      <main className="pelican">
        <h1>Retail</h1>

        <Shop />
        <hr />

        <h2>
          <Link to="/retail/kayak">Kayaks</Link>
        </h2>
        <h3 className="condensed">Browse By Feature</h3>
        <FeatureList sport="kayak" />

        <h3>Browse By Brand</h3>
        <PaddleBrandList
          brands={Array.from(
            new Map(query.kayak.nodes
              .filter((retail: RetailCardTypes) => retail.sport.slug === "kayak")
              .map((retail: RetailCardTypes) => [retail.brand.id, retail.brand] as [string, PaddleBrandListTypes]))
              .values()
          ) as PaddleBrandListTypes[]}
          sport="kayak"
        />
      </main>

      <section className="deck">
        {query.kayak.nodes.map((kayak: RetailCardTypes) => (
          <PaddleCard
            key={kayak.id}
            {...kayak}
            link={`/retail/kayak/${kayak.brand.slug}/${kayak.slug}`}
          // breadcrumb="kayak"
          />
        ))}

      </section>

      <section className="pelican">
        <h2>
          <Link to="/retail/kayak">All Kayaks</Link>
        </h2>


        <hr />

        <h2>
          <Link to="/retail/paddleboard">Stand Up Paddle boards (SUPs)</Link>
        </h2>
        <h3 className="condensed">Browse By Feature</h3>
        <FeatureList sport="paddleboard" />
        <h3>Browse By Brand</h3>
        <PaddleBrandList
          brands={Array.from(
            new Map(query.paddleBoard.nodes
              .filter((retail: RetailCardTypes) => retail.sport.slug === "paddleboard")
              .map((retail: RetailCardTypes) => [retail.brand.id, retail.brand] as [string, PaddleBrandListTypes]))
              .values()
          ) as PaddleBrandListTypes[]}
          sport="paddleboard"
        />
      </section>

      <section className="deck">
        {query.paddleBoard.nodes.map((sup: RetailCardTypes) => (
          <PaddleCard
            key={sup.id}
            {...sup}
            link={`/retail/paddleboard/${sup.brand.slug}/${sup.slug}`}
          />
        ))}
      </section>

      <h2 className="pelican">
        <Link to="/retail/paddleboard">All Paddle boards</Link>
      </h2>

      <div className="pelican">
        <hr />
        <h3 className="aconcagua">
          <Link to="/retail/demos">Demos</Link>
        </h3>
        <Markdown>{query.strapiDemo.text.data.text}</Markdown>
      </div>

      <Footer topHR />
    </React.Fragment>
  );
};

export default RetailPage;

// TODO: query
export const Head = () => {
  return (
    <SEO
      title="Retail"
      description="Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, retailing, and sales for over 17 years."
    />
  );
};
