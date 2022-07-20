import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"
import Seo from "../components/seo";
import Time from "../components/time";
import Fitness from "../components/fitness";

import BookNow from "../components/peek/book-now";

const ToursLessonsPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Tours and Lessons"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        Tours &amp; Lessons
      </div>

      <main>
        <h3>Tours &amp; Lessons</h3>
        <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        <BookNow />
        <hr />
      </main>

      <StaticQuery
        query={query}
        render={data => (
          <>
            <article>
              <hgroup>
                <h1>KAYAK</h1><h2>Tours &amp; Lessons</h2>
              </hgroup>
            </article>
            <div className="deck">
              {
                data.kayak.edges.map(tour => (

                  <article key={tour.node.id} className="card">
                    <GatsbyImage
                      image={tour.node?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                      alt={tour.node?.ogimage?.alternativeText}
                      className="card__image"
                    />

                    <h4 className="card__title">
                      <Link to={`/tours/${tour.node.slug}`}>
                        {tour.node.name}
                      </Link>
                    </h4>
                    <div className="card__specs">
                      <Time
                        start={tour.node.start}
                        finish={tour.node.finish}
                        duration={tour.node.duration}
                      />
                      <Fitness fitness={tour.node.fitness} />
                    </div>
                    <hr />
                    <p>{tour.node.excerpt}</p>
                    <hr />
                    <div className="card__details">
                      <h5>${tour.node.price}</h5>
                      <a
                        href={tour.node.peek}
                        className="book-now"
                      >
                        BOOK NOW
                      </a>
                    </div>
                  </article>
                ))
              }
            </div>
            <article>
              <hgroup>
                <h1>SUP</h1><h2>Tours &amp; Lessons</h2>
              </hgroup>
            </article>
            <div className="deck">
              {
                data.sup.edges.map(tour => (
                  <article key={tour.node.id} className="card">
                    <GatsbyImage
                      image={tour.node?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                      alt={tour.node?.ogimage?.alternativeText}
                      className="card__image"
                    />
                    <h4 className="card__title">
                      <Link to={`/tours/${tour.node.slug}`}>
                        {tour.node.name}
                      </Link>
                    </h4>
                    <div className="card__specs">
                      <Time
                        start={tour.node.start}
                        finish={tour.node.finish}
                        duration={tour.node.duration}
                      />
                      <Fitness fitness={tour.node.fitness} />
                    </div>
                    <hr />
                    <p>{tour.node.excerpt}</p>
                    <hr />
                    <div className="card__details">
                      <h5>${tour.node.price}</h5>
                      <a
                        href={tour.node.peek}
                        className="book-now"
                      >
                        BOOK NOW
                      </a>
                    </div>
                  </article>
                ))
              }
            </div>
          </>
        )
        }
      />

      < Footer />
    </>
  )
}

export default ToursLessonsPage

const query = graphql`
query ToursQuery {
  kayak: allStrapiTour
    (filter: { sport: { eq: "kayak" } })
  {
    edges {
      node {
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
  
  sup: allStrapiTour
    (filter: { sport: { eq: "sup" } })
    {
    edges {
      node {
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
}
`