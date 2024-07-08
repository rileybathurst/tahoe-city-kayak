// ! this page is a mess i have a bunch of this stuff I need to import and not repeat

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationCard } from "@rileybathurst/paddle";

import { SEO } from "../../components/seo";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Card from "../../components/card";
import Composition from "../../components/composition";
import Phone from "../../components/phone";
import Markdown from "react-markdown";

function LineBreaker(props: { text: string; }) {
  const regex = /[- ]/g;
  const newStr = props.text.replace(regex, "<br />$&");
  // console.log(newStr);

  return (
    <h4>
      <span
        dangerouslySetInnerHTML={{ __html: newStr }}
      />
    </h4>
  );
}

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
// * Sets dont think array or objects are unique so we go with the old method
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

function Dedupedbrands(props) {
  const dedupedbrands = getUniqueListBy(props.brand, 'name')

  return (
    <>
      {dedupedbrands.map(brand => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/${props.sport}/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  )
}

interface RetailRatesTypes {
  id: string;
  item: string;
  oneHour: number;
  threeHour: number;
  fullDay: number;
  customOrder: number;
}
interface CustomOrderTypes {
  RentalRates: {
    nodes: {
      RetailRatesTypes;
    }
  }
}
function CustomOrder({ RentalRates }: CustomOrderTypes) {

  let CustomOrder = {
    demoSingle: 1,
    demoDouble: 2,
    paddleBoard: 3,
  }

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
  })

  return (

    <div className="pricing-chart">
      <div className="row row-header">
        <h2 className="kilimanjaro">Rental<br />Rates</h2>
        <p>1 Hour</p>
        <p><span>3 Hours</span></p>
        <p><span>Full Day</span></p>
      </div>

      {RentalRates.nodes.sort((a: RetailRatesTypes, b: RetailRatesTypes) => a.customOrder - b.customOrder).map((rate: RetailRatesTypes) => (
        <div key={rate.id} className="row">
          <LineBreaker text={rate.item} />
          <p>{rate.oneHour}</p>
          <p>{rate.threeHour}</p>
          <p>{rate.fullDay}</p>
        </div>
      ))}

    </div>
  )
}

const DemosPage = () => {

  const query = useStaticQuery(graphql`
      query DemosQuery {
        kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}, sort: {featured: ASC}) {
        nodes {
        ...retailCard

          brand {
        name
            slug
          }
        }
      }

      paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}, sort: {featured: ASC}) {
        nodes {
        ...retailCard

          brand {
        name
            slug
          }
        }
      }

      strapiLocation: strapiLocation(
      locale: {slug: {eq: "tahoe-city"}}
      name: {eq: "Retail Location"}
      ) {
        ...locationCard
      }

      strapiDemo: strapiDemo {
        text {
        data {
        text
      }
        }
      }

      allStrapiRentalRate: allStrapiRentalRate(
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

      allStrapiRentalAddon: allStrapiRentalAddon {
        nodes {
          name
          single
          double
          sup
        }
      }

    }
      `)

  return (
    <>
      <Header />

      <main>
        <div className="albatross wrap">
          <div>
            <h1>Demos</h1>
            <Markdown
              children={query.strapiDemo.text.data.text}
              className="react-markdown"
            />
            <Phone />
          </div>

          <div className="charts">
            <CustomOrder RentalRates={query.allStrapiRentalRate} />


            <div className="pricing-chart">
              {query.allStrapiRentalAddon.nodes.map((addon: { name: string; single: number; double: number; sup: number; }) => (
                <>
                  <p>{addon.name}</p>
                  <p>+{addon.single}</p>
                  <p>+{addon.double}</p>
                  <p>+{addon.sup}</p>
                </>
              ))}
            </div>
          </div>

          <PaddleLocationCard
            {...query.strapiLocation}
            background={false}
          />

        </div>
      </main >


      <section className="demo__kayak">
        <div className="demo__kayak--header passage">
          <div>
            <h3>Demos</h3>
            <hr />
            <h4>Kayaks from these brands</h4>
            <ul>
              <Dedupedbrands
                brand={query.kayak.nodes.map(brand => (brand.brand))}
                sport="kayak"
              />
            </ul>
          </div>

          <Composition sport="kayak" />
        </div>

        <section className="deck">
          {query.kayak.nodes.map((kayak: { brand: { name: string; slug: string; }; }) => (
            <Card
              key={kayak.id}
              {...kayak}
            />
          ))}
        </section>
      </section>

      <article className="main__full main__full--tour baseline-spacing">
        <div>
          <h4>Paddleboards from these brands</h4>

          <ul>
            <Dedupedbrands
              brand={query.paddleboards.nodes.map(brand => (brand.brand))}
              sport="sup"
            />
          </ul>
        </div>

        <Composition sport="sup" />
      </article>

      <section className="deck">
        {query.paddleboards.nodes.map((sup: { brand: { name: string; slug: string; }; }) => (
          <Card
            key={sup.id}
            {...sup}
          />
        ))}
      </section>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to='/retail'>Retail</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">Demos</li>
        </ol>
      </nav>

      <Footer />
    </>
  )
}

export default DemosPage

export const Head = () => {
  return (
    <SEO
      title={`Demos | ${useSiteMetadata().title}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
    />
  )
}

