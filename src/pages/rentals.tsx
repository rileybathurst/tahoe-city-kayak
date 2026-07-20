// ? how am i dealing with Inflatable docks $140-$200 per day

import * as React from "react";
import { Link, graphql } from "gatsby";
import Markdown from "react-markdown"

import { PaddlePricingChart, type PaddleRentalRateType, type PaddleGatsbyImageType } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";

import Hero from "../components/hero";

type RentalsPageTypes = {
  data: {
    favorites: {
      nodes: PaddleRentalRateType[]
    },
    fullDayOnly: {
      nodes: PaddleRentalRateType[]
    },
    strapiBranch: {
      rental_excerpt: string,
      rental: {
        data: {
          rental: string
        }
      },
      peek_membership: string,
      peek_six_pack: string
    },
    strapiMembership: {
      title: string,
      excerpt: string,
      six: string
    },
    strapiLocation: {
      hero: PaddleGatsbyImageType
    }
  }
}

const RentalsPage = ({ data }: RentalsPageTypes) => {

  console.log('favs', data.favorites);

  const allOneHourAreNull = data.favorites.nodes.every((rate) => rate.oneHour === null);
  // console.log("all oneHour are null:", allOneHourAreNull);

  const allThreeHourAreNull = data.favorites.nodes.every((rate) => rate.threeHour === null);
  // console.log("all threeHour are null:", allThreeHourAreNull);

  const allFullDayAreNull = data.favorites.nodes.every((rate) => rate.fullDay === null);
  // console.log("all fullDay are null:", allFullDayAreNull);

  // * this is where I decide number of rows
  let numberOfRows = 1
  if (!allOneHourAreNull) ++numberOfRows;
  if (!allThreeHourAreNull) ++numberOfRows;
  if (!allFullDayAreNull) ++numberOfRows;
  console.log("🦄 number of rows:", numberOfRows);

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiLocation.hero}
        overlay={<PaddlePricingChart
          rentalRates={data.favorites}
        />}
      />

      <div className="albatross">
        <PaddlePricingChart
          rentalRates={data.fullDayOnly}
        />
      </div>

      <div className="pelican">

        <h1>Rentals</h1>

        <h2 className="font-serif">Commons Beach Rentals</h2>

        {/* // TODO: keep working on makdown-mods */}
        <div className="react-markdown markdown-mods">
          <Markdown>{data.strapiBranch.rental.data.rental}</Markdown>
        </div >
        <p><Link to="/about/faq">
          Frequently Asked Questions about getting out on the water
        </Link></p>

        {/* // * margin adds to the original .book-now */}
        <div className="elbrus-margin-block-end">
          <BookNow />
        </div>

        <hr />
        <h3 className="font-serif" >{data.strapiMembership.title}</h3>
        <p>{data.strapiMembership.excerpt}</p>

        <div className="everest-margin-block-end">
          <BookNow
            specificName="MEMBERSHIP"
            specificLink={data.strapiBranch.peek_membership}
          />
        </div>

        <hr />

        <h3 className="font-serif">Paddler's 6-Pack Deal </h3>
        <p><em>- Single Kayak or Paddleboard</em></p>
        <p>{data.strapiMembership.six}</p>

        <BookNow
          specificName="SIX PACK"
          specificLink={data.strapiBranch.peek_six_pack}
        />
      </div>

      <section className="pelican">
        <hr />
        <h3>
          <Link to="/about/policies">
            Store Policies
          </Link>
        </h3>
      </section>

      <Footer topHR />
    </React.Fragment>
  );
};

export default RentalsPage;

export const Head = ({ data }: RentalsPageTypes) => {

  return (
    <SEO
      title="Rentals"
      description={data.strapiBranch.rental_excerpt}
    />
  );
};

// favorite: {eq: true},
// * item: {ne: "Inflatable Paddle Board*"} is brute force
export const data = graphql`
  query {
    favorites: allStrapiRentalRate(
      sort: {order: ASC},
      filter: {
        favorite: {eq: true},
        branches: {elemMatch: {slug: {eq: "tahoe-city"}}}
      }) {
      nodes {
        ...pricingChartFragment
      }
    }

    fullDayOnly: allStrapiRentalRate(
      sort: {order: ASC},
      filter: {
        oneHour: {eq: null}, threeHour: {eq: null},
        branches: {elemMatch: {slug: {eq: "tahoe-city"}}},
        item: {ne: "Inflatable Paddle Board*"}
      }) {
      nodes {
        ...pricingChartFragment
      }
    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      rental_excerpt
      rental {
          data {
            rental
          }
        }
        peek_membership
        peek_six_pack
      }

      strapiMembership {
        title
        excerpt
        six
      }

    strapiLocation(
      name: {eq: "On Water Rental"}
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

`;