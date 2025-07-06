import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import Markdown from "react-markdown";
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";

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

type AnnouncementTypes = {
  data: {
    strapiAnnouncement: {
      title: string;
      slug: string;
      calendar?: string;
      publishedAt: string;
      post: {
        data: {
          post: string;
        };
      };
      hero?: PaddleGatsbyImageType
    };
  };
};

const AnnouncmentPostPage = ({ data }: AnnouncementTypes) => {
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

        {data.strapiAnnouncement.publishedAt}
        {/* //TODO: do more with it */}
        {/* <Calendar {...data.strapiAnnouncement.calendar} /> */}
        <hr />

        <div className="react-markdown">
          <Markdown>
            {data.strapiAnnouncement.post.data.post}
          </Markdown>
        </div>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/announcement/">Announcement</Link></Breadcrumb>
        <Breadcrumb>{data.strapiAnnouncement.title}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default AnnouncmentPostPage;

type AnnouncementHeadTypes = {
  data: {
    strapiAnnouncement: {
      title: string;
      slug: string;
    };
  };
};
export const Head = ({ data }: AnnouncementHeadTypes) => {

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