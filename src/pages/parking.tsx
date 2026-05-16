// Look into this https://schema.org/Map
// When using parking https://schema.org/isAccessibleForFree

// this seems most relevant
// https://schema.org/ParkingFacility

import * as React from "react"
import { graphql } from "gatsby";
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";

type ParkingTypes = {
  allStrapiParking: {
    nodes: {
      id: string;
      title: string;
      description: string;
      walk: string;
    }[]
  }
  strapiBranch: {
    parking: string;
  }
}

const ParkingPage = ({ data }: { data: ParkingTypes }) => {

  return (
    <React.Fragment>
      <Header />

      <Hero />

      <main>
        <h1>Parking Information</h1>
        <p>{data.strapiBranch.parking}</p>

        <section>
          {data.allStrapiParking.nodes.map((parking) => (
            <article key={parking.id}>
              <hr />
              <h2 className="denali">{parking.title}</h2>
              <p>{parking.description}</p>
              <p>{`Walking distance to the shop: ~${parking.walk}`}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer topHR />
    </React.Fragment>
  )
}

export default ParkingPage

export const Head = ({ data }: { data: ParkingTypes }) => {

  return (
    <SEO
      title='Parking Information'
      description={data.strapiBranch.parking}
    />
  )
}

export const data = graphql`
  query ParkingQuery {
    allStrapiParking(
      # filter: {}, // TODO: this isnt coming up for some reason, but currently only have tahoe city so its fine
      sort: {order: ASC}
    ) {
      nodes {
        id
        title
        description
        walk
      }
    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
                parking
              }
  }
              `;