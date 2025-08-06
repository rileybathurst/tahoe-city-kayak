import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Markdown from "react-markdown";

// Paddle
import { PaddlePricingChart } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";
import Composition from "../components/composition";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";

import { useStrapiRental } from "../hooks/use-strapi-rental";
import LocationDeck from "../components/location-deck";

const RentalsPage = () => {
  const data = useStaticQuery(graphql`
  query RentalsQuery {
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
        local: {slug: {eq: "tahoe-city"}}
      }
    ) {
      nodes {
        ...locationCardFragment
      }
    }

    strapiRiver {
      title
      description {
        data {
          description
        }
      }
      equipment {
          localFile {
            childImageSharp {
              gatsbyImageData(height: 900, layout: CONSTRAINED, placeholder: BLURRED)
            }
          }
        alternativeText
        id
      }
    }

  }
`);

  type RiverTypes = {
    id: React.Key;
    alternativeText: string;
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };

  return (
    <>
      <Header />

      <div className="albatross aurora">
        <PaddlePricingChart
          rentalRates={data.allStrapiRentalRate}
        />
      </div>

      <main className="albatross wrap">
        <div>
          <div className="condor">
            <h1>Rentals</h1>
            <LocationDeck
              allStrapiLocation={data.allStrapiLocation}
            />
            <h2>Commons Beach Rentals</h2>
            <div className="react-markdown">
              <Markdown>{useStrapiRental().text.data.text}</Markdown>
            </div>
            <Link to="/about/faq">
              Frequently Asked Questions about getting out on the water
            </Link>

            <BookNow />
          </div>
        </div>

        <div>
          <div className="condor">
            <Composition />
          </div>
        </div>
      </main>

      <div className="albatross wrap cloud">
        <div>
          <section className="condor">
            <h2>{data.strapiRiver.title}</h2>

            <Markdown>
              {data.strapiRiver.description.data.description}
            </Markdown>
          </section>
        </div>

        <div className="equipment">
          {data.strapiRiver.equipment.map((image: RiverTypes) => (
            <GatsbyImage
              key={image.id}
              image={image.localFile.childImageSharp.gatsbyImageData}
              alt={image.alternativeText}
              className="equipment-images"
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RentalsPage;

export const Head = () => {
  return <SEO title="Rentals" description={useStrapiRental().excerpt} />;
};
