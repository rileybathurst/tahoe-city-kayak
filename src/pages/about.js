import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <>
      <Header />

      <Seo
        title="About Us"
      />

      <main>
        <h1>About Us</h1>
        <p>Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak sales , SUP rentals, kayak rentals and tours. We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.</p>
      
        <h2><Link to="/faq">Frequently Asked Questions</Link></h2>
        <h2><Link to="/information">Paddlesports Information</Link></h2>
        <h2><Link to="/policies">Store Policies</Link></h2>
      
      </main>
      <Footer />
    </>
  )
}

export default AboutPage
