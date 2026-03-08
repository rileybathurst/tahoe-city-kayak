import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

// Paddle
import {
  PaddleBookNow,
  PaddleTicket,
  type PaddleTicketTypes,
  type PaddleLocationTypes,
  type PaddlePurchaseTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Hero2025 from "../images/hero-2025";
import WaterTexture from "../images/watertexture";
import AndyPaddling from "../images/andypaddling";
import FeatureList from "../components/feature-list";
import AboutUs from "../content/about-us";
import Shop from "../content/shop";

import Experience from "../content/experience";
import Purchase from "../components/purchase";
import ReactMarkdown from "react-markdown";
import LocationDeck from "../components/location-deck";

const IndexPage = () => {

  // ? seems like a weird place to have sunset tour time
  type SunsetTourTime = {
    id: React.Key;
    endDate: string;
    endTime: string;
    startDate: string;
    startTime: string;
  }

  type Branch = {
    name: string;
    peek_tours: string;
    season_start: string;
    season_end: string;
    phone: number;
    peek_base: string;
    peek_rentals: string;
    lead: {
      data: {
        lead: string;
      };
    };
  }

  type indexTypes = {
    allStrapiLocation: {
      nodes: PaddleLocationTypes[];
    };
    allStrapiTour: {
      nodes: PaddleTicketTypes[];
    };
    allStrapiSunsetTourTime: {
      nodes: SunsetTourTime[];
    };
    allStrapiRetail: {
      nodes: PaddlePurchaseTypes[];
    };
    strapiBranch: Branch;
  }

  const data: indexTypes = useStaticQuery(graphql`
    query IndexQuery {
      allStrapiLocation(
        filter: {
          local: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      allStrapiTour(
        sort: {featured: ASC},
        filter: {local: {slug: {eq: "tahoe-city"}}}
        ) {
        nodes {
          ...ticketFragment
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
          ...purchaseFragment
        }
      }

      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        peek_tours
        season_start
        season_end
        phone
        peek_base
        peek_rentals
        lead {
          data {
            lead
          }
        }
      }
    }
  `);

  console.log(data.allStrapiTour.nodes);

  const allTours: PaddleTicketTypes[] = data.allStrapiTour.nodes;
  allTours.sort((a: PaddleTicketTypes, b: PaddleTicketTypes) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
  // Sort so that featured: true first, then featured: null, then featured: false
  allTours.sort((a: PaddleTicketTypes, b: PaddleTicketTypes) => {
    if (a.featured === b.featured) return 0;
    if (a.featured === true) return -1;
    if (b.featured === true) return 1;
    if (a.featured === null && b.featured === false) return -1;
    if (a.featured === false && b.featured === null) return 1;
    return 0;
  });

  console.log("AFTER SORT");
  console.log(allTours);

  // State for the list
  const [sortedList, setList] = useState([...allTours.slice(0, 4)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(allTours.length > 4);

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true);
  };

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = sortedList.length;
      const isMore = currentLength < allTours.length;
      const nextResults = isMore
        ? allTours.slice(currentLength, currentLength + 2)
        : [];
      setList([...sortedList, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore, sortedList, allTours.length, allTours.slice]);

  //Check if there is more
  useEffect(() => {
    const isMore = sortedList.length < allTours.length;
    setHasMore(isMore);
  }, [sortedList, allTours.length]);

  // Retail
  const allRetail = data.allStrapiRetail.nodes;
  const [inventory, setInventory] = useState([...allRetail.slice(0, 2)]);
  const [loadExtra, setLoadExtra] = useState(false);
  const [hasExtra, setHasExtra] = useState(allRetail.length > 2);
  const handleLoadExtra = () => {
    setLoadExtra(true);
  };

  useEffect(() => {
    if (loadExtra && hasExtra) {
      const currentRange = inventory.length;
      const isExtra = currentRange < allRetail.length;
      const nextOutcome = isExtra
        ? allRetail.slice(currentRange, currentRange + 2)
        : [];
      setInventory([...inventory, ...nextOutcome]);
      setLoadExtra(false);
    }
  }, [loadExtra, hasExtra, inventory, allRetail.length, allRetail.slice]);

  //Check if there is more
  useEffect(() => {
    const isExtra = inventory.length < allRetail.length;
    setHasExtra(isExtra);
  }, [inventory, allRetail.length]);

  return (
    <>
      <Header />
      <main className="home">
        <section>
          {data.strapiBranch.lead ? (
            <h2 className="denali">
              <div className="react-markdown">
                <ReactMarkdown>
                  {data.strapiBranch.lead.data.lead}
                </ReactMarkdown>
              </div>
            </h2>
          ) : null}

          <div className="aconcagua-margin-block-end">
            <AboutUs />
          </div>


          <LocationDeck
            allStrapiLocation={{ ...data.allStrapiLocation }}
          />

          <div className="multi_button">
            <PaddleBookNow
              peek_base={data.strapiBranch.peek_base}
              strapiBranchName={data.strapiBranch.name}
              specificName='rentals'
              specificLink={data.strapiBranch.peek_rentals}
            />

            <PaddleBookNow
              peek_base={data.strapiBranch.peek_base}
              strapiBranchName={data.strapiBranch.name}
              specificName='tours'
              specificLink={data.strapiBranch.peek_tours}
            />
          </div>
        </section>

        <div>
          {/* TODO: rename this hero after I've cleaned that up */}
          <div className="home__photo-grid">
            <Hero2025 className="kayakers" />
            <WaterTexture className="texture" />
            <AndyPaddling className="andy" />
          </div>

          <hr />

          <PricingChart />
        </div>
      </main>

      <section
        id="tours-lessons"
        className="cloud aconcagua-padding-block-end"
      >
        <div className='condor aconcagua-padding-block-start aconcagua-padding-block-end'>
          {/* // TODO: only one h and then p */}
          <hgroup className="crest">
            <h3 className="brow">
              <Link to="/tours-lessons">Tours &amp; Lessons</Link>
            </h3>
            {/* think about capitalization here */}
            <h4 className="supra">Enjoy The Majesty Of Lake Tahoe</h4>
          </hgroup>
          <Experience />
          <h4>
            <Link to="/tours-lessons/compare">Compare Tours &amp; Lessons</Link>
          </h4>
        </div>

        <div className="flight">
          {sortedList
            .map((tour: PaddleTicketTypes) => (
              <PaddleTicket
                key={tour.id}
                {...tour}
                tour_page="tours-lessons"
                peek_tours_fall_back={data.strapiBranch.peek_tours}
                allStrapiSunsetTourTime={data.allStrapiSunsetTourTime}
              />
            ))}
        </div>
        <div className="condor aconcagua-padding-block-end">
          {hasMore ? (
            <button onClick={handleLoadMore} type="button">
              VIEW MORE TOURS &amp; LESSONS
            </button>
          ) : (
            <p>Thats all the tours</p>
          )}
          <hr />
        </div>
      </section>

      {/* // TODO add this back inthis probably still needs more */}
      {/* <MapSVG /> */}

      <section id="retail" className="albatross wrap kilimanjaro-block-end">
        <div>
          <div className="pelican">

            <h3 className="aconcagua">
              <Link to="/retail">
                Retail Store
              </Link>
            </h3>

            <Shop />

            <hr className="" />

            {/* // TODO: this should be a sport loop */}
            <h4>
              <Link to="/retail/kayak">Shop All Kayaks</Link>
            </h4>
            <h5>Shop By Feature</h5>
            <FeatureList sport="kayak" />
            {/* <h5>Shop By Brand</h5> */}
            {/* // ! <PaddleBr`andList sport="kayak" /> */}

            <hr />

            <h4>
              <Link to="/retail/paddleboard">Shop All Paddleboards</Link>
            </h4>
            <h5>Shop By Feature</h5>
            <FeatureList sport="paddleboard" />
            {/* <h5>Shop By Brand</h5> */}
            {/* // ! <PaddleBrandList sport="paddleboard" /> */}
          </div>
        </div>

        <div className="pelican">
          <div className="bag">
            {/* // TODO: these are cards that due to the layout cant be in a deck so need better margin-block-end */}
            {inventory.map((retail) => (
              <Purchase key={retail.id} {...retail} />
            ))}
            {hasExtra ? (
              <button onClick={handleLoadExtra} type="button">
                View More Products
              </button>
            ) : (
              <p>Thats all the products</p>
            )}
          </div>
        </div>
      </section >

      <Footer />
    </>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};
