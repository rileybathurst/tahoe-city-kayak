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
          sport: { slug: { eq: "kayak" } },
          cutout: { id: { ne: null } }
          }
        , limit: 4,
        sort: {featured: ASC}
        ) {
        nodes {
          ...CardRetailFragmentPlusBrand
        }
      }

    kayakBrands: allStrapiBrand(filter: {retail: {elemMatch: {sport: {slug: {eq: "kayak"}}}}}) {
      nodes {
        name
        svg
        slug
        id
      }
    }

    paddleBoard: allStrapiRetail(
      filter: {
        sport: { slug: { eq: "paddleboard" } },
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

  // ! havent finished this
  /*   const getBrands = (nodes: RetailCardTypes[], sport: string): PaddleBrandListTypes[] => {
      return Array.from(
        new Map(
          nodes
            .filter((retail: RetailCardTypes) => retail.sport.slug === sport)
            .map((retail: RetailCardTypes) => [retail.brand.id, retail.brand] as [string, PaddleBrandListTypes])
        ).values()
      ) as PaddleBrandListTypes[];
    }; */

  const sports = [
    {
      slug: "kayak",
      heading: "Kayaks",
      nodes: query.kayak.nodes as RetailCardTypes[]
    },
    {
      slug: "paddleboard",
      heading: "Stand Up Paddle boards (SUPs)",
      nodes: query.paddleBoard.nodes as RetailCardTypes[]
    },
  ];

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
      </main>

      {sports.map((sport) => (
        <section key={sport.slug}>
          <hr className="pelican" />

          <div className="pelican">
            <h2 className='font-serif'>
              <Link to={`/retail/${sport.slug}`}>{sport.heading}</Link>
            </h2>
            {/* // TODO: sport descriptions */}
            <h3 className="condensed">Browse By Feature</h3>
            <FeatureList sport={sport.slug} />

            <h3>Browse By Brand</h3>
            {/* // ! this doesnt work with the base query due to the limit */}
            <PaddleBrandList brands={query.kayakBrands.nodes} sport={sport.slug} />
          </div>

          <section key={`${sport.slug}-cards`}>
            <section className="deck">
              {sport.nodes.map((retail: RetailCardTypes) => (
                <PaddleCard
                  key={retail.id}
                  {...retail}
                  link={`/retail/${sport.slug}/${retail.brand.slug}/${retail.slug}`}
                />
              ))}
            </section>

            <h2 className="pelican">
              <Link to={`/retail/${sport.slug}`}>All {sport.heading}</Link>
            </h2>
          </section>
        </section>
      ))}


      <div className="pelican panel">
        <h3 className="aconcagua font-serif">
          <Link to="/retail/demos">Demos</Link>
        </h3>
        <Markdown>{query.strapiDemo.text.data.text}</Markdown>
      </div>

      <Footer />
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
