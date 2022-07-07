import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link, useStaticQuery, graphql } from 'gatsby';

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import MapLink from "../components/map-link"

function TwoKayakers(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/tck-slide-2.jpg"
    alt="two kayakers paddling across lake Tahoe"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function WaterTexture(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
    alt="water texture"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function AndyPaddling(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/andy-paddling.jpg"
    alt="andy paddling in the sunshine"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}



const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {
      allStrapiTour {
        nodes {
          id
          name
        }
      }
    }
  `)

  const more = { data }
  // console.log(more);

  let allTours = data.allStrapiTour.nodes
  // console.log(allTours);

  // State for the list
  const [list, setList] = useState([...allTours.slice(0, 2)])

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false)

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allTours.length > 2)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allTours.length
      const nextResults = isMore
        ? allTours.slice(currentLength, currentLength + 2)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allTours.length
    setHasMore(isMore)
  }, [list])

  return (
    <>
      <Header />
      <main className="home__main">
        <section>
          <h2><Link to="/rentals-demos">On Water Rentals</Link></h2>
          <article className="home__main--season">
            <p>Season: May &ndash; October<br />
              Open Daily<br />
              9:30am &ndash; 5:30pm<br />
              Weather Permitting
            </p>

            <p>Located at<br />
              <MapLink className="link__subtle">
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145
              </MapLink>
            </p>
          </article>

          <div className="button__double">
            <button>RENTALS &amp; DEMOS<br />
              BOOK NOW</button>

            <button>TOURS &amp; LESSONS<br />
              BOOK NOW</button>
          </div>


          <p>Our mission at Tahoe City Kayak is to provide you with unparalleled customer service.
            We strive to give you the best in kayak sales, SUP rentals, kayak rentals and tours.
            We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.</p>
        </section>

        <section className="main__photo-grid">
          <TwoKayakers className="kayakers" />
          <WaterTexture className="texture" />
          <AndyPaddling className="andy" />
        </section>
      </main>

      <section id="rentals-demos" className="home__rentals">
        <div>
          <h3>
            <Link to="rentals-demos">
              Rentals &amp; Demos
            </Link>
          </h3>
          <p>Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>
          <button>Book Now</button>
        </div>

        <div>
          <PricingChart book="no" />
        </div>
      </section>


      <section id="tours-lessons" className="home__tours">
        <div>
          <h3>Tours &amp; Lessons</h3>
          <p>We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {list.map((tour) => (
          <div key={tour.id} className="card">
            {tour.name}
          </div>
        ))}
        <div className="">
          {hasMore ? (
            <>
              <button onClick={handleLoadMore} className=''>Load More</button>
              &nbsp;&nbsp;<span className="crest">Even More?</span>
            </>
          ) : (
            <p>No more results</p>
          )}
        </div>
      </div>

      <section id="retail">
        <h3>Retail</h3>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, touring, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel.</p>

        <p>Our Store and our retail prices are competitive with big-city retailers! Hobie, Wilderness Systems, Eddyline, Tahoe SUP, Pau Hana, Amundson, Bic Paddlesurf and more. Try before you buy!</p>

        <p>Retail and Reservations
          Open 7 days a week 9:00am&ndash;6:00pm</p>

        <p>Located at</p>
        <address>
          521 N Lake Blvd<br />
          Tahoe City,<br />
          CA 96145
        </address>

        <hr />
      </section>

      <Footer />
    </>
  )
}

export default IndexPage
