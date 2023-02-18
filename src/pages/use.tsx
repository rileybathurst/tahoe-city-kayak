// ! test only

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const TestPage = () => {
  const { allStrapiRetail } = useStaticQuery(graphql`
    query {
      allStrapiRetail {
        nodes {
          id
          title
        }
      }
    }
  `)

  return (
    <main>
      {allStrapiRetail.nodes.map((node) => (
        <div key={node.id}>
          {node.title}
        </div>
      ))}
    </main>
  )
}

export default TestPage