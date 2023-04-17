import * as React from "react"
import { Link } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";

function TourCatchAll({ params }) {

  // console.log(params);

  return (
    <>
      <Header />
      <main className="measure">
        <h2 className="crest">
          <Link to="/tours-lessons">Tours &amp; Lessons</Link> / {params.name}</h2>

        <h1 className="mixta">Looks like you’ve paddled into uncharted waters!</h1>
        <p>Don’t worry, we’ll help you navigate <Link to="/">back to our homepage.</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}

export default TourCatchAll
