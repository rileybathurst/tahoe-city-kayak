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
  strapiBranch: {
    hero: PaddleGatsbyImageType & {
      localFile: NonNullable<PaddleGatsbyImageType["localFile"]>
    }
  }
}

const Hero = ({ image, collage, overlay }: HeroTypes) => {

  // console.log(collage);

  const data: HeroQueryTypes = useStaticQuery(graphql`
    query HeroQuery {

      strapiBranch(slug: {eq: "tahoe-city"}) {
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `);

  // console.log(data.strapiMedia?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src)

  return (
    <React.Fragment>
      <PaddleHero
        image={image ? image : data.strapiBranch.hero}
        collage={collage || undefined}
        overlay={overlay ? overlay : undefined}
      />
    </React.Fragment>
  )
}

export default Hero