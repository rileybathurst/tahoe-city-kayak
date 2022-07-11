import * as React from "react";
import { Link } from "gatsby";

import Header from "../components/header"
import Footer from "../components/footer"

import WaterTexture from "../images/watertexture";
import BookNow from "../components/peek/book-now";

function HourMin(props) {
  if (props.time) {
    let hours = props.time.split(':')[0];
    let mins = props.time.split(':')[1];
    return (
      <>{hours}:{mins}</>
    );
  } else {
    return null;
  }
}

function Spec(props) {
  if (props.name === "Tour Completiion" || props.name === "Tour Start Time") {
    return (
      <>
        <h2>{props.name}</h2>
        <h3><HourMin time={props.spec} /></h3>
      </>
    );
  } else if (props.spec) {
    return (
      <>
        <h2>{props.name}</h2>
        <h3>{props.spec}</h3>
        <hr />
      </>
    );
  } else {
    return null;
  }
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
            <a href={tour.peek}
              rel="no"
              className="book-now"
            >
              BOOK NOW
            </a>
            <p>* Prices based on a<br />
              {tour.minimum} person minimum</p>
          </div>

          <Spec name="Tour Start Time" spec={tour.start} />

          <Spec name="Tour Completiion" spec={tour.finish} />

          <Spec name="Duration" spec={tour.duration} />

          <Spec name="Fitness Level" spec={tour.fitness} />
          <h2>Starts At</h2>
          <h3>Tahoe City</h3>
          <a href="{/* // TODO */}">Google Maps</a>
        </div>
        <div>
          <WaterTexture />
        </div>

      </main>
      <article className="single__description">
        <p>{tour.information.data.information}</p>
      </article>
      <div className="single__book">
        <BookNow />
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
