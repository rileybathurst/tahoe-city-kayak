import * as React from "react"
import { graphql, Script } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';
import Markdown from "react-markdown";

/* function Calendar({ calendar }) {
  if (calendar) {
    return (
      <>

      </>
    )
  }
  return null
} */

export const query = graphql`
  query AnnouncementQuery($slug: String!) {
    strapiAnnouncement(slug: { eq: $slug }) {
      title
      slug
      calendar
      publishedAt(formatString: "DD MMMM YYYY")

      post {
        data {
          post
        }
      }

      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }

    }
  }
`

const AnnouncmentPostPage = ({ data }) => {
  return (
    <>
      <Header />
      <main className="condor">

        {data.strapiAnnouncement?.hero?.localFile?.childImageSharp?.gatsbyImageData ?
          <GatsbyImage
            image={data.strapiAnnouncement?.hero?.localFile?.childImageSharp?.gatsbyImageData}
            alt={data.strapiAnnouncement.title}
            className="img__wrapped"
          /> : null}
        <div className="crest">
          <h1 className="supra">{data.strapiAnnouncement.title}</h1>
          <p className="brow">Announcement</p>
        </div>
        {/* TODO: test this */}
        <time dateTime={data.strapiAnnouncement.publishedAt}>{data.strapiAnnouncement.publishedAt}</time>
        {/* //TODO: do more with it */}
        {/* <Calendar {...data.strapiAnnouncement.calendar} /> */}
        <hr />

        <Markdown className="react-markdown">
          {data.strapiAnnouncement.post.data.post}
        </Markdown>



      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/announcement/">Announcement</Link></Breadcrumb>
        <Breadcrumb><Link>{data.strapiAnnouncement.title}</Link></Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default AnnouncmentPostPage;

export const Head = ({ data }) => {

  return (
    <SEO
      title={data.strapiAnnouncement.title}
      breadcrumbs={[
        { name: "Announcement", item: "announcement" },
        { name: data.strapiAnnouncement.title }
      ]}
    />
  )
}