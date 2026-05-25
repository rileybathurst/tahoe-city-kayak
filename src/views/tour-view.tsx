import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleCard,
  PaddleTime,
  PaddleSunsetTourTimes,
  PaddleSpecs,
  PaddleMoonlightDatesTimes,
  type PaddleTourViewTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import { Breadcrumbs, Breadcrumb } from "react-aria-components";
import BookNow from "../components/book-now";
import Locales from "../components/locales";
import Hero from "../components/hero";

export const data = graphql`
  query TourQuery($slug: String!, $yearStart: Date!, $yearEnd: Date!) {
    strapiTour(
      slug: { eq: $slug },
      branch: {slug: {eq: "tahoe-city"}}
      ) {
      id
      name
      slug
      information {
        data {
          information
        }
      }
      start
      finish
      duration
      timeframe
      minimum
      fitness
      peek
      sport
      excerpt
      price

      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      ...BookNowFragment
      season_start
      season_end
      peek_tours
      phone
    }

    allStrapiSunsetTourTime(
        filter: {startDate: {gte: $yearStart, lte: $yearEnd}},
        sort: {startDate: ASC}
    ) {
      nodes {
        id
        endDate
        endTime
        startDate
        startTime
      }
    }

    allStrapiMoonlightTourDateTime(sort: {date: ASC}) {
      nodes {
        id
        date
        start
        finish
      }
    }

    allStrapiTour(
        filter: {
          slug: {nin: [$slug] },
          branch: {slug: {eq: "tahoe-city"}}
          },
        sort: {order: ASC},
      ) {
      nodes {
        ...CardTourFragment
      }
    }

  }
`;

// TODO: strapiLocation.locale.name either needed everywhere and should be in the fragment or not needed
const TourView = ({ data }: PaddleTourViewTypes) => {

  const time = PaddleTime({
    start: data.strapiTour.start,
    finish: data.strapiTour.finish,
    duration: data.strapiTour.duration,
    timeframe: data.strapiTour.timeframe,
    slug: data.strapiTour.slug,
    allStrapiSunsetTourTime: data.allStrapiSunsetTourTime,
  });

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiTour.hero}
        overlay={<Locales
          water={true}
          parking={true}
        />}
      />

      <main className="pelican">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            {data.strapiTour.peek ? (
              <BookNow
                specificLink={data.strapiTour.peek}
              />
            ) : (
              <BookNow />
            )}
            {data.strapiTour.minimum && (
              <p>
                * Prices based on a {data.strapiTour.minimum} person
                minimum
              </p>
            )}
          </div>

          <section className="elbrus-margin-block">
            <div className="react-markdown ">
              <Markdown>
                {data.strapiTour.information?.data?.information}
              </Markdown>
            </div>

            <PaddleSpecs
              sport={data.strapiTour.sport}
              fitness={data.strapiTour.fitness}
              // ? experience={data.strapiTour.experience}
              price={data.strapiTour.price}
            />
            {/* * needed as theres a bunch of values that may be passed but none is specific */}
            {time.value ? <PaddleSpecs time={time} /> : null}



            {data.strapiTour.slug === "sunset" ? (
              <PaddleSunsetTourTimes {...data.allStrapiSunsetTourTime} />
            ) : null}

            {data.strapiTour.slug === "moonlight" ? (
              <PaddleMoonlightDatesTimes
                nodes={data.allStrapiMoonlightTourDateTime.nodes}
              />
            ) : null}
          </section>

        </div>
      </main>

      <div className="panel everest-padding-block">
        <div className="albatross">
          <h3>
            <Link to="/tours-lessons">Other Tours & Lessons</Link>
          </h3>
        </div>

        <section className="deck">
          {data.allStrapiTour.nodes.map((tour) => (
            <PaddleCard
              key={tour.id}
              {...tour}
              link={`/tours-lessons/${tour.link}`}
              paddleBookNow={{
                peek_base: data.strapiBranch.peek_tours,
                strapiBranchName: data.strapiBranch.name,
                specificLink: tour.peek,
              }}
            />
          ))}
        </section>

        <h4 className="albatross">
          <Link to={`/tours-lessons/compare/?${data.strapiTour.slug}`}>
            Compare the {data.strapiTour.name} to another tour.
          </Link>
        </h4>
      </div>

      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/tours-lessons">Tours & Lessons</Link>
        </Breadcrumb>
        <Breadcrumb>{data.strapiTour.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  );
};

export default TourView;

type TourViewHeadTypes = {
  data: {
    strapiTour: {
      name: string;
      excerpt: string;
      slug: string;
    };
  };
};
export const Head = ({ data }: TourViewHeadTypes) => {
  return (
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
      breadcrumbs={[
        {
          name: "Tours & Lessons",
          item: "tours-lessons",
        },
        {
          name: data.strapiTour.name,
          item: `tours-lessons/${data.strapiTour.slug}`,
        },
      ]}
    />
  );
};
