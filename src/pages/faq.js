import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Header from "../components/header"
import Footer from "../components/footer"

const FaqPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Frequently Asked Questions</h1>



        <StaticQuery
          query={query}
          render={data => (
            <ul>
              {
                data.allStrapiFaq.edges.map(faq => (
                  <li key={faq.node.id}>
                    <h2>{faq.node.question}</h2>
                    <h3>{faq.node.answer}</h3>
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
query FaqQuery {
  allStrapiFaq {
    edges {
      node {
        id
        question
        answer
      }
    }
  }
}
`