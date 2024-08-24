import * as React from "react";
import { Link, graphql } from "gatsby";

// Paddle
import { PaddleLocationCard, PaddleTicket, type PaddleTicketTypes, PaddleTime, PaddleSunsetTourTimes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Markdown from "react-markdown";
import Header from "../components/header"
import Footer from "../components/footer"
import Time from "../components/time";
import Composition from "../components/composition";
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import type { CardType } from "../types/card";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import BookNow from "../components/peek/book-now";

interface AttributesProps {
  sport?: string;
  fitness?: string;
  price?: number;
  minimum?: number;
  start?: string;
  finish?: string;
  duration?: number;
  timeEntry?: string;
  timeValue?: string;
}
function Attributes(attributes: AttributesProps) {
  const sections = Object.entries(attributes).map(([key, value]) => {
    if (value) {
      if (key === "timeValue") {
        return null;
      }

      if (key === "timeEntry") {
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{attributes.timeValue}</h3>
            <h4>{value}</h4>
          </section>
        )
      }

      if (key === "duration") {
        const unit = "mins";
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            <h4 className="range">{value} {unit}</h4>
          </section >
        )
      }

      if (key === "price") {
        const unit = "$";
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            <h4 className="range">{unit}{value}</h4>
          </section >
        )
      }

      if (key === "start" || key === "finish") {
        return (
          <section
            key={key}
            className="spec attribute"
          >
            <h3 className="crest">{key}</h3>
            {/* <h4 className="range"><HourMin time={value} /></h4> */}
            <Time start={attributes.start} finish={attributes.finish} />
          </section >
        )
      }

      return (
        <section
          key={key}
          className="spec attribute"
        >
          <h3 className="crest">{key}</h3>
          <h4 className="range">{value}</h4>
        </section >
      )
    }
  })

  return (
    <div className="attributes">
      {sections}
    </div>
  )
}
interface MinimumTypes {
  minimum: number;
}
function Minimum({ minimum }: MinimumTypes) {
  if (minimum) {
    return (
      <p>* Prices based on a<br />
        {minimum} person minimum</p>
    );
  }

  return null;
}

interface TourViewTypes {
  data: {
    strapiTour: {
      id: React.Key;
      name: string;
      information: {
        data: {
          information: string;
        }
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
    }

    allStrapiSunsetTourTime: {
      nodes: {
        id: string;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
      }[];
    }

    locale: {
      name: string;
    }
    allStrapiTour: {
      nodes: PaddleTicketTypes[];
    }

    strapiLocation: CardType;

    strapiLocale: {
      peek_tours: string;
    }
  }
}

export const data = graphql`
  query TourQuery($slug: String!) {
    strapiTour(
      slug: { eq: $slug },
      locale: {slug: {eq: "tahoe-city"}}
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

      locale {
        name
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
          locale: {slug: {eq: "tahoe-city"}}
          },
        sort: {featured: ASC},
      ) {
      nodes {
        ...tourCardFragment
      }
    }

    strapiLocation(
      locale: {slug: {eq: "tahoe-city"}}
      name: {eq: "On Water Rental"}
    ) {
      ...locationCardFragment

      locale {
        name
      }
    }

    strapiLocale(slug: {eq: "tahoe-city"}) {
      peek_tours
    }

  }
`

const TourView = ({ data }: TourViewTypes) => {

  const time = PaddleTime({
    start: data.strapiTour.start,
    finish: data.strapiTour.finish,
    duration: data.strapiTour.duration,
    timeframe: data.strapiTour.timeframe,
    slug: data.strapiTour.slug,
    allStrapiSunsetTourTime: data.allStrapiSunsetTourTime,
    allStrapiMoonlightTourDateTime: data.allStrapiMoonlightTourDateTime
  });

  // TODO: add the moonlight tour times to paddle just quick working here
  type MoonlightTourDateTime = {
    nodes: {
      id: string;
      date: string;
      start: string;
      finish: string;
    }[];
  }
  function MoonlightTourDatesTimes({ nodes }: MoonlightTourDateTime) {
    return (
      <div className="">
        <h3>Moonlight Tour Dates</h3>
        <ul>
          {nodes.map((tour) =>
            <li key={tour.id}>
              <h4>{tour.date}<Time start={tour.start} finish={tour.finish} /></h4>
            </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <>
      <Header />

      <main className="albatross wrap">
        <div>
          <h1>{data.strapiTour.name}</h1>
          <div className="tour__minimum">
            {data.strapiTour.peek ?
              <a href={data.strapiTour.peek}
                rel="noopener noreferrer"
                className="book-now"
              >
                BOOK NOW
              </a>
              :
              <BookNow />
            }
            {/* // TODO: do some work on the vertical center align */}
            <Minimum minimum={data.strapiTour.minimum} />
          </div>

          <Attributes
            sport={data.strapiTour.sport}
            fitness={data.strapiTour.fitness}
            price={data.strapiTour.price}
            timeEntry={time.entry}
            timeValue={time.value}
          />

          {data.strapiTour.slug === "sunset" ?
            <PaddleSunsetTourTimes {...data.allStrapiSunsetTourTime} />
            : null}

          <section className="single__description">
            <Markdown className="react-markdown ">
              {data.strapiTour.information?.data?.information}
            </Markdown>

            {data.strapiTour.slug === "moonlight" ?
              <MoonlightTourDatesTimes {...data.allStrapiMoonlightTourDateTime} />
              : null}
          </section>

        </div>

        <aside>
          <Composition
            sport={data.strapiTour.ogimage || data.strapiTour.sport}
          // TODO: change the image on tours
          />

          <PaddleLocationCard
            key={data.strapiLocation.id}
            {...data.strapiLocation}
          />
        </aside>

      </main>

      <hr className="albatross" />

      <div className="albatross">
        <h3>Other Tours</h3>
        <h4>
          <Link to={`/tours-lessons/compare/?${data.strapiTour.slug}`}>
            Compare the {data.strapiTour.name} to another tour.
          </Link>
        </h4>
        <hr />
      </div>

      <section className="deck">
        {data.allStrapiTour.nodes.map((tour: PaddleTicketTypes) =>
          <PaddleTicket
            key={tour.id}
            {...tour}
            tour_page='tours-lessons'
            peek_tours_fall_back={data.strapiLocale.peek_tours}
          />
        )}
      </section>

      <Breadcrumbs>
        <Breadcrumb><Link to="/tours-lessons">Tours & Lessons</Link></Breadcrumb>
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
    }
  }
}
export const Head = ({ data }: TourViewHeadTypes) => {
  return (
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
      breadcrumbs={[
        {
          name: "Tours & Lessons",
          item: "tours-lessons"
        },
        {
          name: data.strapiTour.name,
          item: `tours-lessons/${data.strapiTour.slug}`
        }
      ]}
    />
  );
}