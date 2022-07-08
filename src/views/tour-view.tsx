import * as React from "react";
import { Link, StaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"

function WaterTexture(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
    alt="water texture"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

const TourView = ({ tour, other }) => {
  return (
    <>
      <Header />
      {/* // TODO: Breadcrumbs */}
      <main className="main__full">
        <div>
          <h1>{tour.name}</h1>
          <div>
            <button>${/* // TODO */} Book Now</button>
            <p>* Prices based on a
              {/* // TODO */} person minimum</p>
          </div>
          <hr />
          <h2>Tour Start Time</h2>
          <h3>{/* // TODO */}</h3>
          <hr />
          <h2>Tour Completion</h2>
          <h3>{/* // TODO */}</h3>
          <hr />
          <h2>Fitness Level</h2>
          <h3>{/* // TODO */}</h3>
          <hr />
          <h2>Starts At</h2>
          <h3>{/* // TODO */}</h3>
          <a href="{/* // TODO */}">Google Maps</a>
        </div>
        <div>
          <WaterTexture />
        </div>

      </main>
      <article className="single__description">
        <p>Tour Description</p>
      </article>
      <div className="single__book">
        <button>$ {/* // TODO */} Book Now</button>
      </div>

      <div className="single__other">
        <h3>Other Tours &amp; Lessons</h3>


        <section className="deck">
          {other.nodes.map(tour => (
            <article className="card">
              <WaterTexture className="card__placeholder" />
              <h4 className="card__title">
                <Link to={`/tours/${tour.slug}`}>
                  {tour.name}
                </Link>
              </h4>
            </article>
          ))}
        </section>

      </div>
      <Footer />
    </>
  );
};

export default TourView;
