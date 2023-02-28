import { graphql, useStaticQuery } from "gatsby"

export const useStrapiAndy = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "andy"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  return data.strapiImagegrab.title
}