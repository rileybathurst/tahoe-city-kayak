import * as React from "react";
import { Link, graphql } from "gatsby";
import Markdown from "react-markdown";

import { PaddlePricingChart } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";

type MembershipPageTypes = {
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
const MembershipPage = ({ data }: MembershipPageTypes) => {
  return (
    <>
      <Header />

      <main>

        <h1>Membership</h1>

        <h3>{data.strapiMembership.title}</h3>
        <p>{data.strapiMembership.excerpt}</p>

        <BookNow
          specificName="MEMBERSHIP"
          specificLink={data.strapiBranch.peek_membership}
        />

        <hr />

        <h4>Paddler's 6-Pack Deal </h4>
        <p><em>- Single Kayak or Paddleboard</em></p>
        <p>{data.strapiMembership.six}</p>

        <BookNow
          specificName="SIX PACK"
          specificLink={data.strapiBranch.peek_six_pack}
        />
      </main>

      <Footer topHR={true} />
    </>
  );
};

export default MembershipPage;

export const Head = ({ data }: MembershipPageTypes) => {

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