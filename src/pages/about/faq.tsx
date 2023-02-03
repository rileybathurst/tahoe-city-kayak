import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import TitleTemplate from "../../components/title-template";
import URLQuery from "../../seo/breadcrumb-url";
import { StrapiMap } from "../../components/map";

import Header from "../../components/header";
import Footer from "../../components/footer";


const FaqPage = () => {
  let title = "Frequently Asked Questions";
  let parent = "about";

  return (
    <>
      <Header />

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
                  <li key={faq.node.id}>
                    <h2>{faq.node.question}</h2>
                    <p>
                      <span>{faq.node.answer}</span>
                    </p>
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

export const Head = () => {
  return (
    <SEO
      title={`Frequently Asked Questions${TitleTemplate}`}
    >
      {/* testing */}
      <URLQuery />

      <meta test="what happen here" />
      <meta test="what happen here" />

      {/* // TODO: Naming */}
      <StrapiMap />
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "About",
              "item": "https://example.com/about"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Frequently Asked Questions"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}

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