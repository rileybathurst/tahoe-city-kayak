import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import type { TeamCardTypes } from "../types/team-card-types";
import { PaddleCard } from "@rileybathurst/paddle";

export const TeamCards = () => {

  type TeamWithBranch = TeamCardTypes & {
    order?: number | null
    branches?: Array<{ slug?: string | null }> | null
  }
  type TeamCardWithImageFlagAndOrder = TeamCardTypes & {
    order?: number | null
    hasProfileImage: boolean
  }

  const data = useStaticQuery(graphql`
    query TeamCardQuery {
      allStrapiTeam {
        nodes {
          id
          title: name
          slug
          order
          excerpt
          branches {
            slug
          }

          image: profile {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }

      strapiExperience {
        guides {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          alternativeText
        }
      }
    }
  `)

  const filteredTeam = data.allStrapiTeam.nodes.filter(
    (team: TeamWithBranch) =>
      !team.branches?.length || team.branches.some((branch) => branch?.slug === "tahoe-city")
  )

  const defaultGuideImage = data.strapiExperience?.guides
  const teamCards: TeamCardWithImageFlagAndOrder[] = filteredTeam
    .map((team: TeamCardTypes) => ({
      ...team,
      hasProfileImage: Boolean(team.image?.localFile),
      image: team.image?.localFile ? team.image : defaultGuideImage,
    }))
    .sort((a: TeamCardWithImageFlagAndOrder, b: TeamCardWithImageFlagAndOrder) => {
      const orderA = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY
      const orderB = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY

      if (orderA !== orderB) {
        return orderA - orderB
      }

      return Number(b.hasProfileImage) - Number(a.hasProfileImage)
    })

  // TODO: use strapi point of interest Moose is specifically bad

  return (
    <section className="deck">
      {teamCards.map((team: TeamCardTypes) => (
        <PaddleCard
          key={team.id}
          {...team}
          link={`/about/team/${team.slug}`}
        />
      ))}
    </section>
  )
}