// TODO: move to strapi

import * as React from "react";
import { Link, graphql, useStaticQuery } from 'gatsby';
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import ReactMarkdown from 'react-markdown';
import Phone from "../../components/phone";

const PoliciesPage = () => {

  const { allStrapiPolicy } = useStaticQuery(graphql`
    query PoliciesQuery {
      allStrapiPolicy {
        nodes {
          id
          title
          markdown {
            data {
              markdown
            }
          }
        }
      }
    }
  `)

  interface PolicyTypes {
    id: string,
    title: string,
    markdown: {
      data: {
        markdown: string
      }
    }
  }

  return (
    <>
      <Header />

      <main>

        <h1>Store Policies</h1>
        {allStrapiPolicy.nodes.map((policy: PolicyTypes) => (
          <article key={policy.id}>
            <h2>{policy.title}</h2>
            {policy.markdown ?
              <ReactMarkdown>
                {policy.markdown.data.markdown}
              </ReactMarkdown>
              : null}
            <hr />
          </article>
        ))}
        <Phone />
      </main>


      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Store Policies</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}

export default PoliciesPage

export const Head = () => {
  return (
    <SEO
      title='Store Policies'
      description="Transportation, Tour Booking Procedure and Cancellation Policy."
      breadcrumbs={[
        { name: "About", item: "about" },
        { name: "Store Policies", item: "policies" }
      ]}
    />
  )
}
