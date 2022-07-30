import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

// I dont know how dangerous this dangerously set is as its prebuilt
function Danger(props) {
  const svg = (props.svg)
  return (
    <div
      dangerouslySetInnerHTML={{__html: svg}}
    />
  );
}

const KayakBrandList = () => {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <ul className='brand_list'>
          {data.allStrapiBrand.edges.map(kayak => (
              <li>
                <Link to={`/retail/kayak/${kayak.node.slug}`}>
                  <Danger svg={kayak.node.svg} />
                  <p>{kayak.node.name}</p>
                </Link>
              </li>
          ))}
        </ul>
      )}
    />
  )
}

export default KayakBrandList

const query = graphql`
query KayakBrandQuery {
  allStrapiBrand(filter: {kayak: {eq: true}}) {
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