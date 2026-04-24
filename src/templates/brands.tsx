// TODO: still finishing this
// ? Object.groupBy(array, ({ series }) => series);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy

import * as React from "react";
import { Link, graphql } from "gatsby";

import type { PaddlePurchaseTypes, PaddleLocationTypes } from "@rileybathurst/paddle";

type PaddlePurchaseTypesWithSeries = PaddlePurchaseTypes & {
  series?: string | null;
};

import { SEO } from "../components/seo";
import scrollTo from "gatsby-plugin-smoothscroll";

import Header from "../components/header";
import Footer from "../components/footer";
import Purchase from "../components/purchase";
import SVG from 'react-inlinesvg';
import Locales from "../components/locales";

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
    <Purchase
      key={props.retail.id}
      {props.retail}
    />
  )
} */

type BrandsViewTypes = {
  data: {
    brand: {
      name: string;
      tagline: string;
      svg: string;
      slug: string;
      retail: {
        title: string;
        series: string;
      };
    };
    allStrapiRetail: {
      nodes: PaddlePurchaseTypes[];
    };
  };
};
const BrandsView = ({ data }: BrandsViewTypes) => {
  const seriesSet = new Set<string>();
  for (const retail of data.allStrapiRetail.nodes as PaddlePurchaseTypesWithSeries[]) {
    retail.series ? seriesSet.add(retail.series) : null;
  }
  const seriesArray: string[] = Array.from(seriesSet);
  // console.log(seriesArray);

  return (
    <>
      <Header />

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="pelican">
        <section>
          {/* // TODO: logo size */}
          <div className="logo">
            <div className="logo-wrapper">
              <SVG src={data.brand.svg} />
            </div>
            {/* // TODO: clean this up with the svg above */}
            <h1 className="capitalize">{data.brand.name}</h1>
          </div>
          <p>{data.brand.tagline}.</p>
          <hr />

          {/* // TODO: needs slide that I have in other places */}
          {seriesArray.length > 0
            ? seriesArray.map((series) => (
              <>
                <Link
                  key={series}
                  to={`#${series}`}
                  onClick={(e) => scrollTo(`#${series}`)}
                >
                  <span className="typography__secondary">
                    {series.replace(/-/g, " ")} Series
                  </span>
                </Link>
                &nbsp;
              </>
            ))
            : null}
        </section>

        <Locales
          retail={true}
        />
      </main>

      {seriesArray.length > 0
        ? seriesArray.map((series) => (
          <>
            <section
              // key={retail.[0].series}
              className="albatross possibly-empty"
            // id={retail.[0].series}
            >
              {series ? (
                <>
                  <hr />
                  <h2 className="capitalize">
                    {series.replace(/-/g, " ")}&nbsp;
                    <span className="typography__secondary">Series</span>
                  </h2>
                </>
              ) : null}
            </section>

            <div className="deck" key={series}>
              {(data.allStrapiRetail.nodes as PaddlePurchaseTypesWithSeries[])
                .filter((retail) => retail.series === series)
                .map((retail) => (
                  <Purchase key={retail.id} {...retail} />
                ))}
            </div>
          </>
        ))
        : null}

      <hr className="pelican" />

      <section className="deck">
        {(data.allStrapiRetail.nodes as PaddlePurchaseTypesWithSeries[])
          .filter((retail) => retail.series === null)
          .map((retail) => (
            <Purchase key={retail.id} {...retail} />
          ))}
      </section>

      {/* // TODO: breadcrumbs */}

      <Footer />
    </>
  );
};

export default BrandsView;

export const Head = ({ data }: BrandsViewTypes) => (
  <SEO
    // TODO: https://schema.org/brand
    // TODO: capitalize brand name
    // TODO: add type in here which Im not 100% on as I might be able to use location but its head?
    // TODO: double check searches for kayak and sup
    title={`${data.brand.name} Kayaks sold at`}
    description={`${data.brand.name} kayaks ${data.brand.tagline}`}
    breadcrumbs={[
      { name: "Retail", item: "retail" },
      { name: "Kayak", item: "retail/kayak" },
      { name: data.brand.name, item: `retail/kayak/${data.brand.slug}` },
    ]}
  />
);

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
          ...purchaseFragment
        series
      }
    }

  }
`;
