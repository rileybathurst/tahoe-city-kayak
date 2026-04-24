import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
// import { Hero } from "../components/hero";
import { SEO } from "../components/seo";

export const data = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug },
      branches: {elemMatch: {slug: {eq: "tahoe-city"}}}
    ) {
      id
      name
      slug
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
      slug: string,
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
      {/* // TODO: */}
      {/* <PaddleHero /> */}

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

export const Head = ({ data }: TeamViewTypes) => {
  return (
    <SEO
      title={data.strapiTeam.name}
      description={data.strapiTeam.bio.data.bio}
      breadcrumbs={[
        { name: "About", item: "/about" },
        { name: "Team", item: "/about/team" },
        { name: data.strapiTeam.name, item: `/about/team/${data.strapiTeam.slug}` }
      ]}
    />
  );
}