import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// Paddle
import { PaddleLocationDeck, PaddleTicket, type PaddleTicketTypes } from "@rileybathurst/paddle";

import { SEO } from "../components/seo"
import { useSiteMetadata } from '../hooks/use-site-metadata';
import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";
import Experience from "../content/experience";
import Sport from "../components/sport";

const TeamPage = () => {

  const { allStrapiTeam } = useStaticQuery(graphql`
    query TeamQuery {
      allStrapiTeam {
        nodes {
          id
          name
        }
      }
    }
  `)

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        {/* // ? check on this */}
        <p>Meet the team at Tahoe City Kayak & Paddleboard</p>
        <hr />

        {allStrapiTeam.nodes.map((team) => (
          <section key={team.id}>
            <h2>{team.name}</h2>
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
