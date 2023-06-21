import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';

const FragmentsPage = () => {

  const { allStrapiBrand } = useStaticQuery(graphql`

    query FragQuery {
      allStrapiBrand {
        nodes {
          ...one
        }
      }
    }

    fragment one on STRAPI_BRAND {
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

export default FragmentsPage
