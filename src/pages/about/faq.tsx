import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import { StrapiMap } from "../../components/map";

import Header from "../../components/header";
import Footer from "../../components/footer";

import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";


const FaqPage = () => {
  let title = "Frequently Asked Questions";
  let parent = "about";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />
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
      title={`Frequently Asked Questions - ${useSiteName()}`}
    >

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
              "item": "${useSiteUrl()}/about"
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