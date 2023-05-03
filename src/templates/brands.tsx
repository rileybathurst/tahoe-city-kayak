// TODO: still finishing this

import React from "react"
import { Link, graphql, Script } from 'gatsby'
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';
import { useSiteUrl } from "../hooks/use-site-url";
import scrollTo from 'gatsby-plugin-smoothscroll';

import Header from '../components/header';
import Footer from '../components/footer';
import Store from "../components/locations/store";
import Card from "../components/card";
import Sport from "../components/sport";

function Next(props: { series: any[]; list: string; title: any; }) {
  const mySet1 = new Set();

  props.series.forEach((series: { series: unknown; }) => {
    mySet1.add(series.series);
  });

  if (props.list === 'true') {
    return (
      <>
        <h2>Series</h2>
        <ul className="series-list feature-list">
          {[...mySet1].map(series => (
            <li key={series}>
              {/* // TODO: why is this a different order than displayed on page */}
              {/* // TODO: make a set and thats the order maybe and add those as flex numbers? */}
              <button
                onClick={() => scrollTo(`#${series}`)}
                className="capitalize"
              >
                {series}</button>
            </li>
          ))}
        </ul >
      </>
    );
  } else {
    return (
      <>
        <Title title={props.title} set={mySet1} />
      </>
    );
  }
}

// I presume I could do this in one step but I'm not sure how
const LT = () => {
  if (location.pathname.includes('sup')) {
    return (
      <>
        sup
      </>
    );
  } else {
    return (
      <>
        kayak
      </>
    );
  }
}

const LocationName = LT();

// I need the location but Im doing it in a weird way so Im not calling it here
// const BrandsView = ({ location, data }) => {
const BrandsView = ({ data }) => {

  return (
    <>
      <Header />

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="brand-page">
        <section>
          <div className="logo">
            <div
              dangerouslySetInnerHTML={{ __html: data.brand.svg }}
              className="logo-wrapper"
            />
            {/* // TODO: clean this up with the svg above */}
            <h1 className="capitalize">{data.brand.name}</h1>
          </div>
          <p>{data.brand.tagline}.</p>
          <hr />
          {/* // TODO: needs slide that I have in other places */}
          <Next series={data.brand.retail} list='true' />
        </section>

        {/* // * the wrapper is for the background color */}
        {/* // TODO: hover the whole card and give it a shadow when we do */}
        <div className="location_card">
          <Store />
        </div>

      </main>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>

          {/* // TODO: grab the type from the page context */}
          <li>
            <Link to={`/retail/${LocationName.props.children}`}>
              <Sport sport={LocationName.props.children} />
            </Link>&nbsp;/&nbsp;
          </li>

          <li aria-current="page">{data.brand.name}</li>
        </ol>
      </nav >


      <Footer />
    </>
  );
};

export default BrandsView;

export const query = graphql`
  query (
    $slug: String!,
    $type: String!,
  ) {
    brand: strapiBrand(slug: {eq: $slug}) {
      name
      id
      name
      tagline
      svg
      retail {
        series
        title
      }
    }

    island: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "island"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    mirage: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "mirage"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    inflatable: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "inflatable"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity
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

    performance: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "performance"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    recreational: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "recreational"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    sitontop: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "sit-on-top"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    adventurerecreational: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "adventure recreational"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    lighttouring: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "light touring"}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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

    null: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {nin: [
          "island",
          "mirage",
          "inflatable",
          "performance",
          "recreational",
          "sit-on-top",
          "adventure recreational",
          "light touring"
          ]}
      }
    ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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
`