import { graphql, useStaticQuery } from "gatsby"

export const useStrapiTestimonial = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiTestimonial {
        nodes {
          customer
          testimonial
        }
      }
    }
  `)

  return data.allStrapiTestimonial.nodes
}