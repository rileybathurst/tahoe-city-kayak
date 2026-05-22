import * as React from "react"
import { graphql, Link } from 'gatsby';
import Markdown from "react-markdown";
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  PaddleCard,
  PaddleBrandList,
  type PaddleBrandListTypes,
  type PaddleGatsbyImageType
} from "@rileybathurst/paddle";

import Sport from "../../components/sport";
import FeatureList from "../../components/feature-list";
import SVG from 'react-inlinesvg';
import Locales from "../../components/locales";

import type { RetailCardTypes } from "../../types/retail-card-types";
import Hero from "../../components/hero";
import Shop from "../../content/shop";


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

    allStrapiBrand {
      nodes {
        id
        name
        slug
        tagline
        svg
        retail {
          ...CardRetailFragment
        }
      }
    }

    allStrapiRetail(
      filter: {cutout: { localFile: { id: { ne: null } } }},
      sort: {featured: ASC}
      ) {
      nodes {
        ...CardRetailFragmentPlusBrand
      }
    }

    strapiLocation(
      name: {eq: "Retail Location"}
      branch: {slug: {eq: "tahoe-city"}}
    ) {
      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  }
`

// ? I dont understand omit
type PaddleBrandTypesWithTagline = Omit<PaddleBrandListTypes, "retail"> & {
  tagline: string;
  retail: RetailCardTypes[];
};

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
    allStrapiBrand: {
      nodes: PaddleBrandTypesWithTagline[];
    };
    allStrapiRetail: {
      nodes: RetailCardTypes[];
    };
    strapiLocation: {
      hero: PaddleGatsbyImageType;
    }
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

  console.log(
    data.allStrapiRetail.nodes
      .filter((retail) => !retail.image?.localFile?.childImageSharp?.gatsbyImageData)
      .map((retail) => retail.image?.alternativeText ?? retail.title)
  )

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiLocation.hero}
        overlay={<Locales
          retail={true}
        />}
      />

      <main className="pelican">
        <h1>{data.strapiSport.title} Retail</h1>
        <Shop />

        <h3 className="condensed">Browse By Feature</h3>
        <FeatureList sport={data.strapiSport.slug} />
      </main>

      <div className="pelican">

        <h3>Browse By Brand</h3>
        <PaddleBrandList
          brands={Array.from(
            new Map(data.allStrapiRetail.nodes
              .filter((retail: RetailCardTypes) => retail.sport.slug === data.strapiSport.slug)
              .map((retail: RetailCardTypes) => [retail.brand.id, retail.brand] as [string, PaddleBrandListTypes]))
              .values()
          )}
          sport={data.strapiSport.slug}
        />

      </div>

      {brandArray.map((brandSlug) => (
        data.allStrapiBrand.nodes
          .filter((brand) => brand.slug === brandSlug)
          .map((brand: PaddleBrandTypesWithTagline) => (
            <React.Fragment key={brand.id}>
              <section
                className="condor"
              >
                <hr />
                {brand.svg ?
                  <SVG src={brand.svg} />
                  : null}
                <h2 className='capitalize'>
                  <Link to={brand.slug}>
                    {brand.name}
                  </Link>
                </h2>
                <p>{brand.tagline}</p>
              </section>

              <div className='deck'>
                {brand.retail
                  .filter((retail) =>
                    retail.sport.slug === data.strapiSport.slug
                    // * this shouldnt be needed with the filter but was hitting errors
                    && !!retail.image?.localFile?.childImageSharp?.gatsbyImageData
                  )
                  .slice(0, 4)
                  .map((retail) => (
                    <PaddleCard
                      key={retail.id}
                      {...retail}
                      link={`/retail/${retail.sport.slug}/${retail.brand.slug}/${retail.slug}`}
                    />
                  ))}
              </div>

              {
                brand.retail.length > 4 ?
                  <section
                    className="condor"
                  >
                    <h3 className='capitalize'>
                      <Link to={brand.slug}>
                        All {brand.retail.length} {brand.name} <Sport sport={`${data.strapiSport.slug}s`} />
                      </Link>
                    </h3>
                  </section>
                  : null
              }
            </React.Fragment >
          ))
      ))}

      <Footer />
    </React.Fragment>
  )
}

export default RetailSportPage

// TODO: needs filling out
export const Head = () => {
  return (
    <SEO />
  )
}
