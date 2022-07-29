import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

const AboutPage = () => {
  let title = "About Us";

  return (
    <>
      <Header />

      {/* // TODO test rich results */}
      <Seo
        title={title}
        description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and SUP sales, rentals and tours."
        itemType="https://schema.org/AboutPage"
        itemScope={true}
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to="/" itemprop="item">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="item">
            <span
              itemprop="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemprop="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
        {/* // ? I might be able to query this its not the slogan but its almost the same maybe a single strapi */}
        <p>Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak sales , SUP rentals, kayak rentals and tours. We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.</p>

        <ul>
          <li><Link to="/about/faq">Frequently Asked Questions</Link></li>
          <li><Link to="/about/information">Paddlesports Information</Link></li>
          <li><Link to="/about/policies">Store Policies</Link></li>
          <li><Link to="/about/testimonials">Testimonials</Link></li>
        </ul>

      </main>
      <Footer />
    </>
  )
}

export default AboutPage
