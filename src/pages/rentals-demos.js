import * as React from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"

const RentalsDemosPage = () => {
  return (
    <>
      <Header />
      <main>


        <h3>Rentals &amp; Demos</h3>
        <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>

        <article>
          <h4>Season: May &ndash; October</h4>
          <p>On Water Rental Hours<br />
            Located at<br />
            <address>Commons Beach<br />
              400 North Lake Blvd,<br />
              Tahoe City 96145</address>
          </p>
          <p>Open Daily Weather Permitting 9:30am &ndash;5:30pm</p>

          <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>

          <PricingChart />
        </article>
        <hr />
      </main>

      <Footer />
    </>
  )
}

export default RentalsDemosPage
