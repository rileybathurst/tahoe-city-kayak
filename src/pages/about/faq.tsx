import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import TitleTemplate from "../../components/title-template";
import Url from "../../components/url";

// import True from "../../components/true";
import { Strapi } from "../../components/strapi";
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
      title={`FAQ${TitleTemplate}`}
    >
      {/* // ! this might be the first query im doing thats not basee level */}
      {/* <Strapi /> */}
      <StrapiMap />

      <meta name="test" content={Url} />

      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          name: "FAQ Breadcrumb List",
          "itemListElement":
          [
          {
            "@type": "ListItem",
          "position": 1,
          "item":
          {
            "@id": "${Url}"dresses",
        "name": "Dresses"
      }
    },
        {
          "@type": "ListItem",
        "position": 2,
        "item":
        {
          "@id": "https://example.com/dresses/real",
        "name": "Real Dresses"
          }
          }
        ]
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