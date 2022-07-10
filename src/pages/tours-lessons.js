import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../components/header"
import Footer from "../components/footer"

import WaterTexture from "../images/watertexture";
import BookNow from "../components/peek/book-now";

const ToursLessonsPage = () => {
  return (
    <>
      <Header />
      <main>
        <h3>Tours &amp; Lessons</h3>
        <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        <BookNow />
        <hr />
      </main>


      <StaticQuery
        query={query}
        render={data => (
          <section className="deck">
            {
              data.allStrapiTour.edges.map(tour => (
                <article key={tour.node.id} className="card">
                  <WaterTexture className="card__placeholder" />
                  <h4 className="card__title">
                    <Link to={`/tours/${tour.node.slug}`}>
                      {tour.node.name}
                    </Link>
                  </h4>
                  <hr />
                  <p>{tour.node.information.data.information}</p>
                  <hr />
                  <div className="card__details">
                    <h5>${tour.node.price}</h5>
                    <a
                    href={tour.node.name}
                    className="book-now"
                    >
                      BOOK NOW
                    </a>
                  </div>
                </article>
              ))
            }
          </section>
        )}
      />

      <Footer />
    </>
  )
}

export default ToursLessonsPage

const query = graphql`
query ToursQuery {
  allStrapiTour {
    edges {
      node {
        id
        name
        slug
        peek
        price
        information {
          data {
            information
          }
        }
      }
    }
  }
}
`