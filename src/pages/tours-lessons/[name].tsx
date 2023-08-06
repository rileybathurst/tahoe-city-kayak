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

        {/* // TODO: this should be a component */}
        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        {/* // TODO: this is a broken tour page add a set of tours it should be with cards */}
      </main>
      <Footer />
    </>
  )
}

export default TourCatchAll
