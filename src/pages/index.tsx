import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";
import KayakFeatureList from "../components/kayak-feature-list";
import PaddleboardFeatureList from "../components/paddleboard-feature-list";
import LocationDeck from "../components/location-deck";
import AboutUs from "../content/about-us";
import Shop from "../content/shop";
import Card from "../components/card";
import Experience from "../content/experience";
import Ticket from "../components/ticket";

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
          ...locationCard
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

      allStrapiRetail(sort: {featured: ASC}) {
        nodes {
          ...retailCard
        }
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
  }, [loadMore, hasMore])

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allTours.length
    setHasMore(isMore)
  }, [list])

  // Retail
  let allRetail = data.allStrapiRetail.nodes
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
  }, [loadExtra, hasExtra])

  //Check if there is more
  useEffect(() => {
    const isExtra = inventory.length < allRetail.length
    setHasExtra(isExtra)
  }, [inventory])

  return (
    <>
      <Header />
      <main className="home">
        <section>
          <h2 className="page-title">
            North Lake Tahoe&apos;s Premier Kayak and Paddleboard Provider, offering Rentals, Sales, Lessons and Tours
          </h2>

          <div className="margin-block-end-aconcagua">
            <AboutUs />
          </div>

          <LocationDeck
            locations={data.allStrapiLocation}
            background={false}
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
        {list.map((tour) => (
          <div key={tour.id}>
            <Ticket tour={tour} />
          </div>
        ))}
      </div>
      <div className="deck__more">
        {hasMore ? (
          <button onClick={handleLoadMore} className=''>VIEW MORE TOURS &amp; LESSONS</button>
        ) : (
          <p>Thats all the tours</p>
        )}
        <hr />
      </div>

      {/* // TODO add this back inthis probably still needs more */}
      {/* <MapSVG /> */}

      <section id="retail" className="pelican wrap">
        <div>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow"><Link to="/retail">Retail Store</Link></h3>
            <h4 className="supra">Kayaks and Paddleboards</h4>
          </hgroup>

          <Shop />
        </div>
      </section>

      <hr className="pelican" />

      <section className="albatross wrap">
        <div>
          <h4>
            <Link to="/retail/kayak">Shop All Kayaks</Link>
          </h4>
          <h5>Shop By Feature</h5>
          <KayakFeatureList />
          <h5>Shop By Brand</h5>
          <KayakBrandList />

          <hr />

          <h4>
            <Link to="/retail/sup">Shop All Paddleboards</Link>
          </h4>
          <h5>Shop By Feature</h5>
          <PaddleboardFeatureList />
          <h5>Shop By Brand</h5>
          <SupBrandList />
        </div>

        <div className="deck">
          {inventory.map((retail) => (
            <Card
              key={retail.id}
              retail={retail} />
          ))}
          {hasExtra ? (
            <button onClick={handleLoadExtra}>VIEW MORE PRODUCTS</button>
          ) : (
            <p>Thats all the products</p>
          )}
        </div>

      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {

  // ! can I query here?
  /*   const { strapiLocale } = useStaticQuery(graphql`
      query IndexHeadQuery {
        strapiLocale {
          topbar {
            data {
              topbar
            }
          }
        }
      }
    `) */

  return (
    <SEO
      title={`${useSiteMetadata().title} - Welcome to the 2024 Season`}
    />
  )
}
