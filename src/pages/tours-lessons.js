import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"

import WaterTexture from "../images/watertexture";

const ToursLessonsPage = () => {
  return (
    <>
      <Header />
      <main>
        <h3>Tours &amp; Lessons</h3>
        <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        <button>Book Now</button>
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
                  <p>TODO: add a description</p>
                  <hr />
                  <div className="card__details">
                    <h5>$cost</h5>
                    <button>Book Now</button>
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
      }
    }
  }
}
`