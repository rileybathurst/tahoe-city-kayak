import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";
import MapSVG from "../images/map";
import Complete from "../components/locations/complete";

const AboutPage = () => {
  let title = "About Us";

  return (
    <>
      <Header />

      {/* // TODO test rich results */}
      <Seo
        title={title}
        description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
        itemType="https://schema.org/AboutPage"
        itemScope={true}
      />

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
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
        {/* // ? I might be able to query this its not the slogan but its almost the same maybe a single strapi */}
        <p>Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak sales , padddleboard rentals, kayak rentals and tours. We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.</p>

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
