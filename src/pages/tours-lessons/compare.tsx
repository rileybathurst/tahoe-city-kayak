import React, { useState } from 'react';
import { StaticQuery, graphql, Link, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import TitleTemplate from "../../components/title-template";
import { useSiteUrl } from "../../hooks/use-site-url";

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
      if (element.node.name === props.show) {
        setLink1(element.node.slug);
        setSport1(element.node.sport);
        setDuration1(element.node.duration);
        setStart1(element.node.start);
        setFinish1(element.node.finish);
        setFitness1(element.node.fitness);
        setLocation1(element.node.location);
        setExcerpt1(element.node.excerpt);
        setMinimum1(element.node.minimum);
        setPrice1(element.node.price);
        setPeeks1(element.node.peek);
      }
    });
    return null;
  }

  function Details2(props) {
    props.set.forEach(element => {
      if (element.node.name === props.show) {
        setLink2(element.node.slug);
        setSport2(element.node.sport);
        setDuration2(element.node.duration);
        setStart2(element.node.start);
        setFinish2(element.node.finish);
        setFitness2(element.node.fitness);
        setLocation2(element.node.location);
        setExcerpt2(element.node.excerpt);
        setMinimum2(element.node.minimum);
        setPrice2(element.node.price);
        setPeeks2(element.node.peek);
      }
    });
    return null;
  }

  // TODO: start with a default
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
        {/* // ? why did I need to add this to make it a subgird */}
        <div className='comparesheet_titles'>
          <div className='comparesheet__transparent'>{/* stay gold */}</div>
          <h3 className='h4 comparesheet_freeze'>Tour or<br />
            Lesson</h3>
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
        <div>
          <select name="tour3" id="tour3" onChange={first} className="comparesheet_select">
            {props.tours.map((tour) => (
              <Option key={tour.node.id} name={tour.node.name} current={tour1} other={tour2} />
            ))}
          </select>
          <h2 className='h3 comparesheet__title1'>
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
          <p className='capitalize'>{fitness1}</p>
          <p>Tahoe City</p>
          <p>{excerpt1}</p>
          <p>{minimum1}</p>
          <p>${price1}</p>
          <p><a href={peeks1}
            rel="noopener noreferrer"
            className="book-now"
          >
            BOOK NOW
          </a></p>

        </div>

        {/* Tour 2 */}
        <div>
          <select name="tour3" id="tour3" onChange={second} className="comparesheet_select">
            {props.tours.map((tour) => (
              <Option key={tour.node.id} name={tour.node.name} current={tour2} other={tour1} />
            ))}
          </select>
          <h2 className='h3 comparesheet__title2'>
            <Link to={`/tours-lessons/${link2}`}>
              {tour2}
            </Link></h2>
          <Details2 show={tour2} set={props.tours} />
          <h4 className='capitalize'>{sport2}</h4>
          <Time
            duration={duration2}
            start={start2}
            finish={finish2}
          />
          <p className='capitalize'>{fitness2}</p>
          <p>Tahoe City</p>
          <p>{excerpt2}</p>
          <p>{minimum2}</p>
          <p>${price2}</p>
          <p><a href={peeks2}
            rel="noopener noreferrer"
            className="book-now"
          >
            BOOK NOW
          </a></p>
        </div>
      </div >
    </>
  )
}

const ComparePage = () => {
  return (
    <>
      <Header />

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

      <main className='main__pelican'>
        <h1>Compare</h1>
        <StaticQuery
          query={query}
          render={data => (
            <Compare tours={data.allStrapiTour.edges} />
          )}
        />
      </main>

      <Footer />
    </>
  )
}

export default ComparePage

export const Head = () => {
  return (
    <SEO
      title={`Compare Tours${TitleTemplate}`}
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
            "item": "${useSiteUrl()}/tours-lessons"
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

const query = graphql`
  query TourCompareQuery {
    allStrapiTour {
      edges {
        node {
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
        }
      }
    }
  }
`