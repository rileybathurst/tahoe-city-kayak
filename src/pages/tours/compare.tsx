import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";

function Compare(props) {

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
        setPrice1(element.node.price);
        setFitness1(element.node.fitness);
      }
    });
    return null;
  }

  function Details2(props) {
    props.set.forEach(element => {
      if (element.node.name === props.show) {
        setPrice2(element.node.price);
        setFitness2(element.node.fitness);
      }
    });
    return null;
  }

  const [tour1, setTour1] = useState('First Choice');
  const [tour2, setTour2] = useState('Second Choice');
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [fitness1, setFitness1] = useState('fitness');
  const [fitness2, setFitness2] = useState('fitness');

  return (
    <div className="flex1">
      {/* Tour 1 */}
      <div>
        <select name="tour3" id="tour3" onChange={first}>
          {props.tours.map((tour) => (
            <option key={tour.id}>{tour.node.name}</option>
          ))}
        </select>
        <hr />
        <h2 className='h3'>{tour1}</h2>
        <Details1 show={tour1} set={props.tours} />
        <p>{price1}</p>
        {fitness1}
      </div>

      {/* Tour 2 */}
      <div>
        <select name="tour3" id="tour3" onChange={second}>
          {props.tours.map((tour) => (
            <option key={tour.id}>{tour.node.name}</option>
          ))}
        </select>
        <hr />
        <h2 className='h3'>{tour2}</h2>
        <Details2 show={tour2} set={props.tours} />
        <p>{price2}</p>
        {fitness2}
      </div>
    </div>
  )
}

const ComparePage = () => {
  return (
    <>
      <Header />

      <main>
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
    // title={`About Us${TitleTemplate}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
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