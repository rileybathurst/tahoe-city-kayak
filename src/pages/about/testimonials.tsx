import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { PaddleTestimonials } from "@rileybathurst/paddle";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

const TestimonialsPage = () => {

  const { allStrapiTestimonial } = useStaticQuery(graphql`
    query TestimonialsQuery {
      allStrapiTestimonial(filter: {local: {slug: {eq: "tahoe-city"}}}) {
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

  return (
    <>
      <Header />

      <main className="condor">
        <h1>Testimonials</h1>
        <hr />

        <PaddleTestimonials {...allStrapiTestimonial} />
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Testimonials</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
}

export default TestimonialsPage

export const Head = () => {
  return (
    <SEO
      title='Testimonials'
      description="Testimonials from our customers."
      breadcrumbs={[
        { name: "About", item: "about" },
        { name: "Testimonials", item: "testimonials" }
      ]}
    />
  )
}
