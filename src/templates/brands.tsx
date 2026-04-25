import * as React from "react";
import { Link, graphql } from "gatsby";

import { PaddleCard } from "@rileybathurst/paddle";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

import { SEO } from "../components/seo";
import scrollTo from "gatsby-plugin-smoothscroll";

import Header from "../components/header";
import Footer from "../components/footer";
import SVG from 'react-inlinesvg';
import Locales from "../components/locales";
import type { RetailCardTypes } from "../types/retail-card-types";

type BrandsViewTypes = {
  strapiBrand: {
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
    nodes: RetailCardTypes[];
  };
};
const BrandsView = ({ data, location }: { data: BrandsViewTypes, location: { pathname: string } }) => {

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const middleSegment = pathSegments[1]; // Gets the second segment (index 1)
  const isValidSport = middleSegment === 'kayak' || middleSegment === 'paddleboard';

  console.log('Path segments:', pathSegments);
  console.log('Middle segment:', middleSegment);
  console.log('Is valid sport:', isValidSport);

  const seriesSet = new Set<string>();
  for (const retail of data.allStrapiRetail.nodes as RetailCardTypes[]) {
    retail.series ? seriesSet.add(retail.series) : null;
  }
  const seriesArray: string[] = Array.from(seriesSet);

  return (
    <>
      <Header />

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="pelican">
        <section>
          {/* // TODO: logo size */}
          <div className="logo">
            <div className="logo-wrapper">
              <SVG src={data.strapiBrand.svg} />
            </div>
            {/* // TODO: clean this up with the svg above */}
            <h1 className="capitalize">{data.strapiBrand.name}</h1>
          </div>
          <p>{data.strapiBrand.tagline}.</p>
          <hr />

          {/* // TODO: needs slide that I have in other places */}
          {seriesArray.length > 0
            ? seriesArray.map((series) => (
              <React.Fragment key={series}>
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
              </React.Fragment>
            ))
            : null}
        </section>

        <Locales
          retail={true}
        />
      </main>

      {seriesArray.length > 0
        && seriesArray.map((series) => (
          <React.Fragment key={series}>
            <section className="albatross possibly-empty">
              {series ? (
                <React.Fragment key={series}>
                  <hr />
                  <h2 className="capitalize">
                    {series.replace(/-/g, " ")}&nbsp;
                    <span className="typography__secondary">Series</span>
                  </h2>
                </React.Fragment>
              ) : null}
            </section>

            <div className="deck" key={series}>
              {(data.allStrapiRetail.nodes as RetailCardTypes[])
                .filter((retail) => retail.series === series)
                .map((retail) => (
                  <PaddleCard
                    key={retail.id}
                    {...retail}
                    link={`/retail/${retail.sport.slug}/${retail.brand.slug}/${retail.slug}`}
                  />
                ))}
            </div>
          </React.Fragment>
        ))
      }

      <section className="deck">
        {(data.allStrapiRetail.nodes as RetailCardTypes[])
          .filter((retail) => retail.series === null)
          .map((retail) => (
            <PaddleCard
              key={retail.id}
              {...retail}
              link={`/retail/${retail.sport.slug}/${retail.brand.slug}/${retail.slug}`}
            />
          ))}
      </section>

      <Breadcrumbs>
        <Breadcrumb><Link to="/retail/">Retail</Link></Breadcrumb>
        <Breadcrumb><Link to={`/retail/${middleSegment}/`}>{middleSegment}</Link></Breadcrumb>
        <Breadcrumb>{data.strapiBrand.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default BrandsView;

export const Head = ({ data }: { data: BrandsViewTypes }) => (
  <SEO
    // TODO: https://schema.org/brand
    // TODO: capitalize brand name
    // TODO: add type in here which Im not 100% on as I might be able to use location but its head?
    // TODO: double check searches for kayak and sup
    title={`${data.strapiBrand.name} Kayaks sold at`}
    description={`${data.strapiBrand.name} kayaks ${data.strapiBrand.tagline}`}
    breadcrumbs={[
      { name: "Retail", item: "retail" },
      { name: "Kayak", item: "retail/kayak" },
      { name: data.strapiBrand.name, item: `retail/kayak/${data.strapiBrand.slug}` },
    ]}
  />
);

export const query = graphql`
  query (
  $slug: String!,
  $sport: String!,
  ) {
    strapiBrand(slug: {eq: $slug}) {
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
          ...CardRetailFragment
        series
      }
    }

  }
`;
