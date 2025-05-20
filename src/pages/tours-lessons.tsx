import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck, PaddleTicket, type PaddleTicketTypes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";
import Experience from "../content/experience";
import Sport from "../components/sport";

const ToursLessonsPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: {eq: "kayak"},
          local: {slug: {eq: "tahoe-city"}}
        }
        sort: {featured: ASC}
      )
      {
        nodes {
          ...tourCard
        }
      }
  
      paddleBoard: allStrapiTour
        (
          filter: { 
            sport: { eq: "sup" },
            local: { slug: {eq: "tahoe-city"}}
          }
          sort: {featured: ASC})
        {
          nodes {
            ...tourCard
          }
        }

        allStrapiLocation: allStrapiLocation(
          filter: {
            name: {in: ["On Water Rental", "Free Parking Lot"]}
            local: {slug: {eq: "tahoe-city"}}
          }
        ) {
          nodes {
            ...locationCardFragment
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

        strapiLocale(slug: {eq: "tahoe-city"}) {
          peek_tours
          season_start
          season_end
          phone
        }

      }
    `)

  const sports = [
    query.kayak,
    query.paddleBoard,
  ]

  // console.log(`check its here ${query.allStrapiSunsetTourTime}`)
  // console.log(query.allStrapiSunsetTourTime)

  return (
    <>
      <Header />

      <main className="albatross wrap">
        <div>
          <div className="condor">
            <h1>Tours &amp; Lessons</h1>
            <Experience />
            <h2><Link to="/tours-lessons/compare">Compare Tours</Link></h2>
            <BookNow />
            <hr />
          </div>


        </div>
        <PaddleLocationDeck
          background={false}
          season_start={query.strapiLocale.season_start}
          season_end={query.strapiLocale.season_end}
          phone={query.strapiLocale.phone}
          {...query.allStrapiLocation}
        />
      </main>

      {sports.map((sport) => (
        <section key={sport.nodes[0].id}>
          <hgroup className="pelican">
            <h1 className="capitalize">
              <Sport sport={sport.nodes[0].sport} />
            </h1>
            <p className="aconcagua">Tours &amp; Lessions</p>
          </hgroup >

          <div className="deck">
            {sport.nodes.map((tour: PaddleTicketTypes) => (
              <PaddleTicket
                key={tour.id}
                {...tour}
                tour_page='tours-lessons'
                peek_tours_fall_back={query.strapiLocale.peek_tours}
                allStrapiSunsetTourTime={query.allStrapiSunsetTourTime}
              />
            ))}
          </div>
        </section >
      ))}

      < Footer />
    </>
  )
}

export default ToursLessonsPage

export const Head = () => {
  return (
    <SEO
      title='Tours and Lessons'
      description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
