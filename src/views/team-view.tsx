import * as React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import { SEO } from "../components/seo";
import Hero from "../components/hero";
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";

export const data = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug }
    ) {
      id
      name
      slug
      hometown
      position
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
      questions {
        order
        answer
        question
      }
    }
  }
`

type TeamViewTypes = {
  data: {
    strapiTeam: {
      name: string,
      slug: string,
      hometown?: string,
      position?: string,
      bio?: {
        data: {
          bio: string
        }
      },
      profile?: PaddleGatsbyImageType;
      questions?: {
        order: number;
        question: string;
        answer: string;
      }[];
    }
  }
}
const TeamView = ({ data }: TeamViewTypes) => {

  return (
    <React.Fragment>
      <Header />

      {/* // TODO: less crop on hero image for teams */}
      {data.strapiTeam?.profile &&
        <Hero
          image={data.strapiTeam.profile}
        />
      }

      <main className="condor">

        <h1>{data.strapiTeam.name}</h1>
        {data.strapiTeam?.position && <h2 className="denali">{data.strapiTeam.position}</h2>}
        <hr />
        {data.strapiTeam?.hometown && <h2 className="denali">Hometown: {data.strapiTeam.hometown}</h2>}
        {data.strapiTeam?.bio &&
          <div className='react-markdown'>
            <ReactMarkdown>
              {data.strapiTeam.bio.data.bio}
            </ReactMarkdown>
          </div>
        }

        {/* TODO: order by order */}
        {data.strapiTeam?.questions &&
          <section className="questions">
            {data.strapiTeam.questions.map((q) => (
              <div key={q.question}>
                <hr />
                <h3>{q.question}</h3>
                <p>{q.answer}</p>
              </div>
            ))}
          </section>
        }
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb><Link to="/about/team/">Team</Link></Breadcrumb>
        <Breadcrumb>{data.strapiTeam.name}</Breadcrumb>
      </Breadcrumbs>
      <Footer />
    </React.Fragment>
  );
};

export default TeamView;

export const Head = ({ data }: TeamViewTypes) => {
  // TODO: image
  // TODO: needs real work on the seo includeing position
  return (
    <SEO
      title={data.strapiTeam.name}
      // TODO: deal with what if we dont
      description={data.strapiTeam.bio?.data?.bio}
      breadcrumbs={[
        { name: "About", item: "/about" },
        { name: "Team", item: "/about/team" },
        { name: data.strapiTeam.name, item: `/about/team/${data.strapiTeam.slug}` }
      ]}
    />
  );
}