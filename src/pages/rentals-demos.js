import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Seo from "../components/seo";
import MapStore from "../components/map-store";

const RentalsDemosPage = () => {
  let title = "Rentals & Demos";

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
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to="/" itemprop="item">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="item">
            <span
              itemprop="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemprop="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h3>{title}</h3>
        <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>

        <article>
          <h4>Season: May &ndash; October</h4>
          <p>On Water Rental Hours<br />
            Located at<br />
            <address>
              <MapStore>
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145
              </MapStore>
            </address>
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
