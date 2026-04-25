import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
// import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import SVG from 'react-inlinesvg';
import {
  PaddleBookNow,
  PaddleCard,
  // PaddleBrandList,
  PaddleTestimonial,
  type PaddleCardTypes,
  type PaddleTestimonialTypes,
  type PaddleGatsbyImageType
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
// import FeatureList from "../components/feature-list";
import AboutUs from "../content/about-us";
import Shop from "../content/shop";

import Experience from "../content/experience";
// import Purchase from "../components/purchase";
import ReactMarkdown from "react-markdown";
import Locales from "../components/locales";
import Hero from "../components/hero";
import { TourCardTypes } from "../types/tour-card-types";
import { RetailCardTypes } from "../types/retail-card-types";

const IndexPage = () => {

  type indexTypes = {
    strapiImagegrab: {
      image: PaddleGatsbyImageType
    };
    allStrapiTour: {
      nodes: TourCardTypes[];
    };
    allStrapiSunsetTourTime: {
      nodes: {
        id: React.Key;
        endDate: string;
        endTime: string;
        startDate: string;
        startTime: string;
      }[];
    };
    kayak: RetailCardTypes;
    paddleboard: RetailCardTypes;
    strapiBranch: {
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
    };
    allStrapiBrand: {
      nodes: {
        name: string;
        id: string;
        slug: string;
        svg: string;

        retail: {
          id: string;
          sport: {
            slug: string;
          };
        }[];
      }[];
    };
    strapiTestimonial: PaddleTestimonialTypes;
  }

  const data: indexTypes = useStaticQuery(graphql`
    query IndexQuery {

      allStrapiTour(
        sort: {order: ASC}
        filter: {branch: {slug: {eq: "tahoe-city"}}}
        ) {
        nodes {
          ...CardTourFragment
        }
      }

      allStrapiBrand {
        nodes {
          id
          name
          slug
          svg

          retail {
            id
            sport {
              slug
            }
          }
        }
      }

      kayak: strapiRetail(
        featured: {eq: true},
        sport: {slug: {eq: "kayak"}}
        ) {
          ...CardRetailFragmentPlusBrand
      }
      
      paddleboard: strapiRetail(
        featured: {eq: true},
        sport: {slug: {eq: "paddleboard"}}
        ) {
          ...CardRetailFragmentPlusBrand
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

      strapiTestimonial(branch: {slug: {eq: "tahoe-city"}}) {
        testimonial
        customer
        sign
        location
      }
    }
  `);

  const allTours = data.allStrapiTour.nodes;
  const [sortedList, setList] = useState([...allTours.slice(0, 4)]);

  // State to trigger load more
  const [loadMore, setLoadMore] = useState(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = useState(data.allStrapiTour.nodes.length > 4);

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true);
  };

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = sortedList.length;
      const isMore = currentLength < data.allStrapiTour.nodes.length;
      const nextResults = isMore
        ? data.allStrapiTour.nodes.slice(currentLength, currentLength + 2)
        : [];
      setList([...sortedList, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore, sortedList, data.allStrapiTour.nodes.length, data.allStrapiTour.nodes.slice]);

  //Check if there is more
  useEffect(() => {
    const isMore = sortedList.length < data.allStrapiTour.nodes.length;
    setHasMore(isMore);
  }, [sortedList, data.allStrapiTour.nodes.length]);

  // console.log(data.kayak);
  // console.log(data.paddleboard);

  const products = [data.kayak, data.paddleboard] as RetailCardTypes[];
  const retailSports = [
    { slug: "kayak", label: "Kayaks" },
    { slug: "paddleboard", label: "Paddleboards" },
  ] as const;

  // console.log(data.strapiImagegrab.image.localFile.childImageSharp.gatsbyImageData);

  return (
    <React.Fragment>
      <Header />
      <main className="albatross">

        <Hero
          overlay={<Locales all={true} />}
        />

        <PricingChart />


        <div className='pelican'>
          <div className="margin-block-end-aconcagua">
            <h2 className="denali">
              <ReactMarkdown>
                {data.strapiBranch.lead.data.lead}
              </ReactMarkdown>
            </h2>
            <div className="react-markdown">
              <AboutUs />
            </div>
          </div>
        </div>

        <div className="pelican multi_button">
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

      </main >

      <section
        id="tours-lessons"
        className="panel aconcagua-padding-block-end"
      >
        <div className='condor aconcagua-padding-block'>
          <h3 className="font-serif">
            <Link to="/tours-lessons">Let Us Be Your Guide to Tahoe Adventure</Link>
          </h3>
          <Experience />
        </div>


        <div className="deck">
          {sortedList
            .map((tour) => {
              return (
                <PaddleCard
                  key={tour.id}
                  {...tour}
                  link={`/tours-lessons/${tour.slug}`}
                  paddleBookNow={{
                    peek_base: data.strapiBranch.peek_base,
                    strapiBranchName: data.strapiBranch.name,
                    specificLink: tour.peek,
                  }}
                />
              );
            })}
        </div>
        <div className="condor aconcagua-padding-block-end">
          {hasMore ? (
            <button onClick={handleLoadMore} type="button">
              View More Tours &amp; Lessons
            </button>
          ) : (
            <p>Thats all the tours</p>
          )}
          <hr />
          <h4>
            <Link to="/tours-lessons/compare">Compare Tours &amp; Lessons</Link>
          </h4>
        </div>
      </section>

      {/* // TODO add this back inthis probably still needs more */}
      {/* <MapSVG /> */}

      <section id="retail" className="albatross kilimanjaro-block-end">
        <div className="pelican">

          <h3 className="aconcagua">
            <Link to="/retail">
              Retail Store
            </Link>
          </h3>

          <Shop />

          <hr />

          {/*           {retailSports.map((sport, index) => (
            <React.Fragment key={sport.slug}>
              {index > 0 ? <hr /> : null}

              <h4>
                <Link to={`/retail/${sport.slug}`}>Shop All {sport.label}</Link>
              </h4>
              // <h5>Shop By Feature</h5>
          <FeatureList sport={sport.slug} />
        </React.Fragment>
          ))} */}

        </div>


        <ul className='albatross brand_list'>
          {data.allStrapiBrand.nodes
            .filter(brand => brand.retail.some((item) => retailSports.some(sport => sport.slug === item.sport.slug)))
            .map((brand) => {
              const sportSlug = brand.retail.some(item => item.sport.slug === 'kayak') ? 'kayak' : 'paddleboard';
              return (
                <li key={brand.id}>
                  <Link to={`/retail/${sportSlug}/${brand.slug}`}
                    className='button'
                  >
                    {brand.svg &&
                      <SVG src={brand.svg} />
                    }
                  </Link>
                </li>
              );
            })}
        </ul>



        <div className="everest-padding-block">
          <div className="deck">
            {products.map((retail) => (
              <PaddleCard
                key={retail.id}
                {...retail}
                link={`/retail/${retail.sport.slug}/${retail.brand.slug}/${retail.slug}`}
              />
            ))}
          </div>
        </div>
      </section >

      {/* // * specifically using a single here */}
      <section className="panel denali-padding-block">
        <ul className='pelican aconcagua-margin-block-end'>
          {/* TODO: quotes need the spacing to be cleaned up */}
          <PaddleTestimonial {...data.strapiTestimonial} />
        </ul>
      </section>

      <Footer />
    </React.Fragment >
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};
