import * as React from "react"
import { Link } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";
import Rentals from "../content/rentals";

const RentalsPage = () => {
  let title = "Rentals";

  return (
    <>
      <Header />

      <div className="location_card-wrapper">
        <div>
          <h1>{title}</h1>
          <Rentals />
          <h4>Season: May &ndash; October</h4>
        </div>

        <div className="here__location here__card">
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

          <p>
            May &ndash; October<br />
            Open Daily<br />
            9:30am &ndash; 5:30pm<br />
            Weather Permitting<br />
          </p>
        </div>

      </div>

      <main>
        <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>
        <PricingChart />
        <hr />
      </main>

      <Footer />
    </>
  )
}

export default RentalsPage

export const Head = () => {
  return (
    <SEO
      title={`Rentals - ${useSiteName()}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
