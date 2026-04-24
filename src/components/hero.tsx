import * as React from "react"
import { PaddleHero, type PaddleGatsbyImageType, type PaddleHeroTypes } from "@rileybathurst/paddle"
import Locales from "./locales"
import { graphql, useStaticQuery } from "gatsby"

type heroTypes = {
  strapiMedia: PaddleGatsbyImageType
}

const Hero = ({ image, overlay }: PaddleHeroTypes) => {

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