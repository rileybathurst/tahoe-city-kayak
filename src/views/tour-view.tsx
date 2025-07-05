import * as React from "react";
import { Link, graphql } from "gatsby";
import {
  PaddleTicket,
  type PaddleTicketTypes,
  PaddleTime,
  PaddleSunsetTourTimes,
  PaddleSpecs,
  PaddleLocationDeck,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import Time from "../components/time";

import Composition from "../components/composition";
import type { IGatsbyImageData } from "gatsby-plugin-image";
import type { CardType } from "../types/card";
import { Breadcrumbs, Breadcrumb } from "react-aria-components";
import BookNow from "../components/book-now";

interface TourViewTypes {
  data: {
    allStrapiMoonlightTourDateTime: {
      nodes: { id: React.Key; date: string; start: string; finish: string }[];
    };
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
      ogimage: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        alternativeText: string;
      };

      compositionImage: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        alternativeText: string;
      };

      local: {
        name: string;
        peek_tours: string;
        season_start: string;
        season_end: string;
        phone: string;
      };
    };

    allStrapiSunsetTourTime: {
      nodes: {
        id: string;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
      }[];
    };

    local: {
      name: string;
    };

    allStrapiTour: {
      nodes: PaddleTicketTypes[];
    };

    allStrapiLocation: CardType[];

    strapiLocale: {
      peek_tours: string;
    };
  };
}

export const data = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      local: {slug: {eq: "tahoe-city"}}
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

      local {
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
          local: {slug: {eq: "tahoe-city"}}
          },
        sort: {featured: ASC},
      ) {
      nodes {
        ...ticketFragment
      }
    }

    allStrapiLocation(
      filter: {
        local: {slug: {eq: "tahoe-city"}},
        name: {in: ["On Water Rental", "Free Parking Lot"]}
      },
      sort: {order: ASC}
    ) {
      nodes {
        ...locationCardFragment
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
    allStrapiMoonlightTourDateTime: data.allStrapiMoonlightTourDateTime,
  });

  // TODO: add the moonlight tour times to paddle just quick working here
  type MoonlightTourDateTime = {
    seasonStart: string;
    seasonEnd: string;
    nodes: {
      id: string;
      date: string;
      start: string;
      finish: string;
    }[];
  };
  function MoonlightTourDatesTimes({
    seasonStart,
    seasonEnd,
    nodes,
  }: MoonlightTourDateTime) {
    const currentDate = new Date();
    if (currentDate > new Date(seasonEnd)) {
      // console.log('its past the end of the season');

      const futureTours = nodes.filter(
        (tour) => new Date(tour.date) >= currentDate,
      );

      // console.log(futureTours);

      if (futureTours.length > 0) {
        return (
          <>
            <h3>Next season tours</h3>
            {futureTours.map((tour) => (
              <p key={tour.id}>
                {new Date(tour.date).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                &nbsp;-&nbsp;
                <Time start={tour.start} finish={tour.finish} />
              </p>
            ))}
          </>
        );
      }
    }

    // TODO: strike through after the date has passed

    return (
      <div>
        <h3>Moonlight Tour Dates</h3>
        <ul>
          {nodes.map((tour) => (
            <li key={tour.id}>
              <h4>
                {new Date(tour.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                &nbsp;-&nbsp;
                <Time start={tour.start} finish={tour.finish} />
              </h4>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="albatross wrap">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            {data.strapiTour.peek ? (
              <a
                href={data.strapiTour.peek}
                rel="noopener noreferrer"
                className="book-now"
              >
                BOOK NOW
              </a>
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
            time={time}
          />

          {data.strapiTour.slug === "sunset" ? (
            <PaddleSunsetTourTimes {...data.allStrapiSunsetTourTime} />
          ) : null}

          <section className="single__description">
            <div className="react-markdown ">
              <Markdown>
                {data.strapiTour.information?.data?.information}
              </Markdown>
            </div>

            {data.strapiTour.slug === "moonlight" ? (
              <MoonlightTourDatesTimes
                seasonStart={data.strapiTour.local.season_start}
                seasonEnd={data.strapiTour.local.season_end}
                {...data.allStrapiMoonlightTourDateTime}
              />
            ) : null}
          </section>

          <PaddleLocationDeck
            season_start={data.strapiTour.local.season_start}
            season_end={data.strapiTour.local.season_end}
            phone={data.strapiTour.local.phone}
            {...data.allStrapiLocation}
          />

          <h4>
            <Link to={`/tours-lessons/compare/?${data.strapiTour.slug}`}>
              Compare the {data.strapiTour.name} to another tour.
            </Link>
          </h4>
        </div>

        <Composition
          sport={data.strapiTour.sport}
          image={data.strapiTour?.compositionImage}
        />
      </main>

      <div className="albatross">
        <hr />
        <h3>
          <Link to="/tours-lessons">Other Tours & Lessons</Link>
        </h3>
        <hr />
      </div>

      <section className="deck">
        {data.allStrapiTour.nodes.map((tour: PaddleTicketTypes) => (
          <PaddleTicket
            key={tour.id}
            {...tour}
            tour_page="tours-lessons"
            peek_tours_fall_back={data.strapiTour.local.peek_tours}
            allStrapiSunsetTourTime={data.allStrapiSunsetTourTime}
          />
        ))}
      </section>

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
