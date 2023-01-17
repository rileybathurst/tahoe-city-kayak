import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

const PropList = (props) => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <>
          {data.allStrapiBrand.edges.map(kayak => (
            <>
              <p>{kayak.node.name}</p>

              {/* https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/#how-to-add-query-variables-to-a-page-query */}
              {/* Variables can be added to page queries (but not static queries) */}
            </>
          ))}
        </>
      )}
    />
  )
}

export default PropList

const query = graphql`
query PropQuery {
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