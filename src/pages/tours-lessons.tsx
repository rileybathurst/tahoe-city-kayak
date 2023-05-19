import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo"

import { useSiteName } from '../hooks/use-site-name';
import Header from "../components/header"
import Footer from "../components/footer"
import Time from "../components/time";
import Fitness from "../components/fitness";
import BookNow from "../components/peek/book-now";
import Experience from "../content/experience";
import Ticket from "../components/ticket";

const ToursLessonsPage = () => {

  const query = useStaticQuery(graphql`
    query ToursQuery {
      kayak: allStrapiTour
        (filter: { sport: { eq: "kayak" } })
      {

      nodes {
        id
        name
        slug
        peek
        price
        excerpt
        start
        finish
        duration
        fitness

        ogimage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
  }
  
  sup: allStrapiTour
    (filter: { sport: { eq: "sup" } })
    {

      nodes {
        id
        name
        slug
        peek
        price
        excerpt
        start
        finish
        duration
        fitness

        ogimage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
}
`)

  let kayak = query.kayak;
  let paddleboards = query.sup;

  let title = "Tours & Lessons";

  return (
    <>
      <Header />

      <main className="passage">
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
            <Experience />
            <h2><Link to="/tours-lessons/compare">Compare Tours</Link></h2>
            <BookNow />
            <hr />
          </div>

          <div className="here__location here__card">
            <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our kayak and standup paddleboard rentals.</p>

          </div>
        </div>


        <article className="passage">
          {/* // TODO: only one h and then p */}

          <hgroup>
            <h1>KAYAK</h1>
            <h2>Tours &amp; Lessons</h2>
          </hgroup>
        </article>
        <div className="deck">
          {kayak.nodes.map(tour => (
            <div key={tour.id}>
              <Ticket tour={tour} />
            </div>
          ))
          }
        </div>
        <article className="passage">
          {/* // TODO: only one h and then p */}
          <hgroup>
            <h1>Paddleboard</h1>
            <h2>Tours &amp; Lessons</h2>
          </hgroup>
        </article>
        <div className="deck">
          {paddleboards.nodes.map(tour => (
            <div key={tour.id}>
              <Ticket tour={tour} />
            </div>
          ))
          }
        </div>
      </main>

      < Footer />
    </>
  )
}

export default ToursLessonsPage

export const Head = () => {
  return (
    <SEO
      title={`Tours and Lessons | ${useSiteName()}`}
      description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
