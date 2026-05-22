import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import AboutUs from "../content/about-us";
import Hero from "../components/hero";

import { PaddleTestimonial, type PaddleTestimonialTypes, PaddleCard } from "@rileybathurst/paddle";
import { TeamCardTypes } from "../types/team-card-types";

const AboutPage = () => {

  type aboutTypes = {
    strapiTestimonial: PaddleTestimonialTypes;
    allStrapiTeam: {
      nodes: teamTypes[]
    }
    strapiBranch: {
      name: string
    }
  }

  const data: aboutTypes = useStaticQuery(graphql`
    query AboutPageQuery {

      allStrapiTeam(filter: {branches: {elemMatch: {slug: {eq: "tahoe-city"}}}}) {
      nodes {
        id
        title: name
        slug
        excerpt

        image: profile {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
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
    <>
      <Header />

      <Hero />

      <main>
        <h1>About Us</h1>
        <AboutUs />

        <ul>
          <li key="faq"><Link to="/about/faq">Frequently Asked Questions</Link></li>
          <li key="info"><Link to="/about/information">Paddlesports Information</Link></li>
          <li key="policies"><Link to="/about/policies">Store Policies</Link></li>
          <li key="jobs"><Link to="/about/jobs">Jobs</Link></li>
          <li key="protect"><Link to="/about/protect">Protect Lake Tahoe</Link></li>
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

        <section className="deck">
          {data.allStrapiTeam.nodes.map((team: TeamCardTypes) => (
            <PaddleCard
              key={team.id}
              {...team}
              link={`/about/team/${team.slug}`}
            />
          ))}
        </section>

      </section>


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
    </>
  )
}

export default AboutPage

// this isnt a https://schema.org/AboutPage as thats about creative works
export const Head = () => {
  return (
    <SEO
      title='About Us'
      description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
