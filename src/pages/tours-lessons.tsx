import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";
import Experience from "../content/experience";
import Ticket from "../components/ticket";
import { CardType } from "../types/card";
import Sport from "../components/sport";

function Nested(props: { sport: string }) {
  if (props.sport) {
    // console.log(props.sport);

    return (
      <h1 className="capitalize">
        <Sport sport={props.sport} />
      </h1>
    )
  }

  return null;
}

const ToursLessonsPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour(
        filter: {
          sport: {eq: "kayak"},
          locale: {slug: {eq: "tahoe-city"}}
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
            locale: { slug: {eq: "tahoe-city"}}
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
            locale: {slug: {eq: "tahoe-city"}}
          }
        ) {
          nodes {
            ...locationCard
          }
        }

      }
    `)

  const sports = [
    query.kayak,
    query.paddleBoard,
  ]

  return (
    <>
      <Header />

      <main className="pelican">
        <div>
          <h1>Tours &amp; Lessons</h1>
          <Experience />
          <h2><Link to="/tours-lessons/compare">Compare Tours</Link></h2>
          <BookNow />
          <hr />


        </div>
        <PaddleLocationDeck
          {...query.allStrapiLocation}
          background={false}
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
            {sport.nodes.map((tour: CardType) => (
              <Ticket
                key={tour.id}
                {...tour}
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
      title={`Tours and Lessons | ${useSiteMetadata().title}`}
      description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
