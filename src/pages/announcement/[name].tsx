import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";
import { SEO } from "../../components/seo";

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
      <main>
        <h2>
          <Link to="/announcement">Announcement</Link> / {params.name}</h2>

        <h1>Looks like you&apos;ve paddled into uncharted waters!</h1>
        <p>Don&apos;t worry, we&apos;ll help you navigate <Link to="/">back to our homepage.</Link></p>

        <hr />
        <h2>Announcements</h2>

        <ul>
          {allStrapiAnnouncement.nodes.map((announcement: { slug: string }) => (
            <li key={announcement.slug}>
              <Link to={`/announcement/${announcement.slug}`}>{announcement.slug}</Link>
            </li>
          ))}
        </ul>

      </main>
      <Footer topHR={true} />
    </>
  )
}

export default AnnouncementCatchAll

export const Head = () => {
  return <SEO title="Announcement 404" />;
};