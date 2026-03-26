import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';

import { SEO } from "../../components/seo"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'
import { PaddleCard, type PaddleCardTypes } from "@rileybathurst/paddle";

const TeamPage = () => {

  const data = useStaticQuery(graphql`
    query TeamQuery {
      allStrapiTeam(filter: {branches: {elemMatch: {slug: {eq: "tahoe-city"}}}}) {
        nodes {
          id
          title: name
          slug
          bio {
            data {
              bio
            }
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

      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
      }
    }
  `)

  type teamTypes = Omit<PaddleCardTypes, 'link' | 'excerpt'> & {
    id: React.Key,
    slug: string,
    bio: {
      data: {
        bio: string
      }
    }
  }

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        <p>Meet the team at {data.strapiBranch.name} Kayak & Paddleboard</p>
        <hr />

        <section className="deck">
          {data.allStrapiTeam.nodes.map((team: teamTypes) => (
            <PaddleCard
              key={team.id}
              link={`/about/team/${team.slug}`}
              image={team.image}
              title={team.title}
              excerpt={team.bio.data.bio}
            />
          ))}
        </section>

      </main>
      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Team</Breadcrumb>
      </Breadcrumbs>

      < Footer />
    </>
  )
}

export default TeamPage

export const Head = () => {
  return (
    <SEO
      title='Team'
    // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
