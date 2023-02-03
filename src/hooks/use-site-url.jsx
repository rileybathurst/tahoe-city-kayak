import { graphql, useStaticQuery } from "gatsby"

export const useSiteUrl = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          url
        }
      }
    }
  `)

  return data.site.siteMetadata.url
}