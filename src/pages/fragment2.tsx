import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';

const Fragment2Page = () => {

  const { allStrapiBrand } = useStaticQuery(graphql`

    query MyQuery {
      allStrapiBrand {
        nodes {
          ...grab
        }
      }
    }

    fragment grab on STRAPI_BRAND {
      name
      slug
    }

  `)

  return (

    <main>

      {allStrapiBrand.nodes.map(brand => (
        <div key={brand.slug} >
          {brand.name}
        </div>
      ))}

    </main>
  )
}

export default Fragment2Page
