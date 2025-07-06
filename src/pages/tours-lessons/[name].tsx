import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { PaddleTicket, type PaddleTicketTypes } from "@rileybathurst/paddle";

function TourCatchAll({ params }: { params: { name: string } }) {
  const data = useStaticQuery(graphql`
    query TourCatchAllQuery {
      allStrapiTour(filter: {
        local: {slug: {eq: "tahoe-city"}}
      },
      sort: {featured: ASC},
      ){
        nodes {
          ...ticketFragment
        }
      }

      strapiLocale(slug: {eq: "tahoe-city"}) {
        peek_tours
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
    }
  `);

  return (
    <>
      <Header />
      <main className="measure">
        <h2 className="crest">
          <Link to="/tours-lessons">Tours &amp; Lessons</Link> / {params.name}
        </h2>

        {/* // TODO: this should be a component */}
        <h1 className="mixta">
          Looks like you&apos;ve paddled into uncharted waters!
        </h1>
        <p>
          Don&apos;t worry, we&apos;ll help you navigate{" "}
          <Link to="/">back to our homepage.</Link>
        </p>
      </main>

      <section className="deck">
        {data.allStrapiTour.nodes.map((tour: PaddleTicketTypes) => (
          <PaddleTicket
            key={tour.id}
            {...tour}
            tour_page="tours-lessons"
            peek_tours_fall_back={data.strapiLocale.peek_tours}
            allStrapiSunsetTourTime={data.allStrapiSunsetTourTime}
          />
        ))}
      </section>

      <Footer />
    </>
  );
}

export default TourCatchAll;

// TODO: SEO
