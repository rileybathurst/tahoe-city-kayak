import * as React from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type HeroImageType = PaddleGatsbyImageType & {
  localFile: NonNullable<PaddleGatsbyImageType["localFile"]> & {
    absolutePath: string
  }
}

type heroDataTypes = {
  strapiMedia: HeroImageType
}

type HeroTypes = {
  image?: PaddleGatsbyImageType
  collage?: PaddleGatsbyImageType | null
  overlay?: React.ReactNode
  absolutePath?: string
}

const Hero = ({ image, collage, overlay }: HeroTypes) => {

  // console.log(collage);

  const data: heroDataTypes = useStaticQuery(graphql`
    query HeroQuery {

      strapiMedia(localFile: {name: {regex: "/hero_2025/"}}) {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
          absolutePath
        }
        alternativeText
      }
    }
  `);

  console.log(data.strapiMedia.localFile.absolutePath)

  return (
    <PaddleHero
      image={image ? image : data.strapiMedia}
      collage={collage || undefined}
      overlay={overlay ? overlay : undefined}
    />
  )
}

export default Hero