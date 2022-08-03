import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Danger from "./danger";

const SupBrandList = () => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <ul className='brand_list'>
          {data.allStrapiBrand.edges.map(sup => (
            <li>
              <Link to={`/retail/sup/${sup.node.slug}`}>
                <Danger svg={sup.node.svg} />
                <p>{sup.node.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  )
}

export default SupBrandList

const query = graphql`
query SupBrandQuery {
  allStrapiBrand(filter: {sup: {eq: true}}) {
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