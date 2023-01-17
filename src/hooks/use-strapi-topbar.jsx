import { graphql, useStaticQuery } from "gatsby"

export const useStrapiTopBar = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiTopbar {
        text
      }
    }
  `)

  return data.strapiTopbar.text
}