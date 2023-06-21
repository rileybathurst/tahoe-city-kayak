import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';

const Fragment2Page = () => {

  const query = useStaticQuery(graphql`

    query Frag2Query {
      hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {
        nodes {
          ...twoA
        }
      }
      
      bote: allStrapiBrand(filter: {name: {eq: "bote"}}) {
        nodes {
          ...twoA
        }
      }
    }

    fragment twoA on STRAPI_BRAND {
      name
      slug
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

export default Fragment2Page
