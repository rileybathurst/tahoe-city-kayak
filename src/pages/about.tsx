import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import AboutUs from "../content/about-us";

import Composition from "../components/composition";

const AboutPage = () => {

  return (
    <>
      <Header />
      <div className="albatross wrap">

        <main>
          <div className="condor">
            <h1>About Us</h1>
            {/* // ? I might be able to query this its not the slogan but its almost the same maybe a single strapi */}
            <AboutUs />

            <ul>
              <li key="faq"><Link to="/about/faq">Frequently Asked Questions</Link></li>
              <li key="info"><Link to="/about/information">Paddlesports Information</Link></li>
              <li key="policies"><Link to="/about/policies">Store Policies</Link></li>
              <li key="testimonials"><Link to="/about/testimonials">Testimonials</Link></li>
              <li key="team"><Link to="/about/team">Team</Link></li>
              <li key="jobs"><Link to="/about/jobs">Jobs</Link></li>
              <li key="protect"><Link to="/about/protect">Protect Lake Tahoe</Link></li>
            </ul>
          </div>
        </main>

        {/* // TODO: this is starting to feel messy */}
        <div>
          <div className="condor">
            <Composition />
          </div>
        </div>
      </div>

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
