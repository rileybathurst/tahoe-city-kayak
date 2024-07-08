// TODO: still finishing this

import React from "react"
import { Link, graphql, Script, useStaticQuery } from 'gatsby'

// Paddle
import { PaddleLocationCard } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { useSiteUrl } from "../hooks/use-site-url";
import scrollTo from 'gatsby-plugin-smoothscroll';

import Header from '../components/header';
import Footer from '../components/footer';
import LocationCard from "../components/location-card";
import Card from "../components/card";
import { IGatsbyImageData } from "gatsby-plugin-image";

// TODO: get rid of props
function Series(props: {
  retail: {
    id: any;
    type?: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    cutout?: { localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData; }; }; alternativeText: string; };
    length?: number; width?: number; capacity?: number; inflatable?: boolean | undefined; demo?: boolean | undefined;
    discount?: number;
  };
}) {

  // console.log(props.retail);

  return (
    <Card
      key={props.retail.id}
      {props.retail}
    />
  )
}



// ! remove this when im done
function Capacity({ series, title }
) {
  if (series.nodes?.length > 0) {
    return (
      <>
        <hr />
        <h2 className="capitalize">{title.replace(/-/g, ' ')}&nbsp;
          <span className='typography__secondary'>Series</span>
        </h2>
      </>
    );
  } else {
    return null;
  }
}

function NullCheck({ series, title }
) {
  if (series.nodes?.length > 0 || title === 'null') {
    return (
      <>
        <hr />
        <h2 className="capitalize">{title.replace(/-/g, ' ')}&nbsp;
          <span className='typography__secondary'>Series</span>
        </h2>
      </>
    );
  } else {
    return null;
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
// TODO: Toast is a specific thing rename this
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
  }
  return (
    <Breadcrumbs brand={props.brand}>
      <Link to={`/retail/kayak`}>
        Kayaks
      </Link>&nbsp;/&nbsp;
    </Breadcrumbs >
  );
}

const BrandsView = ({ location, data }) => {

  const series = [
    data.island,
    data.mirage,
    data.inflatable,
    data.performance,
    data.recreational,
    data.sitontop,
    data.adventurerecreational,
    data.lighttouring,
    data.null
  ]

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

        {/* // TODO: hover the whole card and give it a shadow when we do */}
        <PaddleLocationCard
          {...data.strapiLocation}
          background={false}
        />

      </main>

      {series.map(series => (
        <>
          <section
            id={series.nodes[0]?.series}
            key={series.nodes[0]?.series}
            className="passage possibly-empty"
          >
            <NullCheck
              series={series}
              title={series.nodes[0]?.series || ''}
            />
          </section>
          <div className="deck">
            {series.nodes.map((retail: { id: React.Key; }) => (
              <div key={retail.id}>
                <Series
                  retail={retail}
                />
              </div>
            ))
            }
          </div>
        </>
      ))}

      <Toast
        butter={location.pathname}
        brand={data.brand.name}
      />

      <Footer />
    </>
  );
};

export default BrandsView;

export const Head = ({ data }) => (
  <SEO
    // TODO: https://schema.org/brand
    // TODO: capitalize brand name
    // TODO: add type in here which Im not 100% on as I might be able to use location but its head?
    // TODO: double check searches for kayak and sup
    title={`${data.brand.name} Kayaks sold at ${useSiteMetadata().title}`}
    description={`${data.brand.name} kayaks ${data.brand.tagline}`}
  >
    {/* // ! this has a couple the same its definitely not right */}
    <Script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Retail",
            "item": "${useSiteMetadata().url}/retail"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "Retail",
            "item": "${useSiteMetadata().url}/retail"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "Kayak",
            "item": "${useSiteMetadata().url}/retail/kayak"
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
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    mirage: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "mirage"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    inflatable: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "inflatable"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    performance: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "performance"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    recreational: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "recreational"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    sitontop: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "sit-on-top"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    adventurerecreational: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "adventure recreational"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    lighttouring: allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        type: {eq: $type},
        series: {eq: "light touring"}
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
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
      },
      sort: {featured: ASC}
    ) {
      nodes {
        ...retailCard
        series
      }
    }

    strapiLocation: strapiLocation(
      locale: {slug: {eq: "tahoe-city"}}
      name: {eq: "Retail Location"}
    ) {
      ...locationCard
    }

  }
`