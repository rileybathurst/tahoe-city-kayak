import * as React from "react"
import { useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import { PaddleTestimonials } from "@rileybathurst/paddle";

const TestimonialsPage = () => {

  const { allStrapiTestimonial } = useStaticQuery(graphql`
    query TestimonialsQuery {
      allStrapiTestimonial(filter: {locale: {slug: {eq: "tahoe-city"}}}) {
      nodes {
        id
        testimonial
        customer
        sign
        location
        }
      }
    }
  `)

  /* // TODO: */
  const title = "Testimonials";
  const parent = "about";

  return (
    <>
      <Header />

      <main>
        <h1>Testimonials</h1>
        <hr />

        <PaddleTestimonials {...allStrapiTestimonial} />
      </main>

      {/* // TODO: */}
      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <Footer />
    </>
  );
}

export default TestimonialsPage

export const Head = () => {
  return (
    <SEO
      title={`Testimonials | ${useSiteMetadata().title}`}
      description="Testimonials from our customers."
    >
      {/* <TestimoialSEO /> */}
      {/* // TODO: */}
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "About",
              "item": "${useSiteMetadata().url}/about"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Testimonials"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
