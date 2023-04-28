import * as React from "react"
import { Link, graphql } from 'gatsby';
import Header from "./header"
import Footer from "./footer"
import Card from "./card"
import KayakFeatureList from "./kayak-feature-list";
import PaddleboardFeatureList from "./paddleboard-feature-list"
import Sport from "./sport";

const FeatureView = ({ data }) => {
  return (
    <>
      <Header />

      <main>
        <h1>{data.strapiFeature.title}</h1>

        <p>{data.strapiFeature.description}</p>
      </main>

      {/*       <section className="deck">
        {data.query.nodes.map(retail => (
          <div key={retail.id}>
            <Card
              retail={retail}
            />
          </div>
        ))
        }
      </section> */}

    </>
  );
};

export default FeatureView;

export const query = graphql`
  query (
    $name: String!,
  )
  {
    allStrapiRetail(filter: {
      type: {eq: "kayak"},
      inflatable: {eq: true}
      }) {
      nodes {
        title
      }
    }
  }
`;
