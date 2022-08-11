import * as React from "react"
import { Link } from "gatsby"

import Header from "../src/components/header";
import Footer from "../src/components/footer";

function TourCatchAll({ params }) {
  return (
    <>
      <Header />
      <main className="measure">
        <h2 className="crest">404</h2>
        {/* // TODO: get this write up */}
        <h1 className="mixta">Sorry we couldn’t find what you were looking for.</h1>
        <Link to="/">Head to our home page.</Link>
      </main>
      <Footer />
    </>
  )
}

export default TourCatchAll
