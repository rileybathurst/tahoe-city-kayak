// ! import and not repeat

import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Purchase from "../../components/purchase";
import Composition from "../../components/composition";
import Phone from "../../components/phone";
import Markdown from "react-markdown";
import { Breadcrumbs, Breadcrumb } from "react-aria-components";
import LocationDeck from "../../components/location-deck";
import { PaddlePricingChart, type PaddlePurchaseTypes } from "@rileybathurst/paddle";

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
// * Sets dont think array or objects are unique so we go with the old method
function getUniqueListBy<T extends Record<string, unknown>>({ arr, key }: { arr: T[], key: keyof T }) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

interface BrandType {
  name: string;
  slug: string;
  [key: string]: unknown;
}

interface DedupedbrandsProps {
  brand: BrandType[];
  sport: string;
}

function Dedupedbrands(props: DedupedbrandsProps) {
  const dedupedbrands = getUniqueListBy<BrandType>({ arr: props.brand, key: "name" });

  return (
    <>
      {dedupedbrands.map((brand) => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/${props.sport}/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  );
}

const DemosPage = () => {

  const query = useStaticQuery(graphql`
      query DemosQuery {
        
        kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}, sort: {featured: ASC}) {
        nodes {
          ...purchaseFragment

          brand {
            name
            slug
          }
        }
      }

      paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}, sort: {featured: ASC}) {
        nodes {
        ...purchaseFragment

          brand {
            name
            slug
          }
        }
      }

      allStrapiLocation(filter: {
        local: {slug: {eq: "tahoe-city"}},
        name: {eq: "Retail Location"}
      }) {
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

      allStrapiRentalRate(
        sort: {order: ASC},
        filter: {favorite: {eq: false}}
      ) {
        nodes {
          id
          item
          oneHour
          threeHour
          fullDay
          pedalAdd
        }
      }

    }
  `);

  return (
    <>
      <Header />

      <div className="albatross wrap">
        <main>
          <h1>Demos</h1>
          <div className="react-markdown">
            <Markdown>{query.strapiDemo.text.data.text}</Markdown>
          </div>
          <Phone />
        </main>

        <LocationDeck
          allStrapiLocation={query.allStrapiLocation}
        />
      </div>

      {query.kayak.nodes.length > 0 && (
        <section>
          <div className="albatross wrap">
            <div>
              <h3>Demos</h3>
              <hr />
              <h4>Kayaks from these brands</h4>
              <ul>
                <Dedupedbrands
                  brand={query.kayak.nodes.map((brand: { brand: BrandType }) => brand.brand)}
                  sport="kayak"
                />
              </ul>
            </div>

            <Composition sport="kayak" />
          </div>

          <section className="bag">
            {query.kayak.nodes.map(
              (kayak: PaddlePurchaseTypes) => (
                <Purchase
                  key={kayak.id}
                  {...kayak}
                />
              ),
            )}
          </section>
        </section>
      )}

      {query.paddleboards.nodes.length > 0 && (
        <section>
          <article className="albatross wrap">
            <div>
              <h4>Paddleboards from these brands</h4>

              <ul>
                <Dedupedbrands
                  brand={query.paddleboards.nodes.map((brand: { brand: BrandType }) => brand.brand)}
                  sport="sup"
                />
              </ul>
            </div>

            <Composition sport="sup" />
          </article>

          <section className="bag">
            {query.paddleboards.nodes.map(
              (sup: PaddlePurchaseTypes) => (
                <Purchase key={sup.id}
                  {...sup}
                />
              ),
            )}
          </section>
        </section>
      )}

      <div className="albatross aurora">
        <PaddlePricingChart
          rentalRates={query.allStrapiRentalRate}
        />
      </div>

      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/retail/">Retail</Link>
        </Breadcrumb>
        <Breadcrumb>Demos</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default DemosPage;

export const Head = () => {
  return (
    <SEO
      title="Demos"
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
      breadcrumbs={[
        {
          name: "Retail",
          item: "retail",
        },
        {
          name: "Demos",
          item: "demos",
        },
      ]}
    />
  );
};
