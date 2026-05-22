import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Header from "../../components/header";
import Footer from "../../components/footer";
import { SEO } from "../../components/seo";
import ReactMarkdown from "react-markdown";
import { Breadcrumb, Breadcrumbs } from "react-aria-components";

function AnnouncementCatchAll({ params }: { params: { name: string } }) {

  const data = useStaticQuery(graphql`
    query AnnouncementCatchAllQuery {
      allStrapiAnnouncement {
        nodes {
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
      <main>
        <h2>
          <Link to="/announcement">Announcement</Link> / {params.name}</h2>

        <h1>{data.strapiError.title}</h1>
        <ReactMarkdown>
          {data.strapiError.description.data.description}
        </ReactMarkdown>
        <hr />
        <h2>Announcements</h2>

        <ul>
          {data.allStrapiAnnouncement.nodes.map((announcement: { slug: string }) => (
            <li key={announcement.slug}>
              <Link to={`/announcement/${announcement.slug}`}>{announcement.slug}</Link>
            </li>
          ))}
        </ul>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/announcement/">Announcement</Link></Breadcrumb>
        <Breadcrumb>{params.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer topHR={true} />
    </React.Fragment>
  )
}

export default AnnouncementCatchAll

export const Head = () => {
  return <SEO title="Announcement 404" />;
};