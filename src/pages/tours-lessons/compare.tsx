import React, { useState } from 'react';
import { useStaticQuery, graphql, Link, Script } from 'gatsby';
import { SEO } from "../../components/seo";

import { useSiteMetadata } from "../../hooks/use-site-metadata";

import Header from "../../components/header";
import Footer from "../../components/footer";

import Time from "../../components/time";

function Compare(props) {

  function Option(props) {
    if (props.name === props.current) {
      return (
        <option selected key={props.key}>{props.name}</option>
      )
    }
    else if (props.name === props.other) {
      return (
        <option disabled key={props.key}>{props.name}</option>
      )
    } else {
      return (
        <option key={props.key}>{props.name}</option>
      )
    }
  }

  function first(e) {
    setTour1(e.target.value);
    return null;
  }

  function second(e) {
    setTour2(e.target.value);
    return null;
  }

  function Details1(props) {
    props.set.forEach(element => {
      if (element.name === props.show) {
        setLink1(element.slug);
        setSport1(element.sport);
        setDuration1(element.duration);
        setStart1(element.start);
        setFinish1(element.finish);
        setFitness1(element.fitness);
        setLocation1(element.locale.name);
        setExcerpt1(element.excerpt);
        setMinimum1(element.minimum);
        setPrice1(element.price);
        setPeeks1(element.peek);
      }
    });
    return null;
  }

  function Details2(props) {
    props.set.forEach(element => {
      if (element.name === props.show) {
        setLink2(element.slug);
        setSport2(element.sport);
        setDuration2(element.duration);
        setStart2(element.start);
        setFinish2(element.finish);
        setFitness2(element.fitness);
        setLocation2(element.locale.name);
        setExcerpt2(element.excerpt);
        setMinimum2(element.minimum);
        setPrice2(element.price);
        setPeeks2(element.peek);
      }
    });
    return null;
  }

  const [tour1, setTour1] = useState('Sunset Kayak Tour on Lake Tahoe');
  const [tour2, setTour2] = useState('Historic West Shore Tour');

  const [link1, setLink1] = useState('not set');
  const [link2, setLink2] = useState('not set');

  const [sport1, setSport1] = useState('not set');
  const [sport2, setSport2] = useState('not set');

  const [duration1, setDuration1] = useState('not set');
  const [duration2, setDuration2] = useState('not set');

  const [start1, setStart1] = useState('not set');
  const [start2, setStart2] = useState('not set');

  const [finish1, setFinish1] = useState('not set');
  const [finish2, setFinish2] = useState('not set');

  const [location1, setLocation1] = useState('not set');
  const [location2, setLocation2] = useState('not set');

  const [excerpt1, setExcerpt1] = useState('not set');
  const [excerpt2, setExcerpt2] = useState('not set');

  const [minimum1, setMinimum1] = useState(0);
  const [minimum2, setMinimum2] = useState(0);

  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const [peeks1, setPeeks1] = useState('not set');
  const [peeks2, setPeeks2] = useState('not set');

  const [fitness1, setFitness1] = useState('fitness');
  const [fitness2, setFitness2] = useState('fitness');

  return (
    <>
      <div className='comparesheet'>
        <div className='comparesheet_titles'>

          <div className='comparesheet__transparent'>Compare</div>
          <h3 className='kilimanjaro comparesheet_freeze'>
            Tour or<br />Lesson
          </h3>
          <p>Sport</p>
          <p>Time</p>
          <p>Fitness</p>
          <p>Location</p>
          <p>About</p>
          <p>Minimum People</p>
          <p>Price</p>
          <p className='button-drop'>Book Now</p>
        </div>

        {/* Tour 1 */}
        <section>
          <select
            name="tour1"
            id="tour1"
            onChange={first}
            className="comparesheet_select"
          >
            {props.tours.map((tour) => (
              <Option
                key={tour.id}
                name={tour.name}
                current={tour1}
                other={tour2} />
            ))}
          </select>
          <h2 className='kilimanjaro'>
            <Link to={`/tours-lessons/${link1}`}>
              {tour1}
            </Link>
          </h2>
          <Details1 show={tour1} set={props.tours} />
          <h4 className='capitalize'>{sport1}</h4>
          <Time
            duration={duration1}
            start={start1}
            finish={finish1}
          />
          <p className='capitalize'>{fitness1}
            <span className='show-below__vulture'>&nbsp;fitness</span>
          </p>
          <p><span className='show-below__vulture'>Starts at&nbsp;</span>{location1}</p>
          <p>{excerpt1}</p>
          <p>{minimum1}<span className='show-below__vulture'>&nbsp;people minimum</span></p>
          <p>${price1}</p>
          <p>
            <a href={peeks1}
              rel="noopener noreferrer"
              className="book-now"
            >
              BOOK NOW
            </a>
          </p>
        </section>

        {/* Tour 2 */}
        <section>
          <select
            name="tour2"
            id="tour2"
            onChange={second}
            className="comparesheet_select"
          >
            {props.tours.map((tour) => (
              <Option
                key={tour.id}
                name={tour.name}
                current={tour2}
                other={tour1}
              />
            ))}
          </select>
          <h2 className='kilimanjaro'>
            <Link to={`/tours-lessons/${link2}`}>
              {tour2}
            </Link>
          </h2>
          <Details2 show={tour2} set={props.tours} />
          <h4 className='capitalize'>{sport2}</h4>
          <Time
            duration={duration2}
            start={start2}
            finish={finish2}
          />
          <p className='capitalize'>{fitness2}<span className='show-below__vulture'>&nbsp;fitness</span></p>
          <p><span className='show-below__vulture'>Starts at&nbsp;</span>{location2}</p>
          <p>{excerpt2}</p>
          <p>{minimum2}<span className='show-below__vulture'>&nbsp;people minimum</span></p>
          <p>${price2}</p>
          <p>
            <a href={peeks2}
              rel="noopener noreferrer"
              className="book-now"
            >
              BOOK NOW
            </a>
          </p>
        </section>
      </div >
    </>
  )
}

const ComparePage = () => {

  const { allStrapiTour } = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(
        filter: {locale: {slug: {eq: "tahoe-city"}}}
        sort: {featured: ASC}
      ) {
        nodes {
          id
          fitness
          slug
          start
          sport
          peek
          price
          name
          minimum
          finish
          excerpt
          duration

          locale {
            name
          }
        }
    }
  }
`)

  return (
    <>
      <Header />

      <main className='main__pelican'>
        <h1>Compare</h1>
        <Compare tours={allStrapiTour.nodes} />
      </main>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to={`/tours-lessons`}>Tours and Lessons</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">Compare</li>
        </ol>
      </nav>

      <Footer />
    </>
  )
}

export default ComparePage

export const Head = () => {
  return (
    <SEO
      title={`Compare Tours | ${useSiteMetadata().title}`}
    // TODO description and image
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Tours & Lessons",
            "item": "${useSiteMetadata().url}/tours-lessons"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Compare",
          }]
        }
      `}
      </Script>

    </SEO>
  )
}
