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
// TODO: use a set I understand those better
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

  const sports = [
    { sport: "kayak", nodes: query.kayak.nodes, title: "Kayaks" },
    { sport: "sup", nodes: query.paddleboards.nodes, title: "Paddleboards" }
  ].filter(({ nodes }) => nodes.length > 0);

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
          retail={true}
        />
        
      </div>

      {sports.map(({ sport, nodes, title }) => (
        <section key={sport}>
          <div className="albatross wrap">
            <div>
              {sport === "kayak" && (
                <>
                  <h3>Demos</h3>
                  <hr />
                </>
              )}
              <h4>{title} from these brands</h4>
              <ul>
                <Dedupedbrands
                  brand={nodes.map((brand: { brand: BrandType }) => brand.brand)}
                  sport={sport}
                />
              </ul>
            </div>

            <Composition sport={sport} />
          </div>

          <section className="bag">
            {nodes.map((item: PaddlePurchaseTypes) => (
              <Purchase
                key={item.id}
                {...item}
              />
            ))}
          </section>
        </section>
      ))}


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
