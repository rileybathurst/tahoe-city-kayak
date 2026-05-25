import * as React from "react"
import type { ReactNode } from "react"
import { PaddleHero, type PaddleGatsbyImageType } from "@rileybathurst/paddle"
import { graphql, useStaticQuery } from "gatsby"

type HeroTypes = {
  image?: PaddleGatsbyImageType
  collage?: PaddleGatsbyImageType | null
  overlay?: ReactNode
  background?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

// TODO: this is the weird type I need to use other places for SEO 
type HeroQueryTypes = {
  strapiBranch: {
    hero: PaddleGatsbyImageType & {
      localFile: NonNullable<PaddleGatsbyImageType["localFile"]>
    }
  }
}

const Hero = ({ image, collage, overlay, background, objectFit }: HeroTypes) => {

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

  return (
    <React.Fragment>
      <PaddleHero
        image={image ? image : data.strapiBranch.hero}
        collage={collage || undefined}
        overlay={overlay ? overlay : undefined}
        background={background}
        objectFit={objectFit}
      />
    </React.Fragment>
  )
}

export default Hero