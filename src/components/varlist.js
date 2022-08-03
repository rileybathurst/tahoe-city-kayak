import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

const VarQuery = One;

// this might be too much
// const {`${VarQuery}List`} = (props) => {
const VarList = (props) => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <>
          {data.allStrapiBrand.edges.map(kayak => (
            <>
              <p>{kayak.node.name}</p>
            </>
          ))}
        </>
      )}
    />
  )
}

export default TrueList

const query = graphql`
query VarQuery {
  allStrapiBrand(
    filter: {kayak: {eq: true}}
    ) {
    edges {
      node {
        name
        slug
        svg
      }
    }
  }
}
`