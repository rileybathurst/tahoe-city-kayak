import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";

import {
  PaddleBookNow,
  PaddleTicket,
  PaddleBrandList,
  PaddleTestimonial,
  type PaddleTicketTypes,
  type PaddlePurchaseTypes,
  type PaddleTestimonialTypes,
} from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Hero2025 from "../images/hero-2025";
import FeatureList from "../components/feature-list";
import AboutUs from "../content/about-us";
import Shop from "../content/shop";

import Experience from "../content/experience";
import Purchase from "../components/purchase";
import ReactMarkdown from "react-markdown";
import LocationDeck from "../components/location-deck";

const IndexPage = () => {

  type indexTypes = {
    hero2025: {
      image: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        alternativeText: string;
      };
    };
    andy: {
      title: string;
      image: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    };
    water: {
      title: string;
      image: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    };
    allStrapiTour: {
      nodes: PaddleTicketTypes[];
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
    kayak: PaddlePurchaseTypes;
    paddleboard: PaddlePurchaseTypes;
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

      hero2025: strapiImagegrab(title: {eq: "hero2025"}) {
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }

      andy: strapiImagegrab(title: {eq: "andy"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      water: strapiImagegrab(title: {eq: "WaterTexture"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

      allStrapiTour(
        sort: {order: ASC}
        filter: {branch: {slug: {eq: "tahoe-city"}}}
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
          ...brandedFragment
      }
      
      paddleboard: strapiRetail(
        featured: {eq: true},
        sport: {slug: {eq: "paddleboard"}}
        ) {
          ...brandedFragment
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

  const products = [data.kayak, data.paddleboard] as PaddlePurchaseTypes[];
  const retailSports = [
    { slug: "kayak", label: "Kayaks" },
    { slug: "paddleboard", label: "Paddleboards" },
  ] as const;

  return (
    <React.Fragment>
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
            all={true}
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
            <GatsbyImage
              image={data.hero2025.image.localFile.childImageSharp.gatsbyImageData}
              alt={data.hero2025.image.alternativeText || "Hero Image 2025"}
              className="img__wrapped kayakers"
              objectPosition="center top"
            />
            <GatsbyImage
              image={data.water.image?.localFile?.childImageSharp?.gatsbyImageData}
              alt={data.water.title}
              className="img__wrapped texture"
            />
            <GatsbyImage
              image={data.andy.image?.localFile?.childImageSharp?.gatsbyImageData}
              alt={data.andy.title}
              className="img__wrapped andy"
            />
          </div>

          <hr />

          <PricingChart />
        </div>
      </main>

      <section
        id="tours-lessons"
        className="panel aconcagua-padding-block-end"
      >
        <div className='condor aconcagua-padding-block'>
          <h2>
            <Link to="/tours-lessons">Tours &amp; Lessons</Link>
          </h2>
          <Experience />
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

      <section id="retail" className="albatross wrap kilimanjaro-block-end">
        <div>
          <div className="pelican">

            <h3 className="aconcagua">
              <Link to="/retail">
                Retail Store
              </Link>
            </h3>

            <Shop />

            <hr />

            {retailSports.map((sport, index) => (
              <React.Fragment key={sport.slug}>
                {index > 0 ? <hr /> : null}

                <h4>
                  <Link to={`/retail/${sport.slug}`}>Shop All {sport.label}</Link>
                </h4>
                <h5>Shop By Feature</h5>
                <FeatureList sport={sport.slug} />
                <h5>Shop By Brand</h5>

                <PaddleBrandList
                  brands={data.allStrapiBrand.nodes
                    .filter((brand) => brand.retail.some((retail) => retail.sport.slug === sport.slug))
                  }
                  sport={sport.slug}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="panel pelican everest-padding-block">
          <div className="bag">
            {products.map((retail: PaddlePurchaseTypes) => (
              <Purchase key={retail.id} {...retail} />
            ))}
          </div>
        </div>
      </section >

      {/* // * specifically using a single here */}
      <section className="denali-padding-block">
        <ul className='pelican aconcagua-margin-block-end'>
          {/* TODO: quotes need the spacing to be cleaned up */}
          <PaddleTestimonial {...data.strapiTestimonial} />
        </ul>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};
