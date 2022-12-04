import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

const True = () => {
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

export default True

const query = graphql`
query TrueQuery {
    allStrapiBrand(filter: {kayak: {eq: true}, name: {eq: "bote"}}
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