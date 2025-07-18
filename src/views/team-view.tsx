import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';

export const { strapiTeam } = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug },
      local: {elemMatch: {slug: {eq: "tahoe-city"}}}
      ) {
      id
      name
      bio {
        data {
          bio
        }
      }
      profile {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  }
`

type TeamViewTypes = {
  data: {
    strapiTeam: {
      name: string,
      bio: {
        data: {
          bio: string
        }
      },
      profile: {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        },
        alternativeText: string
      }
    }
  }
}
const TeamView = ({ data }: TeamViewTypes) => {

  return (
    <>
      <Header />

      <div className="pelican aconcagua-block-end">
        {data.strapiTeam.profile ? <GatsbyImage
          image={data.strapiTeam.profile.localFile.childImageSharp.gatsbyImageData}
          alt={data.strapiTeam.profile.alternativeText}
          className="img__wrapped"
        /> : null}
      </div>

      <main className="condor">

        <h1>{data.strapiTeam.name}</h1>
        {data.strapiTeam.bio ? <div className='react-markdown'><ReactMarkdown >{data.strapiTeam.bio.data.bio}</ReactMarkdown></div> : null}
      </main>

      <Breadcrumbs
        className="react-aria-Breadcrumbs condor"
      >
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTeam.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </>
  );
};

export default TeamView;

/* export const Head = ({ data }) => {
  return (
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
    breadcrumbs={[
            { name: "Tours & Lessons", path: "/tours-lessons" },
            { name: data.strapiTour.name, path: `/tours-lessons/${data.strapiTour.slug}` }
          ]}
    />
  );
} */