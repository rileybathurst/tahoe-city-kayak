import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import type { AnnouncementType } from "../types/announcement-type";

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
      <main>
        <h1>Announcements</h1>

        <ul>
          {allStrapiAnnouncement.nodes.map((announcement: AnnouncementType) => (
            <li key={announcement.slug}>
              <Link to={`/announcement/${announcement.slug}`}>{announcement.title}</Link>
            </li>
          ))}
        </ul>

      </main >
      <Footer topHR={true} />
    </>
  )
}

export default AnnouncementPage

export const Head = () => {
  return <SEO title="Announcements" />;
};