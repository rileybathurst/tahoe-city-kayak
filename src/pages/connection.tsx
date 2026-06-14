import * as React from "react"
import { graphql, Link } from "gatsby"
import { SEO } from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";
import Hero from "../components/hero";

export const query = graphql`
  query ConnectionQuery {
    allStrapiConnection {
      nodes {
        name
        excerpt
        link
        hero {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }

    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      name
    }
  }
`;

type ConnectionTypes = {
  data: {
    allStrapiConnection: {
      nodes: {
        name: string;
        excerpt: string;
        slug: string;
        link: string;

        hero?: PaddleGatsbyImageType
      }[];
    };
    strapiBranch: {
      name: string;
    };
  };
};


const ConnectionPage = ({ data }: ConnectionTypes) => {

  var refferalLink = (link: string) => `${link}/?=${data.strapiBranch.name}-kayak-paddleboard`

  return (
    <React.Fragment>
      <Header />

      {data.allStrapiConnection.nodes.map((connection) => (
        connection?.hero &&
        <>
          <a href={refferalLink(connection.link)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* // TODO: link should have an visual representation */}
            <Hero
              image={connection.hero}
            />
          </a>

          <article className="condor">
            <h5>{data.strapiBranch.name} Kayak and Paddleboard Recommends</h5>
            <h1>
              <a href={refferalLink(connection.link)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {connection.name}
              </a>
            </h1>
            <p>{connection.excerpt}</p>
            <a href={refferalLink(connection.link)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {connection.link}
            </a>
            <hr />

          </article>
        </>
      ))}

      <Footer />
    </React.Fragment>
  );
};

export default ConnectionPage;

export const Head = ({ data }: ConnectionTypes) => {

  return (
    <SEO
      title="Connection"
      description={`${data.strapiBranch.name} Kayak and Paddleboard recommends`}
    />
  )
}