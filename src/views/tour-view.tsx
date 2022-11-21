// TODO this needs the content for tours lessons in this page somehere

import * as React from "react";
import { Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import Header from "../components/header"
import Footer from "../components/footer"

import Time from "../components/time";
import Fitness from "../components/fitness";
import HourMin from "../components/hour-min"; // TODO check if this should be the time compoonent

import WaterTexture from "../images/watertexture";
import MapSVG from "../images/map";
import KayakIcon from "../images/kayak";
import MapLink from "../components/map-link";

function Kayaker(props) {
  return <StaticImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/patrick-fore-UFqV-RqPm8w-unsplash-crop.jpg"
    alt="tahoe city kayak kayaker"
    className={`${props.className} paddler img__wrapped`}
    objectFit="contain"
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Supper(props) {
  return <StaticImage
    // src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash.webp"
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/ivan-rohovchenko-t6tEzGhQNRs-unsplash-crop.jpg"
    alt="tahoe city kayak paddleboarder"
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
        <h3>{props.spec} <span className="unit">{props.unit}</span></h3>
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
      {/*       <Seo
        title={tour.name}
        description={tour.excerpt}
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
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/tours-lessons" itemProp="item">
            <span itemProp="name">Tours &amp; Lessons</span>
            <meta itemProp="position" content="2" />
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
              {tour.name}
            </span>
            <meta itemProp="position" content="3" />
          </span>
        </li>
      </ol>

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

          {/* // TODO needs to be paddleboard not sup */}
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
        <section>
          <div className="collage tour-collage">
            <GatsbyImage
              image={tour?.ogimage?.localFile?.childImageSharp?.gatsbyImageData}
              alt={tour?.ogimage?.alternativeText}
              className="card__image tour_texture"
            />
            <WaterTexture className="texture card__image" />
            <Paddler sport={tour.sport} />
          </div>
          <hr />
          <h4>Meet us at the On Water Rentals</h4>
          <div className="here__location here__card">
            <KayakIcon />
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
          <MapSVG />
        </section>

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

export const Head = () => {
  return (
    <SEO
    // title={`About Us${TitleTemplate}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}