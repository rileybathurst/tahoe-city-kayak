import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

// I dont know how dangerous this dangerously set is as its prebuilt
function Danger(props) {
  const svg = (props.svg)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

const SupBrandList = () => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <ul className='brand_list'>
          {data.allStrapiBrand.edges.map(sup => (
            <li>
              <Link to={`/retail/Sup/${sup.node.slug}`}>
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