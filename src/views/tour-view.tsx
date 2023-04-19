import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import Header from "../components/header"
import Footer from "../components/footer"

import Time from "../components/time";
import Fitness from "../components/fitness";
import HourMin from "../components/hour-min"; // TODO check if this should be the time compoonent
import Sport from "../components/sport";
import WaterTexture from "../images/watertexture";
import MapSVG from "../images/map";
import MapIconSVG from "../images/map-icon";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";
import ParentTitleBreadcrumb from "../components/parent-title-breadcrumb";

import Kayaker from "../images/kayaker";
import Supper from "../images/supper";

import Composition from "../components/composition";

import Balancer from 'react-wrap-balancer'
// import balanceText from "balance-text";

function Paddler(props) {
  if (props.sport === "kayak") {
    return (
      <Kayaker />
    );
  } else {
    return (
      <Supper />
    );
  }
}

function ReactMD(props) {
  return (
    <ReactMarkdown
      children={props.raw}
      remarkPlugins={[remarkGfm]}
    />
  );
}

function Spec(props) {
  if ((props.name === "Tour Completiion" || props.name === "Tour Start Time") && props.spec === null) {
    return null;
  }
  else if (props.name === "Tour Completiion" || props.name === "Tour Start Time") {
    return (
      <div className="spec" >
        <h2>{props.name}</h2>
        <h3><HourMin time={props.spec} /></h3>
      </div>
    );
  } else if (props.name === "Sport") {
    return (
      <div className="spec" >
        <h2><Sport sport={props.name} /></h2>
        <h3 className="spec-flex">
          <span className="specification"><Sport sport={props.spec} /></span>
        </h3>
      </div>
    );
  } else if ((props.spec) && (props.unitPlace == "before")) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex unit-place__before">
          <span className="specification">{props.spec}</span>
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  } else if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex">
          <span className="specification">{props.spec}</span>
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  } else {
    return null;
  }
}

function Minimum(props) {
  if (props.minimum) {
    return (
      <p>* Prices based on a<br />
        {props.minimum} person minimum</p>
    );
  } else {
    return null;
  }
}

function TourName(props) {
  {/* // * this will hopefully get replace with css text-wrap: balance */ }
  let name = props.tour;
  console.log(name.length);
  if (name.length > 20) {

    return (
      <Balancer>{props.tour}</Balancer>
    );
  } else {
    return (
      <>
        {props.tour}
      </>
    );
  }
}

const TourView = ({ tour, other }) => {

  return (
    <>
      <Header />

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to={`/tours-lessons`}>Tours &amp; Lessons</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{tour.name}</li>
        </ol>
      </nav>

      <main className="main__full main__full--tour">
        <div>
          <h1><TourName tour={tour.name} /></h1>
          {/* <h1 className="tour-name">{tour.name}</h1> */}
          <div className="tour__minimum">
            <a href={tour.peek}
              rel="noopener noreferrer"
              className="book-now"
            >
              BOOK NOW
            </a>
            <Minimum minimum={tour.minimum} />
          </div>

          <Spec name="Sport" spec={tour.sport} />

          <Spec name="Tour Start Time" spec={tour.start} />

          <Spec name="Tour Completiion" spec={tour.finish} />

          <Spec name="Duration" spec={tour.duration} unit="mins" />

          <Spec name="Fitness Level" spec={tour.fitness} />

          <div className="spec">
            <h2>Starts At</h2>
            {/* // TODO I dont have this querying its just hard coded and is like this multiple places */}
            <MapLink><h3>Tahoe City</h3></MapLink>
          </div>

          <Spec name="Price" spec={tour.price} unit="$" unitPlace="before" />

          <article className="single__description">
            <ReactMD
              raw={tour.information?.data?.information}
            />
          </article>

        </div>

        <section>
          <Composition sport={tour.sport} />

          <hr />
          <div className="here__location here__card card--split">
            <MapLink>
              <KayakIcon />
              <p>
                <strong>Tour Start Location</strong><br />
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145<br />
              </p>
            </MapLink>
            <Link to="/map">
              <MapIconSVG />
              <p>
                View The Map<br />
                For The Store,<br />
                Tours, Rentals, Parking<br />
                and Directions
              </p>
            </Link>
          </div>
        </section>

      </main>

      <div className="single__book single__book--tour">
        <a
          href={tour.peek}
          rel="noopener noreferrer"
          className="book-now"
        >
          BOOK NOW
        </a>
      </div>

      <div className="single__other">
        <h3>Other Tours &amp; Lessons</h3>
        <h4><Link to={`/tours-lessons/compare/?${tour.slug}`}>Compare the {tour.name} to another tour or lesson.</Link></h4>

        <section className="deck">
          {other.nodes.map(tour => (
            <article
              key={tour.id}
              className="card"
            >
              <GatsbyImage
                image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                alt={tour?.ogimage?.alternativeText}
                className="card__image"
              />
              <h4 className="card__title">
                <Link to={`/tours-lessons/${tour.slug}`}>
                  {tour.name}
                </Link>
              </h4>
              <div className="card__specs">
                <Time
                  start={tour.start}
                  finish={tour.finish}
                  duration={tour.duration}
                />
                <Fitness fitness={tour.fitness} />
              </div>
              <hr />
              <p>{tour.excerpt}</p>
              <hr />
              <div className="card__details">
                <h5>${tour.price}</h5>
                <a
                  href={tour.peek}
                  className="book-now"
                >
                  BOOK NOW
                </a>
              </div>
            </article>
          ))}
        </section>

      </div>
      <Footer />
    </>
  );
};

export default TourView;
