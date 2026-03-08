// TODO: some of the typographic sizing is really out

import * as React from "react"
import { Link, graphql } from 'gatsby';
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import ReactMarkdown from "react-markdown";

type JobsPageType = {
  data: {
    strapiBranch: {
      job_email: string
    },
    allStrapiJob: {
      nodes: {
        id: string,
        title: string,
        description: {
          data: {
            description: string
          }
        }
      }[]
    }
  }
}

const JobsPage = ({ data }: JobsPageType) => {

  return (
    <>
      <Header />

      <main className="jobs">

        <section>
          <hgroup className="crest">
            {/* // TODO: only one h and then p */}
            <h1 className="brow">Jobs</h1>
            <h2 className="supra">Help Wanted</h2>
          </hgroup>
          <hr />
          <p>Tahoe City Kayak is hiring for Summer <strong>May 1st to Oct 31</strong>.</p>

          <p>Housing options available!</p>

          <p>If you want a fun <strong>but also physical</strong> job with great views of the lake.</p>

          {/* <p>We are hiring for the following:</p> */}

          <h3>If Interested</h3>
          <p>
            please send a resume with references to
          </p>
          <a href={`mailto:${data.strapiBranch.job_email}`} className="button">{data.strapiBranch.job_email}</a>
        </section>

        <section>
          {data.allStrapiJob.nodes.map((job) => (
            <div key={job.id}>
              <hr />
              <h3>{job.title}</h3>
              <div className="react-markdown">
                <ReactMarkdown>{job.description.data.description}</ReactMarkdown>
              </div>
            </div>
          ))}

        </section>


      </main >

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Jobs</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  )
}
export default JobsPage

export const Head = () => {
  return (
    <SEO
      title='Jobs'
      description="“Are you looking for a job in kayaking or paddleboarding? Look no further than Tahoe City Kayak & Paddleboard! We’re currently hiring for several positions, including kayak rental staff, paddleboard instructors, and more. Apply today and join our team!"
      breadcrumbs={[
        {
          name: "About",
          item: "about"
        },
        {
          name: 'Jobs',
          item: "about/jobs"
        }
      ]}

      // TODO: jobs
    />
  )
}

export const query = graphql`
  query jobsQuery {
    strapiBranch(slug: {eq: "tahoe-city"}) {
      job_email
    }

    allStrapiJob(filter: {branches: {elemMatch: {slug: {eq: "tahoe-city"}}}}) {
      nodes {
        id
        title
        description {
          data {
            description
          }
        }
      }
    }
  }
`;