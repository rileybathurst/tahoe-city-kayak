import * as React from "react"
import { Link } from 'gatsby';
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

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
      {/*       <SEO
        title={`${title}${TitleTemplate}`}
        description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
      /> */}


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
      title={`Rentals${TitleTemplate}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
