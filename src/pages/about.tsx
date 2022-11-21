import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import Header from "../components/header";
import Footer from "../components/footer";
import MapSVG from "../images/map";
import Complete from "../components/locations/complete";
import AboutUs from "../content/about-us";

const AboutPage = () => {
  let title = "About Us";

  return (
    <>
      <Header />

      <main>
        <h1>{title}</h1>
        {/* // ? I might be able to query this its not the slogan but its almost the same maybe a single strapi */}
        <AboutUs />

        {/* // TODO: this needs better spacing */}
        <ul>
          <li><Link to="/about/faq">Frequently Asked Questions</Link></li>
          <li><Link to="/about/information">Paddlesports Information</Link></li>
          <li><Link to="/about/policies">Store Policies</Link></li>
          <li><Link to="/about/testimonials">Testimonials</Link></li>
        </ul>
        <hr />
        {/* <h2>We are here</h2> */}
      </main>

      <div className="home__here">
        {/* // * this is a bad name */}
        <Complete />
        <MapSVG />
      </div>

      <Footer />
    </>
  )
}

export default AboutPage

export const Head = () => {
  return (
    <SEO
      title={`About Us${TitleTemplate}`}
      description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}

{/* // TODO test rich results
  itemType="https://schema.org/AboutPage"
  itemScope={true}
 */ }