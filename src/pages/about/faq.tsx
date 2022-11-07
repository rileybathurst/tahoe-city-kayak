import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";

const FaqPage = () => {
  let title = "Frequently Asked Questions";
  let parent = "about";

  return (
    <>
      <Header />

      {/* // TODO: test rich results */}
      <Seo
        title={title}
        description="What is the best time of day to go paddling?"
        itemType="https://schema.org/FAQPage"
        itemScope={true}
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
          <Link to={`/${parent}`} itemProp="item">
            <span itemProp="name">{parent}</span>
            <meta itemProp="position" content="2" />
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
            <meta itemProp="position" content="3" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>

        <StaticQuery
          query={query}
          render={data => (
            <ul className="faq">
              {
                data.allStrapiFaq.edges.map(faq => (
                  <li key={faq.node.id} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h2 itemProp="name">{faq.node.question}</h2>
                    <h3 itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <span itemProp="text">{faq.node.answer}</span>
                    </h3>
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