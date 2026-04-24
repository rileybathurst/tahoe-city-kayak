import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleCard,
  type PaddleCardTypes,
  PaddleTime,
  PaddleSunsetTourTimes,
  PaddleSpecs,
  PaddleMoonlightDatesTimes,
  type PaddleGatsbyImageType,
  type PaddleLocationTypes
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import Composition from "../components/composition";
import { Breadcrumbs, Breadcrumb } from "react-aria-components";
import BookNow from "../components/book-now";
import Locales from "../components/locales";

// TODO: move more of these types to paddle to make sure everything is inline
interface TourViewTypes {
  data: {
    strapiTour: {
      id: React.Key;
      name: string;
      information: {
        data: {
          information: string;
        };
      };
      start: string;
      finish: string;
      duration: number;
      timeframe: string;
      minimum: number;
      fitness: string;
      peek: string;
      sport: string;
      excerpt: string;
      price: number;
      slug: string;
      ogImage: PaddleGatsbyImageType;

      branch: {
        name: string;
        peek_tours: string;
        season_start: string;
        season_end: string;
        phone: string;
      };

      compositionImage: PaddleGatsbyImageType;
    };

    allStrapiMoonlightTourDateTime: {
      nodes: {
        id: React.Key;
        date: string;
        start: string;
        finish: string;
      }[];
    };

    allStrapiSunsetTourTime: {
      nodes: {
        id: React.Key;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
      }[];
    };

    branch: {
      name: string;
    };

    allStrapiTour: {
      nodes: PaddleCardTypes[];
    };

    strapiBranch: {
      peek_tours: string;
    };
  };
}

export const data = graphql`
  query TourQuery($slug: String!) {
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

      ogimage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }

      compositionImage {
        localFile {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1, layout: CONSTRAINED)
          }
        }
        alternativeText
      }

      branch {
        name
        peek_tours
        season_start
        season_end
        phone
      }
    }

    allStrapiSunsetTourTime(sort: {startDate: ASC}) {
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
        ...ticketFragment
      }
    }

  }
`;

// TODO: strapiLocation.locale.name either needed everywhere and should be in the fragment or not needed

const TourView = ({ data }: TourViewTypes) => {

  const time = PaddleTime({
    start: data.strapiTour.start,
    finish: data.strapiTour.finish,
    duration: data.strapiTour.duration,
    timeframe: data.strapiTour.timeframe,
    slug: data.strapiTour.slug,
    allStrapiSunsetTourTime: data.allStrapiSunsetTourTime,
    // allStrapiMoonlightTourDateTime: data.allStrapiMoonlightTourDateTime,
  });

  return (
    <>
      <Header />

      <main className="albatross">
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
            {/* // TODO: do some work on the vertical center align */}
            {data.strapiTour.minimum ? (
              <p>
                * Prices based on a<br /> {data.strapiTour.minimum} person
                minimum
              </p>
            ) : null}
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

          <section className="elbrus-margin-block">
            <div className="react-markdown ">
              <Markdown>
                {data.strapiTour.information?.data?.information}
              </Markdown>
            </div>

            {data.strapiTour.slug === "moonlight" ? (
              <PaddleMoonlightDatesTimes
                nodes={data.allStrapiMoonlightTourDateTime.nodes}
              />
            ) : null}
          </section>

        </div>

        <div>

          <hr />

          <Locales
            water={true}
            parking={true}
          />
        </div>
      </main>

      <div className="panel everest-padding-block">
        <div className="albatross">
          <h3>
            <Link to="/tours-lessons">Other Tours & Lessons</Link>
          </h3>
        </div>

        <section className="flight">
          {data.allStrapiTour.nodes.map((tour: PaddleCardTypes) => (
            <PaddleCard
              key={tour.id}
              {...tour}
              tour_page="tours-lessons"
              peek_tours_fall_back={data.strapiTour.branch.peek_tours}
              allStrapiSunsetTourTime={data.allStrapiSunsetTourTime}
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
    </>
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
