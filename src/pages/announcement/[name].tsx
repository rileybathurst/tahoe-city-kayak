import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";

function AnnouncementCatchAll({ params }: { params: { name: string } }) {

  const { allStrapiAnnouncement } = useStaticQuery(graphql`
    query AnnouncementCatchAllQuery {
      allStrapiAnnouncement {
        nodes {
          slug
        }
      }
    }
  `)

  return (
    <>
      <Header />
      <main className="measure">
        <h2 className="crest">
          <Link to="/announcement">Announcement</Link> / {params.name}</h2>

        {/* // TODO: this should be a component */}
        <h1 className="mixta">Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        <h2>Announcements</h2>

        <ul>
          {allStrapiAnnouncement.nodes.map((announcement: { slug: string }) => (
            <li key={announcement.slug}>
              <Link to={`/announcement/${announcement.slug}`}>{announcement.slug}</Link>
            </li>
          ))}
        </ul>

      </main>
      <Footer />
    </>
  )
}

export default AnnouncementCatchAll
