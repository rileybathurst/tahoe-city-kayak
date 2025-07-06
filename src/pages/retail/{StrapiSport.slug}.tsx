// TODO: rename this with a redirect to paddleboard
// ! Warning: Encountered two children with the same key

import * as React from "react"
import { graphql, Link } from 'gatsby';
import Markdown from "react-markdown";

// Paddle
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";
import Purchase from "../../components/purchase";
import Sport from "../../components/sport";
import FeatureList from "../../components/feature-list";
import SVG from 'react-inlinesvg';
import LocationDeck from "../../components/location-deck";
import {
  PaddleBrandList,
  type PaddleLocationCardTypes,
  type PaddleBrandType,
  type PaddlePurchaseTypes
} from "@rileybathurst/paddle";

export const strapiSport = graphql`
  query RetailSportQuery($slug: String!) {
  strapiSport(slug: { eq: $slug }) {
    title
    slug
  }

  strapiShop {
    text {
      data {
        text
      }
    }
  }

  allStrapiLocation(
    filter: {
      local: {slug: {eq: "tahoe-city"}},
      name: {eq: "Retail Location"}
      }
  ) {
    nodes {
      ...locationCardFragment
    }
  }

  allStrapiBrand {
    nodes {
      id
      name
      slug
      tagline
      svg
      retail {
        ...purchaseFragment
        sport {
          slug
        }
      }
    }
  }
}
`

type retailSportTypes = {
  data: {
    strapiSport: {
      title: string;
      slug: string;
    };
    strapiShop: {
      text: {
        data: {
          text: string;
        }
      }
    };
    allStrapiLocation: {
      nodes: PaddleLocationCardTypes[];
    };
    allStrapiBrand: {
      nodes: PaddleBrandType[];
    };
  }
}
const RetailSportPage = ({ data }: retailSportTypes) => {

  const brandSet = new Set();
  for (const brand of data.allStrapiBrand.nodes) {
    brand.retail.map((retail) => {
      if (retail.sport.slug === data.strapiSport.slug) {
        brandSet.add(brand.slug)
      }
    })
  }
  const brandArray = Array.from(brandSet);

  return (
    <>
      <Header />
      <main className="pelican">
        <h1>{data.strapiSport.title} Retail</h1>
        <div className="react-markdown">
          <Markdown>
            {data.strapiShop.text.data.text}
          </Markdown>
        </div>

        <LocationDeck
          allStrapiLocation={data.allStrapiLocation}
        />

        <FeatureList sport={data.strapiSport.slug} />
      </main>

      <div className="albatross">

        <PaddleBrandList
          sport={data.strapiSport.slug}
          {...data.allStrapiBrand}
        />

      </div>

      {brandArray.map((brandSlug) => (
        data.allStrapiBrand.nodes
          .filter((brand) => brand.slug === brandSlug)
          .map((brand) => (
            <>
              <section
                key={brand.id}
                className="condor"
              >
                {brand.svg ?
                  <SVG src={brand.svg} />
                  : null}
                <h2 className='capitalize'>{brand.name}</h2>
                <p>{brand.tagline}</p>

                <hr />
              </section>

              <div
                className='bag'
                key={brand.id}
              >
                {
                  brand.retail
                    .filter((retail) => retail.sport.slug === data.strapiSport.slug)
                    .splice(0, 4)
                    .map((retail) => (
                      <Purchase
                        key={retail.id}
                        {...retail}
                      />
                    ))
                }
              </div>

              {brand.retail.length > 4 ?
                <section
                  key={brand.id}
                  className="condor"
                >
                  <h3 className='capitalize'>
                    <Link to={brand.slug}>
                      All {brand.retail.length} {brand.name} <Sport sport={`${data.strapiSport.slug}s`} />
                    </Link>
                  </h3>
                  <hr />
                </section>
                : null}
            </>
          ))
      ))}

      <Footer />
    </>
  )
}

export default RetailSportPage

// TODO: needs filling out
export const Head = () => {
  return (
    <SEO />
  )
}
