import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

const FaqPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Testimonials"
      />

      <main>
        <h1>Testimonials</h1>

        <StaticQuery
          query={query}
          render={data => (
            <ul>
              {
                data.allStrapiTestimonial.edges.map(testimonial => (
                  <li key={testimonial.node.id}>
                    <h2>{testimonial.node.customer}</h2>
                    <p>{testimonial.node.testimonial}</p>
                    <p>{testimonial.node.sign}</p>
                    <p>{testimonial.node.location}</p>
                    <hr />
                  </li>
                ))
              }
            </ul>
          )}
        />
      </main>

      <Footer />
    </>
  )
}

export default FaqPage

const query = graphql`
query TestimonialQuery {
  allStrapiTestimonial {
    edges {
      node {
        id
        testimonial
        customer
        sign
        location
      }
    }
  }
}
`