import React from "react";
import { Link, graphql, Script } from "gatsby";
import { SEO } from "../components/seo";

import Markdown from "react-markdown";
import Sport from "../components/sport";
import Header from "../components/header";
import Footer from "../components/footer";
import Phone from "../components/phone";

import { Breadcrumb, Breadcrumbs } from "react-aria-components";
import {
  PaddleSpecs,
  type PaddleGatsbyImageType,
  PaddleCard
} from "@rileybathurst/paddle";
import SVG from 'react-inlinesvg';
import Hero from "../components/hero";
import type { RetailCardTypes } from "../types/retail-card-types";

type RetailTemplateType = {
  data: {
    strapiRetail: {
      id: React.Key;
      title: string;
      brand: {
        name: string;
        slug: string;
        svg: string;
      };
      slug: string;
      price: number;
      excerpt: string;
      start?: Date;
      end?: Date;
      duration?: number;
      peek: string;
      sport: {
        slug: string;
      };
      crew: number;
      hullweight: number;
      riggedweight: number;
      thickness: number;
      // volume?: number;

      inflatable: boolean;
      demo: boolean;

      // discount?: number; currently unused so has to be removed from query
      length: number;
      width: number;
      capacity: number;
      cutout: PaddleGatsbyImageType;
      features: {
        data: {
          features: string;
        };
      };
      description: {
        data: {
          description: string;
        };
      };
      series: string;
    };
    strapiDemo: {
      text: {
        data: {
          text: string;
        };
      };
    };
    allStrapiRetail: {
      nodes: RetailCardTypes[];
    };
    strapiShop: {
      collage: PaddleGatsbyImageType;
    };
  };
};

const RetailTemplate = ({ data }: RetailTemplateType) => {

  return (
    <React.Fragment>
      <Header />

      {/* I want to try put a background into  this again maybe a whole bunch of blur and then different images based on the theme doesnt need south */}
      <Hero
        image={data.strapiRetail.cutout}
        background={true}
        objectFit="contain"
      />

      <main>
        <Link to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}>
          <h2 className="sr-only">{data.strapiRetail.brand.name}</h2>
          <SVG src={data.strapiRetail.brand.svg} />
        </Link>

        <h1>{data.strapiRetail.title}</h1>
        {/* <Series series={data.strapiRetail.series} /> */}

        <hr />

        <div className="react-markdown">
          <Markdown>
            {data.strapiRetail.description?.data?.description}
          </Markdown>
        </div>

        {data.strapiRetail.features && (
          <React.Fragment>
            <hr />
            <h3>Features</h3>
            <div className="react-markdown features">
              <Markdown>{data.strapiRetail.features.data.features}</Markdown>
            </div>
          </React.Fragment>
        )}

        <hr />
        <section className="specs">
          <h3>SPECS:</h3>

          <PaddleSpecs
            crew={data.strapiRetail.crew}
            capacity={data.strapiRetail.capacity}
            length={data.strapiRetail.length}
            width={data.strapiRetail.width}
            weight={{
              hullweight: data.strapiRetail.hullweight,
              riggedweight: data.strapiRetail.riggedweight,
            }}
            thickness={data.strapiRetail.thickness}
            inflatable={data.strapiRetail.inflatable ? "Yes" : null}
            demo={data.strapiRetail.demo ? "Yes" : null}
            cost={{
              price: data.strapiRetail.price,
              // discount: data.strapiRetail.discount // * currently unused so has to be removed
            }}
          />
        </section>
      </main>

      {data.strapiRetail.demo ? (
        <article>
          <h3>Demo</h3>
          <div className="react-markdown">
            <Markdown>
              {data.strapiDemo.text.data.text}
            </Markdown>
          </div>
          <p>
            <Phone />
          </p>
        </article>
      ) : null}

      <hr className="albatross" />
      {data.allStrapiRetail.nodes.length > 0 ? (
        <article>
          <section className="condor">
            <h2>
              Other <Sport sport={data.strapiRetail.sport.slug} />s by{" "}
              <span className="capitalize">{data.strapiRetail.brand.name}</span>
            </h2>
          </section>
          <section className="deck">
            {data.allStrapiRetail.nodes.map((retail) => (
              <PaddleCard
                key={retail.id}
                {...retail}
                link={`/retail/${retail.sport.slug}/${retail.brand.slug}/${retail.slug}`}
                objectFit="contain"
              />
            ))}
          </section>
          <section className="condor">
            <h3>
              <Link
                to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}
              >
                More <Sport sport={data.strapiRetail.sport.slug} />s by{" "}
                <span className="capitalize">
                  {data.strapiRetail.brand.name}
                </span>
              </Link>
            </h3>
          </section>
        </article>
      ) : (
        <section className="condor">
          <h3 className="font-serif">
            <Link to={`/retail/${data.strapiRetail.sport.slug}`}>
              Browse other <Sport sport={data.strapiRetail.sport.slug} />s
            </Link>
          </h3>

          {/* // TODO: cards here for nothing else in this brand */}
        </section>
      )}

      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/retail/">Retail</Link>
        </Breadcrumb>

        <Breadcrumb>
          <Link to={`/retail/${data.strapiRetail.sport.slug}`}>
            <Sport sport={data.strapiRetail.sport.slug} />
          </Link>
        </Breadcrumb>

        <Breadcrumb>
          <Link
            to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}
          >
            {data.strapiRetail.brand.name}
          </Link>
        </Breadcrumb>
        <Breadcrumb>{data.strapiRetail.title}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  );
};

export default RetailTemplate;

const capitalizeWords = (str: string) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

type RetailTemplateHeadProps = {
  data: {
    strapiRetail: RetailTemplateType["data"]["strapiRetail"];
  };
};
export const Head = ({ data }: RetailTemplateHeadProps) => {
  const brandName = capitalizeWords(data.strapiRetail.brand.name);

  return (
    <SEO
      title={`${data.strapiRetail.title} by ${brandName}`}
      description={data.strapiRetail.excerpt}
      breadcrumbs={[
        { name: "Retail", item: "retail" },
        {
          name: data.strapiRetail.sport.slug,
          item: `retail/${data.strapiRetail.sport.slug}`,
        },
        {
          name: data.strapiRetail.brand.slug,
          item: `retail/${data.strapiRetail.brand.slug}`,
        },
        {
          name: data.strapiRetail.title,
          item: `retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`,
        },
      ]}
    >
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${data.strapiRetail.title}",
            "description": "${data.strapiRetail.excerpt}",
            "brand": {
              "@type": "Brand",
              "name": "${brandName}"
            },
            "image": "${data.strapiRetail?.cutout?.alternativeText}",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "USD",
              "price": "${data.strapiRetail.price}"
            }
          }
        `}
      </Script>
    </SEO>
  );
};

export const query = graphql`
  query (
    $slug: String!,
    $brand: String!
  ) {
    strapiRetail(slug: {eq: $slug}) {
      id
      title
      excerpt
      series
      crew
      capacity
      length
      hullweight
      riggedweight
      width
      thickness
      inflatable
      demo
      price

      sport {
        slug
      }

      brand {
        name
        slug
        svg
      } 

      description {
        data {
          description
        }
      }

      features {
        data {
          features
        }
      }

      cutout {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

    strapiDemo {
      text {
        data {
          text
        }
      }
    }

    allStrapiRetail(filter:
      {
        slug: {ne: $slug},
        brand: {slug: {eq: $brand}}
      }
      limit: 2,
      sort: {featured: DESC}
      ) {
        nodes {
        ...CardRetailFragment
      }
    }

    strapiShop {
      collage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }

  }
`;

// * discount was removed as currently we dont have it in use so its breaking the build
// * volume was removed as currently we dont have it in use so its breaking the build

// TODO: should I do something with strapiMedia grab? this is the last one left