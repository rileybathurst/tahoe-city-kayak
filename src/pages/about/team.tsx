import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { SEO } from "../../components/seo"
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import Header from "../../components/header"
import Footer from "../../components/footer"
import ReactMarkdown from "react-markdown"

const TeamPage = () => {

  const data = useStaticQuery(graphql`
    query TeamQuery {
      allStrapiTeam(filter: {locales: {elemMatch: {slug: {eq: "tahoe-city"}}}}) {
        nodes {
          id
          name
          bio {
            data {
              bio
            }
          }

          profile {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }
        }
      }

      strapiLocale(slug: {eq: "tahoe-city"}) {
        name
      }
    }
  `)

  type teamTypes = {
    id: string,
    name: string,
    bio: {
      data: {
        bio: string
      }
    }
    profile: {
      localFile: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      alternativeText: string
    }
  }

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        {/* // ? query the location */}
        <p>Meet the team at {data.strapiLocale.name} Kayak & Paddleboard</p>
        <hr />

        {data.allStrapiTeam.nodes.map((team: teamTypes) => (
          <section key={team.id}>
            {/* // TODO: stylize the iamge in Paddle */}
            {team.profile ? <GatsbyImage image={team.profile.localFile.childImageSharp.gatsbyImageData} alt={team.profile.alternativeText} /> : null}
            <h2>{team.name}</h2>
            {/* // TODO: reviews about person */}
            {team.bio ? <ReactMarkdown className='react-markdown'>{team.bio.data.bio}</ReactMarkdown> : null}
            <hr />
          </section >

        ))}

      </main>


      < Footer />
    </>
  )
}

export default TeamPage

export const Head = () => {
  return (
    <SEO
      title={`Team | ${useSiteMetadata().title}`}
    // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
