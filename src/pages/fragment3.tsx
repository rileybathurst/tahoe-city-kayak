import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
// https://www.gatsbyjs.com/docs/reference/graphql-data-layer/using-graphql-fragments/

// import Three from '../hooks/frag3';

const Fragment3Page = () => {

  const query = useStaticQuery(graphql`

    query Frag3Query {
      hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
        nodes {
          ...threeF
        }
      }
      
      bote: allStrapiBrand(filter: {name: {eq: "eddyline"}}) {
        nodes {
          ...threeF
        }
      }
    }

  `)

  let hobie = query.hobie;
  let bote = query.bote;

  return (

    <main>

      {hobie.nodes.map(brand => (
        <div key={brand.slug} >
          {brand.name}
        </div>
      ))}

      {bote.nodes.map(brand => (
        <div key={brand.slug} >
          {brand.name}
        </div>
      ))}

    </main>
  )
}

export default Fragment3Page
