import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"

import Time from "../components/time";
import Fitness from "../components/fitness";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";

import BookNow from "../components/peek/book-now";
import ToursLessons from "../content/tours-lessons";

const ToursLessonsPage = () => {
  let title = "Tours & Lessons";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <div className="location_card-wrapper">
        <div>
          <h1>{title}</h1>
          <ToursLessons />
          <BookNow />
          <hr />
        </div>

        <div className="here__location here__card">
          <KayakIcon />
          <p>
            <strong>On Water Rental</strong><br />
            <MapLink>
              Commons Beach<br />
              400 North Lake Blvd,<br />
              Tahoe City 96145<br />
            </MapLink>
          </p>

          <p>
            May &ndash; October<br />
            Open Daily<br />
            9:30am &ndash; 5:30pm<br />
            Weather Permitting<br />
          </p>
        </div>
      </div>

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
                <h1>Paddleboard</h1>
                <h2>Tours &amp; Lessons</h2>
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