import * as React from "react"
import type { ReactNode } from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type HeroTypes = {
  image?: PaddleGatsbyImageType
  collage?: PaddleGatsbyImageType | null
  overlay?: ReactNode
}

type HeroQueryTypes = {
  strapiMedia: PaddleGatsbyImageType & {
    localFile: NonNullable<PaddleGatsbyImageType["localFile"]>
  }
}

const Hero = ({ image, collage, overlay }: HeroTypes) => {

  // console.log(collage);

  const data: HeroQueryTypes = useStaticQuery(graphql`
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

  console.log(data.strapiMedia?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src)

  return (
    <React.Fragment>
      <PaddleHero
        image={image ? image : data.strapiMedia}
        collage={collage || undefined}
        overlay={overlay ? overlay : undefined}
      />
    </React.Fragment>
  )
}

export default Hero