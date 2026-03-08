// TODO: loop this

import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import FeatureList from "../components/feature-list";
import Composition from "../components/composition";
import Shop from "../content/shop";

import Purchase from "../components/purchase";
import LocationDeck from "../components/location-deck";

import Markdown from "react-markdown";

import  { PaddleBrandList, type PaddlePurchaseTypes } from "@rileybathurst/paddle";

const RetailPage = () => {
  const query = useStaticQuery(graphql`
    query RetailsQuery {
      kayak: allStrapiRetail(filter: {type: {eq: "kayak"}}, limit: 4, sort: {featured: ASC}) {
        nodes {
          ...brandedFragment
        }
      }

    paddleBoard: allStrapiRetail(filter: {type: {eq: "sup"}}, limit: 4, sort: {featured: ASC}) {
      nodes {
        ...brandedFragment
      }
    }

    allStrapiLocation(
      filter: {
        name: {eq: "Retail Location"}
        local: {slug: {eq: "tahoe-city"}}
      }
    ) {
      nodes {
        ...locationCardFragment
      }
    }

    strapiDemo {
        text {
          data {
            text
          }
        }
      }

  }
`);

  return (
    <>
      <Header />

      <main className="albatross wrap">
        <div>
          <h1>Retail</h1>
          <Shop />

          <LocationDeck
            allStrapiLocation={{ ...query.allStrapiLocation }}
          />

          <article className="pelican wrap">
            <section className="blocked">
              <h2>
                <Link to="/retail/kayak">Kayaks</Link>
              </h2>
              <h3 className="condensed">Browse By Feature</h3>
              <FeatureList sport="kayak" />
            </section>
          </article >

          <section className="albatross">
            <h3>Browse By Brand</h3>
            <PaddleBrandList
              nodes={Array.from(
                new Map(query.kayak.nodes
                  .filter((retail) => retail.sport.slug === "kayak")
                  .map((retail) => [retail.brand.id, retail.brand]))
                  .values()
              )}
              sport="kayak"
            />
          </section>
        </div>

        <Composition
          sport="kayak"
        />
      </main>

      <section className="bag">
        {query.kayak.nodes.map((kayak: PaddlePurchaseTypes) => (
          <Purchase
            key={kayak.id}
            {...kayak}
          />
        ))}

        <h2>
          <Link to="/retail/kayak">All Kayaks</Link>
        </h2>
      </section>

      <hr className="albatross" />

      <article className="albatross wrap">
        <section className="">
          <h2>
            <Link to="/retail/paddleboard">Stand Up Paddle boards (SUPs)</Link>
          </h2>
          <h3 className="condensed">Browse By Feature</h3>
          <FeatureList sport="paddleboard" />
            <h3>Browse By Brand</h3>
            <PaddleBrandList
              nodes={Array.from(
                new Map(query.paddleBoard.nodes
                  .filter((retail) => retail.sport.slug === "paddleboard")
                  .map((retail) => [retail.brand.id, retail.brand]))
                  .values()
              )}
              sport="paddleboard"
            />
        </section>

      </article>

      <section className="bag">
        {query.paddleBoard.nodes.map((sup: PaddlePurchaseTypes) => (
          <Purchase key={sup.id} {...sup} />
        ))}
      </section>

      <h2 className="albatross">
        <Link to="/retail/paddleboard">All Paddle boards</Link>
      </h2>

      <div className="pelican">
        <hr />
        <h3>
          <Link to="/retail/demos">Demos</Link>
        </h3>
        <Markdown>{query.strapiDemo.text.data.text}</Markdown>
      </div>

      <Footer />
    </>
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
