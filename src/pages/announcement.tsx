import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";

function AnnouncementPage() {

  const { allStrapiAnnouncement } = useStaticQuery(graphql`
    query AnnouncementPageQuery {
      allStrapiAnnouncement {
        nodes {
          title
          slug
        }
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="measure">
        <h1>Announcement</h1>

        <ul>
          {allStrapiAnnouncement.nodes.map((announcement) => (
            <li key={announcement.slug}>
              <Link to={`/announcement/${announcement.slug}`}>{announcement.title}</Link>
            </li>
          ))}
        </ul>

      </main>
      <Footer />
    </>
  )
}

export default AnnouncementPage
