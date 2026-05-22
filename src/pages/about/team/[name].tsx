import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Breadcrumbs, Breadcrumb } from 'react-aria-components'

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ReactMarkdown from "react-markdown";
import { SEO } from "../../../components/seo";

function TeamCatchAll({ params }: { params: { name: string } }) {

  const data = useStaticQuery(graphql`
    query TeamCatchAllQuery {
      allStrapiTeam(filter: {branches: {elemMatch: {slug: {eq: "tahoe-city"}}}}) {
        nodes {
          name
          slug
        }
      }

      strapiError {
        ...errorFragment
      }
    }
  `)

  return (
    <React.Fragment>
      <Header />
      <main className="condor">
        <h2>
          <Link to="/about/team">Team</Link> / {params.name}
        </h2>

        <h1>{data.strapiError.title}</h1>
        <ReactMarkdown>
          {data.strapiError.description.data.description}
        </ReactMarkdown>

        <hr />

        <h2 className="kilimanjaro">Check in with another team member</h2>

        <ul>
          {data.allStrapiTeam.nodes.map((team: { name: string; slug: string }) => (
            <li key={team.slug}>
              <Link to={`/team/${team.name}`}>{team.slug}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{params.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </React.Fragment>
  )
}

export default TeamCatchAll

export const Head = () => {
  return (
    <SEO
    // title='Team'
    // TODO:
    // description="We have many different Kayak Tours to offer, as well as Stand Up Paddleboard Lessons. Our tours leave from multiple locations around the lake."
    />
  )
}
