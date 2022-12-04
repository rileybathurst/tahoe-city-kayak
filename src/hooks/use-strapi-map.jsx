import { graphql, useStaticQuery } from "gatsby"

export const useStrapiMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiFaq {
        nodes {
          answer
          question
        }
      }
    }
  `)

  return data.allStrapiFaq.nodes
}