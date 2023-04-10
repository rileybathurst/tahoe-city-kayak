import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import { StrapiMap } from "../../components/map";

import Header from "../../components/header";
import Footer from "../../components/footer";

import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";


const FaqPage = () => {

  const { allStrapiFaq } = useStaticQuery(graphql`
    query FaqQuery {
      allStrapiFaq {
        nodes {
          id
          question
          answer
        }
      }
    }
  `)

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

        {/* // TODO links to delivery and demos */}

        <ul className="faq">
          {allStrapiFaq.nodes.map((faq:
            {
              id: string;
              question: string;
              answer: string;
            }) => (
            <li key={faq.id}>
              <h2>{faq.question}</h2>
              <p>
                <span>{faq.answer}</span>
              </p>
            </li>
          ))
          }
        </ul>
      </main>

      <Footer />
    </>
  )
}

export default FaqPage

export const Head = () => {
  return (
    <SEO
      title={`Frequently Asked Questions | ${useSiteName()}`}
    >
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
