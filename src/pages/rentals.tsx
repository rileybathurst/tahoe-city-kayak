import * as React from "react";
import { Link, graphql } from "gatsby";
import Markdown from "react-markdown";

import { PaddlePricingChart, type PaddleLocationTypes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";
import Composition from "../components/composition";

import LocationDeck from "../components/location-deck";
import SplitLayout from "../components/split-layout";

type RentalsPageTypes = {
  data: {
    allStrapiRentalRate: {
      nodes: {
        id: string;
        item: string;
        oneHour: number;
        threeHour: number;
        fullDay: number;
        pedalAdd: number;
      }[];
    };
    allStrapiLocation: {
      nodes: PaddleLocationTypes[];
    };

    strapiBranch: {
      rental_excerpt: string;
      rental: {
        data: {
          rental: string;
        };
      };
      peek_membership: string;
      peek_six_pack: string;
    };

    strapiMembership: {
      title: string;
      excerpt: string;
      six: string;
    };
  };
};
const RentalsPage = ({ data }: RentalsPageTypes) => {


  return (
    <>
      <Header />

      <div className="albatross aurora">
        <PaddlePricingChart
          rentalRates={data.allStrapiRentalRate}
        />
      </div>

      <SplitLayout content={
        <React.Fragment>
          <h1>Rentals</h1>

          <LocationDeck
            allStrapiLocation={{ ...data.allStrapiLocation }}
          />

          <h2>Commons Beach Rentals</h2>
          <div className="react-markdown">
            <Markdown>{data.strapiBranch.rental.data.rental}</Markdown>
          </div>
          <p><Link to="/about/faq">
            Frequently Asked Questions about getting out on the water
          </Link></p>

          <BookNow />

          <br />
          <h3>{data.strapiMembership.title}</h3>
          <p>{data.strapiMembership.excerpt}</p>

          <BookNow
            specificName="MEMBERSHIP"
            specificLink={data.strapiBranch.peek_membership}
          />

          <h4>Paddler's 6-Pack Deal </h4>
          <p><em>- Single Kayak or Paddleboard</em></p>
          <p>{data.strapiMembership.six}</p>

          <BookNow
            specificName="SIX PACK"
            specificLink={data.strapiBranch.peek_six_pack}
          />
        </React.Fragment>
      } />

      <Footer />
    </>
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

export const data = graphql`
  query {
    allStrapiRentalRate(
      sort: {order: ASC},
      filter: {favorite: {eq: true}}
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

    allStrapiLocation(
      filter: {
        name: {in: ["On Water Rental", "Free Parking Lot"]}
        branch: {slug: {eq: "tahoe-city"}}
      }
    ) {
      nodes {
        ...locationCardFragment
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

    }
`;