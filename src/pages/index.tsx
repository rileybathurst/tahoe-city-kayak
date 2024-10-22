import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck, PaddleTicket, type PaddleTicketTypes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import BrandList from "../components/brand-list";
import FeatureList from "../components/feature-list";
import AboutUs from "../content/about-us";
import Shop from "../content/shop";
import Card from "../components/card";
import Experience from "../content/experience";

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query IndexQuery {
      allStrapiLocation(
        filter: {
          locale: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      allStrapiTour(
        sort: {featured: ASC},
        filter: {locale: {slug: {eq: "tahoe-city"}}}
        ) {
        nodes {
          ...tourCard
        }
      }

      allStrapiSunsetTourTime(sort: {startDate: ASC}) {
        nodes {
          id
          endDate
          endTime
          startDate
          startTime
        }
      }

      allStrapiRetail(sort: {featured: ASC}) {
        nodes {
          ...retailCard
        }
      }

      strapiLocale(slug: {eq: "tahoe-city"}) {
        peek_tours
        season_start
        season_end
        phone
      }
    }
  `)

  // const more = { data }
  // console.log(more);

  const allTours = data.allStrapiTour.nodes
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
  }, [loadMore, hasMore, list, allTours.length, allTours.slice])

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allTours.length
    setHasMore(isMore)
  }, [list, allTours.length])

  // Retail
  const allRetail = data.allStrapiRetail.nodes
  const [inventory, setInventory] = useState([...allRetail.slice(0, 2)])
  const [loadExtra, setLoadExtra] = useState(false)
  const [hasExtra, setHasExtra] = useState(allRetail.length > 2)
  const handleLoadExtra = () => {
    setLoadExtra(true)
  }

  useEffect(() => {
    if (loadExtra && hasExtra) {
      const currentRange = inventory.length
      const isExtra = currentRange < allRetail.length
      const nextOutcome = isExtra
        ? allRetail.slice(currentRange, currentRange + 2)
        : []
      setInventory([...inventory, ...nextOutcome])
      setLoadExtra(false)
    }
  }, [loadExtra, hasExtra, inventory, allRetail.length, allRetail.slice])

  //Check if there is more
  useEffect(() => {
    const isExtra = inventory.length < allRetail.length
    setHasExtra(isExtra)
  }, [inventory, allRetail.length])

  // console.log(data.allStrapiLocation);

  return (
    <>
      <Header />
      <main className="home">
        <section>
          <h2 className="page-title">
            {/* // TODO: strapi this */}
            Tahoe's Premier Kayak and Paddleboard Provider, offering <Link to="/rentals">Rentals</Link>, <Link to="/retail">Sales</Link>, <Link to="/tours-lessons/">Lessons and Tours</Link> in both North and <a href="https://southtahoekayak.com" target="_blank" rel="noopener noreferrer">South Lake Tahoe</a>.
          </h2>

          <div className="margin-block-end-aconcagua">
            <AboutUs />
          </div>

          <PaddleLocationDeck
            background={false}
            season_start={data.strapiLocale.season_start}
            season_end={data.strapiLocale.season_end}
            phone={data.strapiLocale.phone}
            {...data.allStrapiLocation}
          />

          <div className="button__double">
            <BookRental />
            <BookTour />
          </div>

        </section>

        <div>
          <div className="home__photo-grid">
            <TwoKayakers className="kayakers" />
            <WaterTexture className="texture" />
            <AndyPaddling className="andy" />
          </div>

          <hr />

          <PricingChart book={true} />
        </div>
      </main>

      <section id="tours-lessons" className="home__tours">
        <div>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow"><Link to="/tours-lessons">Tours &amp; Lessons</Link></h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>
          <Experience />
          <h4>
            <Link to="/tours-lessons/compare">Compare Tours &amp; Lessons</Link>
          </h4>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {list.map((tour: PaddleTicketTypes) => (
          <PaddleTicket
            key={tour.id}
            {...tour}
            tour_page='tours-lessons'
            peek_tours_fall_back={data.strapiLocale.peek_tours}
            allStrapiSunsetTourTime={data.allStrapiSunsetTourTime}
          />
        ))}
      </div>
      <div className="deck__more">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            type="button"
          >
            VIEW MORE TOURS &amp; LESSONS
          </button>
        ) : (
          <p>Thats all the tours</p>
        )}
        <hr />
      </div>

      {/* // TODO add this back inthis probably still needs more */}
      {/* <MapSVG /> */}

      <section
        id="retail"
        className="albatross wrap kilimanjaro-block-end"
      >
        <div>

          <div className="pelican">
            {/* // TODO: only one h and then p */}
            <hgroup className="crest">
              <h3 className="brow"><Link to="/retail">Retail Store</Link></h3>
              <h4 className="supra">Kayaks and Paddleboards</h4>
            </hgroup>

            <Shop />

            <hr className="" />

            {/* // TODO: this should be a sport loop */}
            <h4>
              <Link to="/retail/kayak">Shop All Kayaks</Link>
            </h4>
            <h5>Shop By Feature</h5>
            <FeatureList sport='kayak' />
            <h5>Shop By Brand</h5>
            <BrandList sport='kayak' />

            <hr />

            <h4>
              <Link to="/retail/paddleboard">Shop All Paddleboards</Link>
            </h4>
            <h5>Shop By Feature</h5>
            <FeatureList sport='paddleboard' />
            <h5>Shop By Brand</h5>
            <BrandList sport='paddleboard' />
          </div>
        </div>

        <div className="">
          <div className="pelican">
            {/* TODOL these are cards that due to the layout cant be in a deck so need better margin-block-end */}
            {inventory.map((retail) => (
              <Card
                key={retail.id}
                {...retail} />
            ))}
            {hasExtra ? (
              <button
                onClick={handleLoadExtra}
                type="button"
              >
                VIEW MORE PRODUCTS
              </button>
            ) : (
              <p>Thats all the products</p>
            )}
          </div>
        </div>

      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <SEO />
  )
}
