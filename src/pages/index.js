import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import { Link } from "gatsby"

function TwoKayakers() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tck-slide-2.jpg"
    alt="two kayakers paddling across lake Tahoe"
    className="img__wrapped"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

const IndexPage = () => {
  return (
    <>
      <Header />
      <main className="home__main">
        <section>
          <h2><Link to="/rentals-demos">On Water Rentals</Link></h2>
          <article className="home__main--season">
            <p>Season: May &ndash; October<br />
              Open Daily<br />
              9:30am &ndash; 5:30pm<br />
              Weather Permitting
            </p>

            <p>Located at<br />
              Commons Beach<br />
              400 North Lake Blvd,<br />
              Tahoe City 96145
            </p>
          </article>

          <div className="button__double">
            <button>RENTALS &amp; DEMOS<br />
              BOOK NOW</button>

            <button>TOURS &amp; LESSONS<br />
              BOOK NOW</button>
          </div>


          <p>Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak sales , SUP rentals, kayak rentals and tours. We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.</p>
          {/* <hr /> */}
        </section>

        <section>
          <TwoKayakers />
        </section>
      </main>

      <section id="rentals-demos">
        {/* <div> */}
        <h3>
          <Link to="rentals-demos">
            Rentals &amp; Demos
          </Link>
        </h3>
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
          {/* </div> */}

          <PricingChart />
        </article>
        <hr />
      </section>


      <section id="tours-lessons">
        <h3>Tours &amp; Lessons</h3>
        <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        <button>Book Now</button>
        <hr />
      </section>

      <section id="retail">
        <h3>Retail</h3>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, touring, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel.</p>

        <p>Our Store and our retail prices are competitive with big-city retailers! Hobie, Wilderness Systems, Eddyline, Tahoe SUP, Pau Hana, Amundson, Bic Paddlesurf and more. Try before you buy!</p>

        <p>Retail and Reservations
          Open 7 days a week 9:00am&ndash;6:00pm</p>

        <p>Located at
          <address>
            521 N Lake Blvd<br />
            Tahoe City,<br />
            CA 96145
          </address>
        </p>
        <hr />
      </section>

      <Footer />
    </>
  )
}

export default IndexPage
