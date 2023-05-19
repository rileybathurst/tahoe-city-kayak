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
import { IGatsbyImageData } from "gatsby-plugin-image";

function Series(props: {
  retail: {
    id: any;
    type?: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    cutout?: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; };
    length?: number; width?: number; capacity?: number; inflatable?: boolean | undefined; demo?: boolean | undefined;
  };
}) {

  // console.log(props.retail);

  return (
    <div key={props.retail.id}>
      <Card retail={props.retail} />
    </div>
  )
}

function Title(props: {
  title: string;
  set: { has: (arg0: any) => any; };
}) {
  if (props.set.has(props.title)) {

    // add a regex to replace dahes with spaces
    let Spacedtitle = props.title.replace(/-/g, ' ');

    return (
      <>
        <hr />
        <h2 className="capitalize">{Spacedtitle}&nbsp;
          <span className='typography__secondary'>Series</span>
        </h2>
      </>
    )
  }
  return null
}

// Check is there are any products in a series
function Capacity(props: {
  series: any[];
  list: string;
  title: string;
  type: string;
}) {

  let typed = props.type.includes('kayak') ? 'kayak' : 'sup';
  const seriesSet = new Set();

  props.series.forEach((series: {
    // series: unknown;
  }) => {
    if (series.type === typed && series.series !== null) {
      // this doesnt work with spaces in the name as its 2 ids not one
      // seriesSet.add(series.series);
      let dashed = series.series.replace(/ /g, '-');
      seriesSet.add(dashed);
    }
  });

  // console.log(seriesSet);

  const spaced = (series: string) => {
    let spaced = series.replace(/-/g, ' ');
    return spaced;
  }

  const dashed = (series: string) => {
    let dashed = series.replace(/ /g, '-');
    return dashed;
  }

  if (props.list === 'true') {
    return (
      <>
        <h2>Series</h2>
        {/* // TODO: why both names */}
        <ul className="series-list feature-list">
          {[...seriesSet].map(series => (

            <li key={series} >
              {/* // TODO: why is this a different order than displayed on page */}
              {/* // TODO: make a set and thats the order maybe and add those as flex numbers? */}
              <button
                // TODO: 

                onClick={() => scrollTo(`#${dashed(series)}`)}
                className="capitalize"
              >
                {spaced(series)}
              </button>
            </li >
          ))
          }
        </ul >
      </>
    );

  } else {
    return (
      <Title title={props.title} set={seriesSet} />
    );
  }
}

function Breadcrumbs(props: {
  children: React.ReactFragment;
  brand: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumbs"
    >
      <ol>
        <li>
          <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        </li>
        <li>
          {props.children}
        </li>
        <li aria-current="page">{props.brand}</li>
      </ol>
    </nav >
  )
}

// 🍞 breadcrumbs are a little different
function Toast(props: {
  butter: string;
  brand: string;
}) {
  if (props.butter.includes('sup')) {
    return (
      <Breadcrumbs brand={props.brand}>
        <Link to={`/retail/sup`}>
          Standup Paddleboards
        </Link>&nbsp;/&nbsp;
      </Breadcrumbs >
    );
  } else {
    return (
      <Breadcrumbs brand={props.brand}>
        <Link to={`/retail/kayak`}>
          Kayaks
        </Link>&nbsp;/&nbsp;
      </Breadcrumbs >
    );
  }
}

const BrandsView = ({ location, data }) => {

  return (
    <>
      <Header />

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="brand-page">
        <section>
          <div className="logo">
            {/* // TODO: logo size */}
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
          <Capacity
            series={data.brand.retail}
            type={location.pathname}
            list='true'
          />
        </section>

        {/* // * the wrapper is for the background color */}
        {/* // TODO: hover the whole card and give it a shadow when we do */}
        <div className="location_card">
          <Store />
        </div>

      </main>

      <section id='island' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="island" />
      </section>
      {/* this has to be here */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has */}
      <div className="deck">
        {
          data.island.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='mirage' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="mirage" />
      </section>
      <div className="deck">
        {
          data.mirage.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='inflatable' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="inflatable" />
      </section>
      <div className="deck">
        {
          data.inflatable.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='performance' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="performance" />
      </section>
      <div className="deck">
        {
          data.performance.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='recreational' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="recreational" />
      </section>
      <div className="deck">
        {
          data.recreational.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='sit-on-top' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="sit-on-top" />
      </section>
      <div className="deck">
        {
          data.sitontop.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='adventure-recreational' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="adventure-recreational" />
      </section>
      <div className="deck">
        {
          data.adventurerecreational.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section id='light-touring' className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="light-touring" />
      </section>
      <div className="deck">
        {
          data.lighttouring.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <section className="passage possibly-empty">
        <Capacity series={data.brand.retail} type={location.pathname} title="null" />
      </section>
      <div className="deck">
        {
          data.null.nodes.map((retail: { id: React.Key | null | undefined; }) => (
            <div key={retail.id}>
              <Series
                retail={retail}
              />
            </div>
          ))
        }
      </div>

      <Toast
        butter={location.pathname}
        brand={data.brand.name}
      />

      <Footer />
    </>
  );
};

export default BrandsView;

export const Head = ({ data }) => {
  return (
    <SEO
      // TODO: capitalize brand name
      // TODO: add type in here which Im not 100% on as I might be able to use location but its head?
      // TODO: double check searches for kayak and sup
      title={`${data.brand.name} Kayaks sold at ${useSiteName()}`}
      description={`${data.brand.name} kayaks ${data.brand.tagline}`}
    >
      <Script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Retail",
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Retail",
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "Kayak",
            "item": "${useSiteUrl()}/retail/kayak"
          },{
            "@type": "ListItem",
            "position": 4,
            "name": "${data.brand.name}"
          }]
        }
      `}
      </Script>

    </SEO>
  )
}


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
        title
        series
        type
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
        type
        brand {
          slug
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
    }

  }
`