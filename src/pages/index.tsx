import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import { useStrapiTopBar } from "../hooks/use-strapi-topbar";

import Header from "../components/header"
import Footer from "../components/footer"
import PricingChart from "../components/pricing-chart"
import Remainder from "../components/remainder";
import Time from "../components/time";
import TwoKayakers from "../images/twokayakers";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import BookTour from "../components/peek/book-tour";
import BookRental from "../components/peek/book-rental";
import TextureBackgrounds from "../components/texturebackgrounds";
import KayakBrandList from "../components/kayak-brand-list";
import SupBrandList from "../components/sup-brand-list";
import KayakFeatureList from "../components/kayak-feature-list";
import PaddleboardFeatureList from "../components/paddleboard-feature-list";
import Complete from '../components/locations/complete';
import Sport from "../components/sport";
import Slogan from "../content/slogan";
import AboutUs from "../content/about-us";
import ToursLessons from "../content/tours-lessons";
import Retail from "../content/retail";

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
          sport

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
      <Header />
      <main className="home__main">
        <section>
          <h2 className="page-title"><Slogan /></h2>

          <AboutUs />

          <Complete />

          <div className="button__double">
            <BookRental />
            <BookTour />
          </div>


        </section>

        <div>
          <section className="main__photo-grid">
            <TwoKayakers className="kayakers" />
            <WaterTexture className="texture" />
            <AndyPaddling className="andy" />
          </section>

          <hr />

          <PricingChart book="no" />
        </div>
      </main>

      <section id="tours-lessons" className="home__tours">
        <div>
          <hgroup className="crest">
            <h3 className="brow"><Link to="/tours-lessons">Tours &amp; Lessons</Link></h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>
          <ToursLessons />
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
              <Link to={`/tours-lessons/${tour.slug}`}>
                {tour.name}
              </Link>
            </h4>

            <div className="card__specs">
              <Time
                start={tour.start}
                finish={tour.finish}
                duration={tour.duration}
              />
              <h4 className="uppercase"><Sport sport={tour.sport} /></h4>
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
        <hr />
      </div>

      {/* <MapSVG /> */}
      {/* // TODO add this back inthis probably still needs more */}

      <section id="retail">
        <h3><Link to="/retail" className="">Retail</Link></h3>
        <Retail />
      </section>

      <section className="reuseable__two-col">
        <div>
          <h4><Link to="/retail/kayaks">Kayaks</Link></h4>
          <KayakFeatureList />
          <KayakBrandList />

          <h4><Link to="/retail/sup">Paddleboards</Link></h4>
          <PaddleboardFeatureList />
          <SupBrandList />
        </div>

        <div className="deck deck__column">
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
                <Link to={`/retail/${retail.type}/${retail.slug}`}>
                  {retail.title}
                </Link>
              </h4>
              <hr />
              <p>{retail?.excerpt}</p>
              <hr />
              <div className="card__details uppercase">
                <h4><strong>{retail.type}</strong></h4>
                <h5><strong><Remainder inches={retail.length} /></strong> long by <strong>{retail.width}"</strong> wide</h5>
              </div>
            </div>
          ))}
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
        </div>

      </section>

      <Footer />
    </>
  )
}

export default IndexPage

export const Head = () => {
  return (
    <>
      {/* <SEO title="Home" /> */}
      <SEO
        // title="StrapiTop"
        // title={StrapiTop}
        // title={useStrapiTopBar()}
        title={`Tahoe City Kayak - ${useStrapiTopBar()}`}
      // title={StrapiBottom}
      // title={TT}
      />
      {/* <StrapiTop /> */}
      {/* <StrapiBottom /> */}
      {/* </SEO> */}
    </>
  )
}
