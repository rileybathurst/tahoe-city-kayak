import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";
import MapSVG from "../images/map";
import Complete from "../components/locations/complete";

const MapPage = () => {
  let title = "Map";

  return (
    <>
      <Header />

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
      title={`Map - ${useSiteName()}`}
    // TODO description and image
    />
  )
}
