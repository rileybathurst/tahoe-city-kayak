import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby';
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";

type FavoritesPageTypes = {
  allStrapiConnection: {
    nodes: {
      id: string,
      name: string,
      excerpt: string,
      website?: string
      recommendation?: {
        reason: string
        team: {
          slug: string
          name: string
        }
      }[]
    }[]
  },
  strapiBranch: {
    name: string
  }
}

const FavoritesPage = ({ data }: { data: FavoritesPageTypes }) => {
  data = useStaticQuery(query);

  const WebsiteLink = ({ url }: { url: string }) => {
    url = url.includes('http') ? url.replace(/^https?:\/\//, '') : url;
    url = url.includes('www.') ? url.replace(/^www\./, '') : url;

    return (
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    )
  }

  return (
    <React.Fragment>
      <Header />

      <main className="pelican">
        <h1>Favorites</h1>
        <p>Explore some of our favorite things to do off the water in {data.strapiBranch.name}.</p>
        <hr />
        <ul className="panel">

          {/* // TODO: the card hover is an issue but it was used with the layering of links */}
          {data.allStrapiConnection.nodes.map((connection) => (
            <li key={connection.id} className="card">
              <h2>{connection.name}</h2>
              <p>{connection.excerpt}</p>
              {connection.website && <WebsiteLink url={connection.website} />}

              {connection.recommendation && connection.recommendation.length > 0 && (
                <React.Fragment>

                  <h3 style={{ marginBlockEnd: '0' }}>What our team say</h3>
                  {connection.recommendation.map((recommendation) => (
                    <div className="recommendation" key={recommendation.reason}>
                      <hr />
                      <p>"{recommendation.reason}"</p>

                      <p><a href={`/about/team/${recommendation.team.slug}`}>{recommendation.team.name}</a></p>
                    </div>
                  ))}
                </React.Fragment>
              )}

            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </React.Fragment>
  )
}

export default FavoritesPage

export const Head = ({ data }: { data: FavoritesPageTypes }) => {
  data = useStaticQuery(query);
  return (
    <SEO
      title='Favorites'
      description={`Explore some of our favorite things to do off the water in ${data.strapiBranch.name}.`}
    />
  )
}

const query = graphql`
  query strapiFavorites {
    allStrapiConnection(
      filter: {
        branches: {elemMatch: {slug: {eq: "tahoe-city"}}},
        favorite: {ne: true}
      }
    ) {
      nodes {
        id
        name
        excerpt
        website
        recommendation {
          reason
          team {
            slug
            name
          }
        }
      }
    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      name
    }
  }
`