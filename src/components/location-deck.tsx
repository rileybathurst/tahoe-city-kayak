// ! I can put the query in here to remove 10 ish more queries of the same thing

import * as React from "react";
import { type PaddleLocationTypes, PaddleLocationDeck } from "@rileybathurst/paddle";
import { graphql, useStaticQuery } from "gatsby";

type locationDeckTypes = {
  data: {
    strapiBranch: {
      season_start: string;
      season_end: string;
      phone: number;
    };
  };
} & {
  allStrapiLocation: {
    nodes: PaddleLocationTypes[];
  };
};

const trueLocations: Record<string, boolean> = {
  Delivery: true,
};

const LocationDeck = ({ allStrapiLocation }: LocationDeckProps) => {
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
    }
  `);

  console.log(data.allStrapiLocation.nodes);

  

  return (
    <PaddleLocationDeck
      season_start={data.strapiBranch.season_start}
      season_end={data.strapiBranch.season_end}
      phone={data.strapiBranch.phone}
      nodes={allStrapiLocation.nodes}
    />
  );
}

export default LocationDeck;



const Display = () => {

  return (
  <div>
    <h2>Hey</h2>
  </div>
  );
}

type SwitchTypes = {
  one?: boolean;
  two?: boolean;
  three?: boolean;
  all?: boolean;
}
const Switches = ({ one, two, three, all }: SwitchTypes) => {
  return (
    <>
      {(one || all) && <Display />}
      {(two || all) && <Display />}
      {(three || all) && <Display />}
    </>
  );
}

// ! I think this logic can make it work
const TestPage = () => {

  return (
    <main>
      <h1>Boolean switches</h1>

      <Switches
        one={true}
        two={true}
        three={false}
      />

      <hr />

      <Switches
        all={true}
      />
    </main>
  );
};