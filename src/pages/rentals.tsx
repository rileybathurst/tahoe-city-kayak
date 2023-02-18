import * as React from "react"
import { Link } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";
// import Rentals from "../content/rentals";

// import Rentals from "../components/locations/rentals"; // I dont want all the info
import CarIcon from "../images/car";

import TextureBackgrounds from "../components/texturebackgrounds";
import WaterTexture from "../images/watertexture";

import Kayaker from "../images/kayaker";
import BookNow from "../components/peek/book-now";


function Sand() {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jim-gade-eYWNaMffWHI-unsplash.jpg"
    alt="sand texture"
    className="sand_texture"
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

const RentalsPage = () => {
  let title = "Rentals";

  return (
    <>
      <Header />
      <main className="rentals">
        <article className="info">
          {/* classes relate to grid area */}
          <h1>{title}</h1>
          <h2>Season: May &ndash; October</h2>
          <p>
            Open Daily<br />
            9:30am &ndash; 5:30pm<br />
            Weather Permitting
          </p>

          {/*           <hgroup className="crest">
            <h3 className="brow">Brow</h3>
            <h4 className="supra">Supra</h4>
          </hgroup> */}


          <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our kayak and standup paddleboard rentals.</p>
          <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>

          <p><Link to="/rentals/truckee-river">Learn about our Truckee River rentals</Link></p>

          {/* // TODO should this be a dropdown? */}
          <Link to="/about/faq">Frequently Asked Questions about getting out on the water</Link>

        </article>
        <div className="montage">
          <Sand />
          <WaterTexture className="water_texture" />
          <Kayaker />
        </div>

        <BookNow />

        <div className="here__location here__card">
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
            <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">
              <CarIcon />
            </a>
            <p><strong>Free Parking Lot</strong><br />
              <a href="https://goo.gl/maps/KKnWemDFuiYUHsrn7" rel="noopener noreferrer">Commons Beach Rd<br />
                Tahoe City 96145
              </a>
            </p>
          </section>
        </div>

      </main>

      <Footer />
    </>
  )
}

export default RentalsPage

export const Head = () => {
  return (
    <SEO
      title={`Rentals | ${useSiteName()}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
