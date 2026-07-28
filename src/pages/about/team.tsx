import * as React from "react"
import { useStaticQuery, graphql, Link } from 'gatsby';

import { SEO } from "../../components/seo"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'
import { TeamCards } from "../../components/team-cards"

const TeamPage = () => {

  // * this query brings all team not just tahoe city as the query is complex for null
  const data = useStaticQuery(graphql`
    query TeamPageQuery {
      strapiBranch(slug: {eq: "tahoe-city"}) {
        name
      }
    }
  `)

  return (
    <React.Fragment>
      <Header />

      <main className="pelican">
        <h1>Team</h1>
        <p>Meet the team at {data.strapiBranch.name} Kayak & Paddleboard</p>

        {/* // * custom */}
        <ul>
          <li><a href="#guides">Guides</a></li>
          <li><a href="#shop-dogs">Shop Dogs</a></li>
        </ul>

        <hr />
      </main>

      <TeamCards />

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Team</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  )
}

export default TeamPage

export const Head = () => {
  return (
    <SEO
      title='Team'
    // description={`Meet the team at ${data.strapiBranch.name} Kayak & Paddleboard`}
    />
  )
}
