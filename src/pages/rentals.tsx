import * as React from "react"
import { Link, graphql, useStaticQuery } from 'gatsby';

import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';

import Header from "../components/header";
import Footer from "../components/footer";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";
import CarIcon from "../images/car";
import BookNow from "../components/peek/book-now";
import Composition from "../components/composition";
import PricingChart from "../components/pricing-chart";

const RentalsPage = () => {

  const { allStrapiRentalRate } = useStaticQuery(graphql`
  query RentalRateQuery {
    allStrapiRentalRate(sort: {order: ASC}) {
      nodes {
        id
        oneHour
        item
        threeHour
        fullDay
        retail {
          slug
        }
      }
    }
  }
`)

  return (
    <>
      <Header />
      {/* // TODO check if this is just progression now */}
      <main className="rentals">
        <article className="info">
          {/* classes relate to grid area */}
          <h1>Rentals</h1>
          <h2>Season: May &ndash; October</h2>
          <p>
            Open Daily<br />
            9:30am &ndash; 5:30pm<br />
            Weather Permitting
          </p>

          <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our kayak and standup paddleboard rentals.</p>
          <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>

          <p><Link to="/rentals/truckee-river">Learn about our Truckee River rentals</Link></p>

          {/* // TODO should this be a dropdown? */}
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

        </article>

        <Composition />

        <div className="rates">
          <div className="specialty_rentals rental-chart">
            <div className="row row-header">
              <h4><span>Rental</span> <span>Rates</span></h4>
              <p>1 Hour</p>
              <p><span>3 Hours</span></p>
              <p><span>Full Day</span></p>
            </div>
            {allStrapiRentalRate.nodes.map((rate: {
              id: React.Key;
              item: string;
              oneHour: number;
              threeHour: number;
              fullDay: number;
            }) => (
              <div key={rate.id} className="row">
                <h4>{rate.item}</h4>
                <p>{rate.oneHour}</p>
                <p>{rate.threeHour}</p>
                <p>{rate.fullDay}</p>
              </div>
            ))}
          </div>
          <BookNow />
        </div>

        {/* // TODO move this to the component or document why its not */}
        <div className="here__location here__card align-self-start">
          <section className="location">
            <MapLink>
              <KayakIcon />
            </MapLink>
            <p>
              <strong>On Water Rental</strong><br />
              <MapLink>
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145<br />
              </MapLink>
            </p>
          </section>
          <section className="location">
            {/* // TODO: make this a variable */}
            <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">
              <CarIcon />
            </a>
            <p><strong>Free Parking Lot</strong><br />
              {/* // TODO: make this a variable */}
              <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd<br />
                Tahoe City 96145
              </a>
            </p>
          </section>
        </div>

      </main >

      <Footer />
    </>
  )
}

export default RentalsPage

export const Head = () => {
  return (
    <SEO
      title={`Rentals | ${useSiteMetadata().title}`}
      description="Enjoy the majesty of paddling across the crystal clear waters of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
