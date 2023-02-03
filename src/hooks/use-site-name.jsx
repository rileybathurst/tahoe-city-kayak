import { graphql, useStaticQuery } from "gatsby"

export const useSiteName = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          name
        }
      }
    }
  `)

  return data.site.siteMetadata.name
}