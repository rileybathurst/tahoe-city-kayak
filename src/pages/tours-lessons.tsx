import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

// Paddle
import {
  PaddleLocales,
  PaddleCard,
  type PaddleCardTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import BookNow from "../components/book-now";
import Experience from "../content/experience";
import Sport from "../components/sport";
import Locales from "../components/locales";

const ToursLessonsPage = () => {
  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: {eq: "kayak"},
          branch: {slug: {eq: "tahoe-city"}}
        }
        sort: {order: ASC}
      )
      {
        nodes {
          ...ticketFragment
        }
      }
  
      paddleBoard: allStrapiTour
        (
          filter: { 
            sport: { eq: "sup" },
            branch: { slug: {eq: "tahoe-city"}}
          }
          sort: {order: ASC})
        {
          nodes {
            ...ticketFragment
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

        strapiBranch(slug: {eq: "tahoe-city"}) {
          peek_tours
          season_start
          season_end
          phone
        }

      }
    `);

  const sports = [query.kayak, query.paddleBoard];

  return (
    <>
      <Header />

      <main className="albatross">
        <div>
          <div className="condor">
            <h1>Tours &amp; Lessons</h1>
            <Experience />
            <h2 className="denali">
              <Link to="/tours-lessons/compare">Compare Tours</Link>
            </h2>
            <BookNow />
          </div>
        </div>

        <Locales
          water={true}
          parking={true}
        />

      </main>

      <div className="panel everest-padding-block">
        {sports.map((sport) => (
          <section key={sport.nodes[0].id}>
            <hgroup className="pelican">
              <h1 className="capitalize">
                <Sport sport={sport.nodes[0].sport} />
              </h1>
              <p className="aconcagua">Tours &amp; Lessons</p>
            </hgroup>

            <div className="flight">
              {sport.nodes
                .map((tour: PaddleCardTypes) => (
                  <PaddleCard
                    key={tour.id}
                    {...tour}
                    link={`/tours-lessons/${tour.slug}`}
                    peek_tours_fall_back={query.strapiBranch.peek_tours}
                    allStrapiSunsetTourTime={query.allStrapiSunsetTourTime}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ToursLessonsPage;

export const Head = () => {
  return (
    <SEO
      title="Tours and Lessons"
      description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  );
};
