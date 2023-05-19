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

            <article key={tour.id} className="card">
              <Link to={`/tours-lessons/${tour.slug}`}>
                <GatsbyImage
                  image={tour.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                  alt={tour.ogimage?.alternativeText}
                  className="card__image"
                />
              </Link>

              <h4 className="card__title">
                <Link to={`/tours-lessons/${tour.slug}`}>
                  {tour.name}
                </Link>
              </h4>
              <div className="card__specs">
                <Time
                  start={tour.start}
                  finish={tour.finish}
                  duration={tour.duration}
                />
                <Fitness fitness={tour.fitness} />
              </div>
              <hr />
              <p>{tour.excerpt}</p>
              <hr />
              <div className="card__details">
                <h5>${tour.price}</h5>
                <a
                  href={tour.peek}
                  className="book-now"
                >
                  BOOK NOW
                </a>
              </div>
            </article>
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
            <article key={tour.id} className="card">
              <GatsbyImage
                image={tour.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                alt={tour.ogimage?.alternativeText}
                className="card__image"
              />
              <h4 className="card__title">
                <Link to={`/tours-lessons/${tour.slug}`}>
                  {tour.name}
                </Link>
              </h4>
              <div className="card__specs">
                <Time
                  start={tour.start}
                  finish={tour.finish}
                  duration={tour.duration}
                />
                <Fitness fitness={tour.fitness} />
              </div>
              <hr />
              <p>{tour.excerpt}</p>
              <hr />
              <div className="card__details">
                <h5>${tour.price}</h5>
                <a
                  href={tour.peek}
                  className="book-now"
                >
                  BOOK NOW
                </a>
              </div>
            </article>
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
