import * as React from "react";
import { PaddleLocationDeck } from "@rileybathurst/paddle";
import { graphql, useStaticQuery } from "gatsby";

type locationDeckTypes = {
  all?: boolean;
  delivery?: boolean;
  parking?: boolean;
  retail?: boolean;
  water?: boolean;
};

const LocationDeck = ({ all, delivery, parking, retail, water }: locationDeckTypes) => {
  const data = useStaticQuery(graphql`
    query locationDeckQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
        season_start
        season_end
        phone
      }

      allStrapiLocation(
        filter: {
          branch: {slug: {eq: "tahoe-city"}}
        },
        sort: {order: ASC}
      ) {
        nodes {
          ...locationCardFragment
        }
      }

      water: strapiLocation(
        name: {eq: "On Water Rental"}
        branch: {slug: {eq: "tahoe-city"}}
      ) {
        ...locationCardFragment
      }

      retail: strapiLocation(
          name: {eq: "Retail Location"}
          branch: {slug: {eq: "tahoe-city"}}
        ) {
          ...locationCardFragment
      }

      delivery: strapiLocation(
          name: {eq: "Delivery"}
          branch: {slug: {eq: "tahoe-city"}}
      ) {
          ...locationCardFragment
      }

      parking: strapiLocation(
          name: {eq: "Free Parking"}
          branch: {slug: {eq: "tahoe-city"}}
      ) {
        ...locationCardFragment
      }

    }
  `);

  if (all) {

    return (
      <PaddleLocationDeck
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        nodes={data.allStrapiLocation.nodes}
      />
    );
  }

  // * I've only built out the used versions there a re a lot more combos

  if (water) {
    if (parking) {

      return (
        <PaddleLocationDeck
          season_start={data.strapiBranch.season_start}
          season_end={data.strapiBranch.season_end}
          phone={data.strapiBranch.phone}
          nodes={[data.water, data.parking]}
        />
      );
    }

    return (
      <PaddleLocationDeck
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.water}
      />
    );
  }

  if (retail) {
    return (
      <PaddleLocationDeck
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.retail}
      />
    );
  }

  if (delivery) {
    return (
      <PaddleLocationDeck
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.delivery}
      />
    );
  }

  if (parking) {
    return (
      <PaddleLocationDeck
        season_start={data.strapiBranch.season_start}
        season_end={data.strapiBranch.season_end}
        phone={data.strapiBranch.phone}
        single={data.parking}
      />
    );
  }

  console.error("No matching location found");
  return null;
}

export default LocationDeck;