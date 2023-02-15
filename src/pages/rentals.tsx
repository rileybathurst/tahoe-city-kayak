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
import Parking from "../components/locations/parking";

import TextureBackgrounds from "../components/texturebackgrounds";
import WaterTexture from "../images/watertexture";

import Kayaker from "../images/kayaker";


const RentalsPage = () => {
  let title = "Rentals";

  return (
    <>
      <Header />
      <main>
        <article className="main__full main__full--tour">
          <section>
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
          </section>

          <div className="collage tour-collage">
            <TextureBackgrounds />
            <WaterTexture className="texture card__image" />
            <Kayaker />
          </div>
        </article>

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
          <Parking />
        </div>


        <p>You could also have your rental kayak or paddleboard delivered to a Tahoe destination of your choosing</p>
        <PricingChart /> {/* // ? this is in the footer do we need it here? */}
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
      title={`Rentals | ${useSiteName()}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our demos."
    />
  )
}
