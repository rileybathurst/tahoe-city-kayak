import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import Header from "../components/header"
import Footer from "../components/footer"
import Seo from "../components/seo";
import Time from "../components/time";
import Fitness from "../components/fitness";
import HourMin from "../components/hour-min";

import WaterTexture from "../images/watertexture";

function Kayaker(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.webp"
    alt="tahoe city kayak kayaker"
    className={`${props.className} paddler img__wrapped`}
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Supper(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash.webp"
    alt="tahoe city kayak supper"
    className={`${props.className} paddler img__wrapped`}
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

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
  } else if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3>{props.spec} {props.unit}</h3>
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

const TourView = ({ tour, other }) => {
  return (
    <>
      <Header />
      <Seo
        title={tour.name}
      />
      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/tours-lessons">Tours &amp; Lessons</Link>&nbsp;/&nbsp;
        &nbsp;&nbsp;{tour.name}
      </div>

      <main className="main__full main__full--tour">
        <div>
          <h1>{tour.name}</h1>
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
            <h3>Tahoe City</h3>
            <a href="{/* // TODO */}">Google Maps</a>
          </div>
        </div>
        <div className="collage tour-collage">
          <GatsbyImage
            image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
            alt={tour?.ogimage?.alternativeText}
            className="card__image tour_texture"
          />
          <WaterTexture className="texture card__image" />
          <Paddler sport={tour.sport} />
        </div>

      </main>
      <article className="single__description">
        <ReactMD
          raw={tour.childStrapiTourInformationTextnode?.information}
        />
      </article>
      <div className="single__book">
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

        {/* // TODO this could be by specific sport */}
        <section className="deck">
          {other.nodes.map(tour => (
            <article className="card">
              <GatsbyImage
                image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
                alt={tour?.ogimage?.alternativeText}
                className="card__image"
              />
              <h4 className="card__title">
                <Link to={`/tours/${tour.slug}`}>
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
