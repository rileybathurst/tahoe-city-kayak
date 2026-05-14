import React from "react";
import { Link, graphql, Script } from "gatsby";
import { SEO } from "../components/seo";

import Markdown from "react-markdown";
import Sport from "../components/sport";
import Header from "../components/header";
import Footer from "../components/footer";
import Phone from "../components/phone";
import type { RetailType } from "../types/retail";

import { Breadcrumb, Breadcrumbs } from "react-aria-components";
import {
  PaddleSpecs,
  type PaddleGatsbyImageType,
  type PaddleCardTypes,
  PaddleCard
} from "@rileybathurst/paddle";
import SVG from 'react-inlinesvg';
import Hero from "../components/hero";
import { GatsbyImage } from "gatsby-plugin-image";

const Series = ({ series }: { series: string }) => {
  if (series) {
    return (
      <div className="h_series">
        <div className="spec">
          <h2>Series</h2>
          <h3>{series}</h3>
        </div>
      </div>
    );
  }
  return null;
}

type ExtentdedPurchaseTypes = PaddleCardTypes & {
  series: string;
  crew: number;
  hullweight: number;
  riggedweight: number;
  thickness: number;
  price: number;
  description: {
    data: {
      description: string;
    };
  };
  features: {
    data: {
      features: string;
    };
  };
  cutout: PaddleGatsbyImageType;
};

type RetailTypeViewProps = {
  data: {
    strapiRetail: RetailType;
    strapiDemo: {
      text: {
        data: {
          text: string;
        };
      };
    };
    allStrapiRetail: {
      nodes: ExtentdedPurchaseTypes[];
    };
    strapiMedia: PaddleGatsbyImageType;
  };
};

const RetailTypeView = ({ data }: RetailTypeViewProps) => {

  console.log(data.strapiRetail.cutout);

  return (
    <>
      <Header />

      <Hero
        image={data.strapiMedia}
        collage={data.strapiRetail.cutout ? data.strapiRetail.cutout : null}
      />

      <main>
        <Link to={`/retail/${data.strapiRetail.sport.slug}/${data.strapiRetail.brand.slug}`}>
          <h2 className="sr-only">{data.strapiRetail.brand.name}</h2>
          <SVG src={data.strapiRetail.brand.svg} />
        </Link>

        <h1>{data.strapiRetail.title}</h1>

        <Series series={data.strapiRetail.series} />

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
            inflatable={data.strapiRetail.inflatable ? "Yes" : "No"}
            demo={data.strapiRetail.demo ? "Yes" : "No"}
            cost={{
              price: data.strapiRetail.price,
              // discount: data.strapiRetail.discount // * currently unused so has to be removed
            }}
          />
        </section>

        {data.strapiRetail.features && (
          <>
            <h3>Features</h3>
            <div className="react-markdown features">
              <Markdown>{data.strapiRetail.features.data.features}</Markdown>
            </div>
            <hr />
          </>
        )}
      </main>

      <div className="react-markdown pelican">
        <Markdown>
          {data.strapiRetail.description?.data?.description}
        </Markdown>
      </div>

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
            {data.allStrapiRetail.nodes.map((retail: PaddleCardTypes) => (
              <PaddleCard
                key={retail.id}
                {...retail}
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
          <h3>
            <Link to={`/retail/${data.strapiRetail.sport.slug}`}>
              Browse other <Sport sport={data.strapiRetail.sport.slug} />s
            </Link>
          </h3>
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
    </>
  );
};

export default RetailTypeView;

type RetailTypeViewHeadProps = {
  data: {
    strapiRetail: RetailType;
  };
};
export const Head = ({ data }: RetailTypeViewHeadProps) => {
  return (
    <SEO
      // TODO: can I make the brands capitalize?
      title={`${data.strapiRetail.title} by ${data.strapiRetail.brand.name}`}
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
              "name": "${data.strapiRetail.brand.name}"
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

    strapiMedia(name: {regex: "/tim-mossholder-z3Xp1ZcvzgE-unsplash.jpg/"}) {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      alternativeText
    }

  }
`;

// * discount was removed as currently we dont have it in use so its breaking the build
// * volume was removed as currently we dont have it in use so its breaking the build
