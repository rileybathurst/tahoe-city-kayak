import * as React from "react"
import { Link } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Seo from "../components/seo";
// import MapStore from "../components/map-store";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";

const RentalsPage = () => {
  let title = "Rentals";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>
        <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>

        <article>
          <h4>Season: May &ndash; October</h4>
          <div className="here__location here__card">
            <KayakIcon />
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

          <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>

          <PricingChart />
        </article>
        <hr />
      </main>

      <Footer />
    </>
  )
}

export default RentalsPage
