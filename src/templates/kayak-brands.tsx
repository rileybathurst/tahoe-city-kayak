import React from 'react';
import { graphql, StaticQuery } from 'gatsby'

function Next(props) {
  const mySet1 = new Set();

  props.series.forEach(series => {
    mySet1.add(series.series);
    // console.log(series.series);
    console.log('hey');
  });

  console.log(mySet1);
  return (
    <ul>
      {[...mySet1].map(series => (
        <li>{series}</li>
      ))}
    </ul>
  );
}

const KayakBrandView = ({ data }) => {
  return (
    <>
      {data.strapiBrand.name}
      <br />
      <Next series={data.strapiBrand.retail} />
    </>
  );
};

export default KayakBrandView;

export const query = graphql`
  query KayakBrandsTemplate(
    $slug: String!,
  ) {
    strapiBrand(slug: {eq: $slug}) {
      id
      name
      retail {
        series
      }
    }
  }
`;
