// TODO: still finishing this
// ? Object.groupBy(array, ({ series }) => series);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy

import React from "react"
import { Link, graphql, Script, useStaticQuery } from 'gatsby'

// Paddle
import { PaddleLocationCard } from "@rileybathurst/paddle";

import { SEO } from "../components/seo";
import scrollTo from 'gatsby-plugin-smoothscroll';

import Header from '../components/header';
import Footer from '../components/footer';
import Card from "../components/card";
import type { RetailType } from "../types/retail";

// TODO: get rid of props
/* function Series(props: {
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
} */

const BrandsView = ({ data }) => {

  const seriesSet = new Set();
  for (const retail of data.allStrapiRetail.nodes) {
    retail.series ? seriesSet.add(retail.series) : null;
  }
  const seriesArray = Array.from(seriesSet);
  // console.log(seriesArray);

  return (
    <>
      <Header />

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="pelican wrap">
        <section>
          {/* // TODO: logo size */}
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
          {seriesArray.length > 0 ?
            seriesArray.map(series => (
              <Link
                key={series}
                to={`#${series}`}
                onClick={e => scrollTo(`#${series}`)}
              >
                <span className="typography__secondary">{series.replace(/-/g, ' ')} Series</span>
              </Link>
            ))
            : null}
        </section>

        {/* // TODO: hover the whole card and give it a shadow when we do */}
        <PaddleLocationCard
          {...data.strapiLocation}
          background={false}
        />

      </main>

      {seriesArray.length > 0 ?
        seriesArray.map(series => (


          console.log(series),
          <>
            <section
              // key={retail.[0].series}
              // TODO: can I do a css query for empty instead
              className="passage possibly-empty"
            // id={retail.[0].series}
            >
              {series ?
                <>
                  <hr />
                  <h2 className="capitalize">
                    {series.replace(/-/g, ' ')}&nbsp;
                    <span className='typography__secondary'>Series</span>
                  </h2>
                </> : null
              }
            </section >

            <div
              className="deck"
              key={series}
            >

              {data.allStrapiRetail.nodes
                .filter((retail) => retail.series === series)
                .map((retail) => (
                  <Card
                    key={retail.id}
                    {...retail}
                  />
                ))}
            </div>
          </>
        ))
        : null}

      <hr className="pelican" />

      <section
        className="deck">
        {data.allStrapiRetail.nodes
          .filter((retail: RetailType) => retail.series === null)
          .map((retail: RetailType) => (
            <Card
              key={retail.id}
              {...retail}
            />
          ))}
      </section>

      {/* // TODO: breadcrumbs */}

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
    breadcrumbs={[
      { name: "Retail", item: "retail" },
      { name: "Kayak", item: "retail/kayak" },
      { name: data.brand.name }
    ]}
  />
)

// TODO: loop the series
export const query = graphql`
  query (
  $slug: String!,
  $sport: String!,
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
      }
    }

    allStrapiRetail(
      filter: {
        brand: {slug: {eq: $slug}},
        sport: {slug: {eq: $sport}}
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
      ...locationCardFragment
    }

  }
`