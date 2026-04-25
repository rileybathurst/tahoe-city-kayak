import * as React from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type heroTypes = {
  strapiMedia: PaddleGatsbyImageType
}

type HeroTypes = {
  image?: PaddleGatsbyImageType
  overlay?: React.ReactNode
}

const Hero = ({ image, overlay }: HeroTypes) => {

  console.log(overlay);

  const data: heroTypes = useStaticQuery(graphql`
    query HeroQuery {

      strapiMedia(localFile: {name: {regex: "/hero_2025/"}}) {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  `);

  return (
    <PaddleHero
      image={image ? image : data.strapiMedia}
      overlay={overlay ? overlay : null}
    />
  )
}

export default Hero