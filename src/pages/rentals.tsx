import * as React from "react";
import { Link, graphql } from "gatsby";
import Markdown from "react-markdown";

import { PaddlePricingChart, type PaddleRentalsPageTypes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";

import Hero from "../components/hero";


const RentalsPage = ({ data }: PaddleRentalsPageTypes) => {
  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiLocation.hero}
        overlay={<PaddlePricingChart
          rentalRates={data.allStrapiRentalRate}
        />}
      />

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

export const Head = ({ data }: PaddleRentalsPageTypes) => {

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