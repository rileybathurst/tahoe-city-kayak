// Look into this https://schema.org/Map
// When using parking https://schema.org/isAccessibleForFree

// this seems most relevant
// https://schema.org/ParkingFacility

import * as React from "react"
import { graphql } from "gatsby";
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import SplitLayout from "../components/split-layout";

type EverestToDenaliTypes = {
  blocks: BlocksContent;
};
const EverestToDenali = ({ blocks }: EverestToDenaliTypes) => {
  blocks.map((block) => {
    if (block.type === 'heading') {
      block.level = 3;
    }
  });
  return (
    <BlocksRenderer
      content={blocks}
    />
  );
}

type ParkingPageTypes = {
  data: {
    strapiParking: {
      blocks: BlocksContent;
      excerpt: string;
    };
  };
};
const ParkingPage = ({ data }: ParkingPageTypes) => {

  return (
    <React.Fragment>
      <Header />
      <SplitLayout content={
        <React.Fragment>
          <h1>Parking Information</h1>

          <EverestToDenali blocks={data.strapiParking.blocks} />
        </React.Fragment>
      } />

      <Footer />
    </React.Fragment>
  )
}

export default ParkingPage

export const Head = ({ data }: ParkingPageTypes) => {

  return (
    <SEO
      title='Parking Information'
      description={data.strapiParking.excerpt}
    />
  )
}

export const data = graphql`
  query ParkingQuery {
    strapiParking {
      blocks {
        type
        level
        children {
          text
          type
        }
      }
      excerpt
    }
  }
`;