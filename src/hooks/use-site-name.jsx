import { graphql, useStaticQuery } from "gatsby"

export const useSiteName = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return data.site.siteMetadata.title
}