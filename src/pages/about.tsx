import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import AboutUs from "../content/about-us";
import Hero from "../components/hero";

import { PaddleTestimonial, type PaddleTestimonialTypes, type PaddleCardTypes } from "@rileybathurst/paddle";
import { TeamCards } from "../components/team-cards";

const AboutPage = () => {

  // TODO: nodes: PaddleCardTypes[] isnt right but if it lets me through get it running

  type aboutTypes = {
    strapiTestimonial: PaddleTestimonialTypes;
    allStrapiTeam: {
      nodes: PaddleCardTypes[]
    }
    strapiBranch: {
      name: string
    }
  }

  // TODO: remove the team (filter: {branches: {elemMatch: {slug: {eq: "tahoe-city"}}}})
  const data: aboutTypes = useStaticQuery(graphql`
    query AboutPageQuery {

      allStrapiTeam {
        nodes {
          ...TeamCardFragment
        }
      }

      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
      }


      strapiTestimonial(branch: {slug: {eq: "tahoe-city"}}) {
        ...TestimonialFragment
      }

    }
  `)

  // console.log(data.strapiTestimonial);

  return (
    <React.Fragment>
      <Header />

      <Hero />

      <main>
        <h1>About Us</h1>
        <AboutUs />

        <ul className="denali font-serif">
          <li key="faq"><Link to="/about/faq">Frequently Asked Questions</Link></li>
          <li key="info"><Link to="/about/information">Paddlesports Information</Link></li>
          <li key="policies"><Link to="/about/policies">Store Policies</Link></li>
          <li key="jobs"><Link to="/about/jobs">Jobs</Link></li>
          <li key="protect"><Link to="/about/protect">Protect Lake Tahoe</Link></li>
          <li key="testimonials"><Link to="/about/testimonials">Testimonials</Link></li>
        </ul>

        <hr />
      </main>

      <section className="pelican">
        <h3 className="font-serif">
          <Link to="/about/team">
            Team
          </Link>
        </h3>
        <p>Meet the team at {data.strapiBranch.name} Kayak & Paddleboard</p>
        <hr />
      </section>

      <TeamCards />

      {/* // * specifically using a single here */}
      <section className="panel denali-padding-block">
        <h3 className="pelican font-serif">
          <Link to="/about/testimonials">
            Testimonials
          </Link></h3>
        <ul className='pelican aconcagua-margin-block-end'>
          <PaddleTestimonial {...data.strapiTestimonial} />
        </ul>
      </section>

      <Footer />
    </React.Fragment>
  )
}

export default AboutPage

// this isnt a https://schema.org/AboutPage as thats about creative works
// TODO: strapi
export const Head = () => {
  return (
    <SEO
      title='About Us'
      description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
