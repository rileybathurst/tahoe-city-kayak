import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Header from "../components/header"
import Footer from "../components/footer"
import HourMin from "../components/hour-min"; // TODO check if this should be the time compoonent
import Sport from "../components/sport";
import Composition from "../components/composition";
import Balancer from 'react-wrap-balancer'
import Ticket from "../components/ticket";
import LocationCard from "../components/location-card";

function ReactMD(props: { raw: string; }) {
  return (
    <Markdown
      children={props.raw}
      className="react-markdown"
    />
  );
}

// TODO: fix the props
function Spec(props: {
  name: string;
  spec: string;
  unitPlace?: string;
  unit?: string;
}) {
  if ((props.name === "Tour Completiion" || props.name === "Tour Start Time") && props.spec === null) {
    return null;
  }

  if (props.name === "Tour Completiion" || props.name === "Tour Start Time") {
    return (
      <div className="spec" >
        <h2>{props.name}</h2>
        <h3><HourMin time={props.spec} /></h3>
      </div>
    );
  }

  if (props.name === "Sport") {
    return (
      <div className="spec" >
        <h2>Sport</h2>
        <h3 className="spec-flex">
          <span className="specification"><Sport sport={props.spec} /></span>
        </h3>
      </div>
    );
  }

  if ((props.spec) && (props.unitPlace == "before")) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex unit-place__before">
          <span className="specification">{props.spec}</span>
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  }

  if (props.spec) {
    return (
      <div className="spec">
        <h2>{props.name}</h2>
        <h3 className="spec-flex">
          <span className="specification">{props.spec}</span>
          <span className="unit">{props.unit}</span>
        </h3>
      </div>
    );
  }

  return null;
}

function Minimum(props: { minimum: number; }) {
  if (props.minimum) {
    return (
      <p>* Prices based on a<br />
        {props.minimum} person minimum</p>
    );
  }
  return null;
}

function TourName(props: { tour: string; }) {
  {/* // * waiting on safari for css text-wrap: balance */ }
  let name = props.tour;
  // console.log(name.length);
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

  const { strapiLocation } = useStaticQuery(graphql`
    query TourViewQuery {
      strapiLocation(
        locale: {slug: {eq: "tahoe-city"}}
        name: {eq: "On Water Rental"}
      ) {
        ...locationCard

        locale {
          name
        }
      }
    }
  `);

  return (
    <>
      <Header />

      {/* // TODO: names */}
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

          {/* // TODO: update to this https://gist.github.com/rileybathurst/2c3191a7714e1204b07c725104d4ab93 */}
          <Spec name="Sport" spec={tour.sport} />

          <Spec name="Tour Start Time" spec={tour.start} />

          <Spec name="Tour Completiion" spec={tour.finish} />

          <Spec name="Duration" spec={tour.duration} unit="mins" />

          <Spec name="Fitness Level" spec={tour.fitness} />

          <div className="spec">
            <h2>Starts At</h2>
            <a
              href={strapiLocation.link}
              target='_blank' rel='noopener noreferrer'
            >
              <h3>{strapiLocation.locale.name}</h3>
            </a>
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

          <LocationCard location={strapiLocation} />
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
        {/* TODO: Im not usiong the query */}
        <h4><Link to={`/tours-lessons/compare/?${tour.slug}`}>Compare the {tour.name} to another tour or lesson.</Link></h4>

        {/* // TODO: other card */}
        <section className="deck">
          {other.nodes.map((tour) =>
            <div
              key={tour.id}
            >
              <Ticket tour={tour} />
            </div>
          )}
        </section>

      </div>

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
      <Footer />
    </>
  );
};

export default TourView;
