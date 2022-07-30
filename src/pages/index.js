import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import MapLink from "../components/map-link"
import Seo from "../components/seo";
import Remainder from "../components/remainder";
import Time from "../components/time";
import Fitness from "../components/fitness";
import KayakIcon from "../images/kayak"
import StoreIcon from "../images/store";
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookNow from "../components/peek/book-now";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import TextureBackgrounds from "../components/texturebackgrounds";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";

// TODO this will eventually be a svg
function Map(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/Tahoe-City-Map-2-fs8.png"
    alt="tahoe city kayak map"
    className={props.className}
    objectFit="contain"
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
          slug
          price
          peek
          excerpt
          start
          finish
          duration
          fitness

          ogimage {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }

      allStrapiRetail {
        nodes {
          id
          title
          slug
          excerpt
          type
          length
          width

          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }
    }
  `)

  // const more = { data }
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

      {/* // ! this needs to remove the pipe */}
      <Seo
        title=""
      // image="test"
      />
      <Header />
      <main className="home__main">
        {/* // TODO: test this */}
        <section itemscope itemtype="https://schema.org/Service">
          <h2><Link to="/rentals-demos">On Water Rentals</Link></h2>
          <article className="home__main--season">
            <p>Season: May &ndash; October<br />
              Open Daily<br />
              9:30am &ndash; 5:30pm<br />
              Weather Permitting
            </p>

            <p>Located at<br />
              <MapLink>
                Commons Beach<br />
                400 North Lake Blvd,<br />
                Tahoe City 96145
              </MapLink>
            </p>
          </article>

          <div className="button__double">
            <BookRental />
            <BookTour />
          </div>

          <p
            className="double-baseline"
            itemprop="hasOfferCatalog"
            itemscope
            itemtype="https://schema.org/OfferCatalog"
          >
            Our mission at Tahoe City Kayak is to provide you with unparalleled customer service.
            We strive to give you the best in
            <span itemprop="name">kayak sales</span>,
            <span itemprop="name">SUP rentals</span>,
            <span itemprop="name">kayak rentals and tours</span>.
            We know that you have many choices when you come to Lake Tahoe and we thank you for considering us and look forward to serving you on your next trip to the lake.
          </p>
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
          <p className="double-baseline">Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals. Kayak and Standup Paddleboard Rentals are open for the 2022 season. Tours and rentals can be booked in advance with the button below!</p>
          <BookNow />
        </div>

        <div>
          <PricingChart book="no" />
        </div>
      </section>


      <section id="tours-lessons" className="home__tours">
        <div>
          <h3><Link to="/tours-lessons">Tours &amp; Lessons</Link></h3>
          <p className="double-baseline">We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake.</p>
        </div>
        <div>{/* stay gold */}</div>
      </section>

      <div className="deck">
        {list.map((tour) => (
          <div key={tour.id} className="card">
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
                rel="noopener noreferrer"
                className="book-now"
              >
                BOOK NOW
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="deck__more">
        {hasMore ? (
          <>
            <button onClick={handleLoadMore} className=''>VIEW MORE TOURS &amp; LESSONS</button>
            {/* &nbsp;&nbsp;<span className="crest">Even More?</span> */}
          </>
        ) : (
          <p>Thats all the tours</p>
        )
        }
      </div>

      < section id="here" className="home__here" >
        <div>
          <h3><Link to="/contact">WE ARE HERE</Link></h3>

          <div className="here__location">
            <KayakIcon />
            <p>
              On Water Rental Location<br />
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

          <div className="here__location">
            <StoreIcon />
            <p>
              Retail Location<br />
              <a href="https://goo.gl/maps/qVFPpSrFGwrECb4n8" rel="norel nofollow" >
                521 North Lake Blvd,<br />
                Tahoe City 96145</a>
            </p>

            <p>
              Open Daily<br />
              9am &ndash; 6pm<br />
            </p>
          </div>
        </div>
        <Map />
      </section>

      <section id="retail">
        <h3><Link to="/retail" className="">Retail</Link></h3>
        <p>Our North-Shore Tahoe City retail store has been a trusted name for Lake Tahoe kayak rentals, touring, and sales for over 17 years. We carry the best names in kayaks, stand up paddleboards, gear and apparel. Our Store and our retail prices are competitive with big-city retailers! Try before you buy!</p>

        <div className="reuseable__two-col">
          <div>
            <h4><Link to="/retail/kayaks">Kayaks</Link></h4>
            <KayakBrandList />
          </div>
          <div>
            <h4><Link to="/retail/sup">SUPs</Link></h4>
            <SupBrandList />
          </div>
        </div>

        <hr />
      </section>

      <div className="deck">
        {inventory.map((retail) => (
          <div key={retail.id} className="card">
            <div className="card-collage">
              <TextureBackgrounds />
              <GatsbyImage
                image={retail?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
                alt={retail?.cutout?.alternativeText}
                className="cutout"
              />
            </div>
            <h4 className="card__title">
              <Link to={`/retail/${retail.slug}`}>
                {retail.title}
              </Link>
            </h4>
            <hr />
            <p>{retail?.excerpt}</p>
            <hr />
            <div className="card__details uppercase">
              <h4>{retail.type}</h4>
              <h5><Remainder inches={retail.length} /> long by {retail.width}" wide</h5>
            </div>
          </div>
        ))}
      </div>
      <div className="deck__more">
        {hasExtra ? (
          <>
            <button onClick={handleLoadExtra} className=''>VIEW MORE RETAIL</button>
          </>
        ) : (
          <p>Thats all the retail</p>
        )
        }
      </div>

      <Footer />
    </>
  )
}

export default IndexPage
