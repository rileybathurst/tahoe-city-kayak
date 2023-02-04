import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";

const NotFoundPage = () => {
  let title = "404";

  return (
    <>
      <Header />

      <main>
        <h1>Page not found</h1>
        <p>
          Sorry we couldn’t find what you were looking for.
          <br />
          <Link to="/">Go home</Link>.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head = () => {
  return (
    <SEO
      title={`404 | ${useSiteName()}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}