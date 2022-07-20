import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

const FaqPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="Frequntly Asked Questions"
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        Frequently Asked Questions
      </div>

      <main>
        <h1>Frequently Asked Questions</h1>

        <StaticQuery
          query={query}
          render={data => (
            <ul className="faq">
              {
                data.allStrapiFaq.edges.map(faq => (
                  <li key={faq.node.id}>
                    <h2>{faq.node.question}</h2>
                    <h3>{faq.node.answer}</h3>
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