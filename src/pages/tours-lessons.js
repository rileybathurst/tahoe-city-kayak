import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Header from "../components/header"
import Footer from "../components/footer"

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
          <ul className="cards">
            {
              data.allStrapiTour.edges.map(tour => (
                <li key={tour.node.id} className="card">
                  {tour.node.name}
                </li>
              ))
            }
          </ul>
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
      }
    }
  }
}
`