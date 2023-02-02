import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import Header from "../components/header";
import Footer from "../components/footer";
// import Here from "../components/here";
import MapSVG from "../images/map";
import Complete from "../components/locations/complete";

const MapPage = () => {
  let title = "Map";

  return (
    <>
      <Header />

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
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
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
      </main>
      <div className="home__here">
        <Complete />
        <MapSVG />
      </div>

      <Footer />
    </>
  )
}

export default MapPage

export const Head = () => {
  return (
    <SEO
      title={`Map${TitleTemplate}`}
    // TODO description and image
    />
  )
}
