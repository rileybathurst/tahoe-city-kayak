import * as React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

const ToursLessonsPage = () => {
  return (
    <>
      <Header />
      <main>
        <h3>Tours &amp; Lessons</h3>
        <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        <button>Book Now</button>
        <hr />
      </main>
      <Footer />
    </>
  )
}

export default ToursLessonsPage
