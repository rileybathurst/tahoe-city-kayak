import { graphql, useStaticQuery } from "gatsby"

export const useStrapiKayaker = () => {
  const { strapiImagegrab } = useStaticQuery(graphql`
    query {
      strapiImagegrab(title: {eq: "casualKayak"}) {
        title
        image {
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1)
            }
          }
        }
      }
    }
  `)

  return strapiImagegrab
}