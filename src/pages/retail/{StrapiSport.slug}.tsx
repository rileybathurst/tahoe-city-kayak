// TODO: rename this witha redirect to paddleboard

import * as React from "react"
import { useStaticQuery, graphql, Script, Link } from 'gatsby';
import Markdown from "react-markdown";

// Paddle
import { PaddleLocationCard } from "@rileybathurst/paddle";
import { SEO } from "../../components/seo";

import Header from "../../components/header";
import Footer from "../../components/footer";
import BrandList from "../../components/brand-list";
import Card from "../../components/card";
import Sport from "../../components/sport";
import FeatureList from "../../components/feature-list";

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

  strapiLocation(
    locale: {slug: {eq: "tahoe-city"}}
    name: {eq: "Retail Location"}
  ) {
    ...locationCardFragment
  }

  allStrapiBrand {
    nodes {
      id
      name
      slug
      tagline
      svg
      retail {
        ...retailCard
        sport {
          slug
        }
      }
    }
  }
}
`

const RetailSportPage = ({ data }) => {

  const brandSet = new Set();
  for (const brand of data.allStrapiBrand.nodes) {
    brand.retail.map((retail) => {
      if (retail.sport.slug === data.strapiSport.slug) {
        brandSet.add(brand.slug)
      }
    })
  }
  const brandArray = Array.from(brandSet);
  // console.log(brandArray)

  return (
    <>
      <Header />
      <main className="pelican">
        <h1>{data.strapiSport.title} Retail</h1>
        <Markdown className="react-markdown">
          {data.strapiShop.text.data.text}
        </Markdown>

        <PaddleLocationCard
          {...data.strapiLocation}
          background={false}
        />
        <FeatureList sport={data.strapiSport.slug} />
      </main>

      <div className="albatross">
        {/* // TODO: seems like I could ... this */}
        <BrandList sport={data.strapiSport.slug} />
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
                  <div
                    dangerouslySetInnerHTML={{ __html: brand.svg }}
                  />
                  : null}
                <h2 className='capitalize'>{brand.name}</h2>
                <p>{brand.tagline}</p>

                <hr />
              </section>

              <div
                className='deck'
                key={brand.id}
              >
                {
                  brand.retail
                    .filter((retail) => retail.sport.slug === data.strapiSport.slug)
                    .splice(0, 4)
                    .map((retail) => (
                      <Card
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

export const Head = () => {
  return (
    <SEO
    />
  )
}
