import * as React from "react"
import { Link } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";

function TourCatchAll({ params }) {
  return (
    <>
      <Header />
      <main className="measure">
        <h2 className="crest">404</h2>
        {/* // TODO: get this write up */}
        <h1 className="mixta">Oops! Looks like this page has left the party.</h1>
        <p>Want to brighten up?<br />
          <Link to="/">Head to our home page.</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}

export default TourCatchAll
