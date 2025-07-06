// ! this page is a mess i have a bunch of this stuff I need to import and not repeat

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
import { PaddlePurchaseTypes } from "@rileybathurst/paddle";

function LineBreaker(props: { text: string }) {
  const regex = /[- ]/g;
  const newStr = props.text.replace(regex, "<br />$&");
  // console.log(newStr);
  return (
    <h4 dangerouslySetInnerHTML={{ __html: newStr }} />
  );
}

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
// * Sets dont think array or objects are unique so we go with the old method
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

interface BrandType {
  name: string;
  slug: string;
}

interface DedupedbrandsProps {
  brand: BrandType[];
  sport: string;
}

function Dedupedbrands(props: DedupedbrandsProps) {
  const dedupedbrands: BrandType[] = getUniqueListBy(props.brand, "name") as BrandType[];

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

interface RetailRatesTypes {
  id: React.Key;
  item: string;
  oneHour: number;
  threeHour: number;
  fullDay: number;
  customOrder: number;
}
interface CustomOrderTypes {
  RentalRates: {
    nodes: RetailRatesTypes[];
  };
}
function CustomOrder({ RentalRates }: CustomOrderTypes) {
  const CustomOrder = {
    demoSingle: 1,
    demoDouble: 2,
    paddleBoard: 3,
  };

  RentalRates.nodes.map((rate: RetailRatesTypes) => {
    if (rate.item === "Demo Single") {
      rate.customOrder = CustomOrder.demoSingle;
    }
    if (rate.item === "Demo Double") {
      rate.customOrder = CustomOrder.demoDouble;
    }
    if (rate.item === "Paddle board") {
      rate.customOrder = CustomOrder.paddleBoard;
    }
  });

  return (
    <div className="pricing-chart">
      <div className="row row-header">
        <h2 className="kilimanjaro">
          Rental
          <br />
          Rates
        </h2>
        <p>1 Hour</p>
        <p>
          <span>3 Hours</span>
        </p>
        <p>
          <span>Full Day</span>
        </p>
      </div>

      {RentalRates.nodes
        .sort(
          (a: RetailRatesTypes, b: RetailRatesTypes) =>
            a.customOrder - b.customOrder,
        )
        .map((rate: RetailRatesTypes) => (
          <div key={rate.id} className="row">
            <LineBreaker text={rate.item} />
            <p>{rate.oneHour}</p>
            <p>{rate.threeHour}</p>
            <p>{rate.fullDay}</p>
          </div>
        ))}
    </div>
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
        filter: {item: {in: ["Demo Single", "Demo Double", "Paddle board"]}}
        sort: {item: ASC}
      ) {
        nodes {
          id
          item
          oneHour
          threeHour
          fullDay
        }
      }

      allStrapiRentalAddon {
        nodes {
          name
          single
          double
          sup
        }
      }

    }
  `);

  console.log(query.kayak);
  console.log(query.paddleboards);

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

          <div className="charts">
            <CustomOrder RentalRates={query.allStrapiRentalRate} />

            <div className="pricing-chart">
              {query.allStrapiRentalAddon.nodes.map(
                (addon: {
                  name: string;
                  single: number;
                  double: number;
                  sup: number;
                }) => (
                  <React.Fragment key={addon.name}>
                    <p>{addon.name}</p>
                    <p>+{addon.single}</p>
                    <p>+{addon.double}</p>
                    <p>+{addon.sup}</p>
                  </React.Fragment>
                ),
              )}
            </div>

            {/* // TODO: this needs a few additional props
            <PricingChart
              rentalRates={query.allStrapiRentalRate}
              rentalAddons={query.allStrapiRentalAddon}
              book={false}
            /> */}
          </div>
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
                  brand={query.kayak.nodes.map((brand) => brand.brand)}
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
                  brand={query.paddleboards.nodes.map((brand) => brand.brand)}
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
