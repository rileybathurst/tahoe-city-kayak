import * as React from "react"
import { graphql, Link } from "gatsby"
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";
import Hero from "../../components/hero";

export const query = graphql`
  query ConnectionPageQuery($slug: String!) {
    strapiConnection(slug: { eq: $slug }) {
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

    strapiBranch(slug: {eq: "tahoe-city"}) {
      name
    }
  }
`;

type ConnectionTypes = {
  data: {
    strapiConnection: {
      name: string;
      excerpt: string;
      slug: string;
      link: string;

      hero?: PaddleGatsbyImageType
    };
    strapiBranch: {
      name: string;
    };
  };
};


const ConnectionPage = ({ data }: ConnectionTypes) => {

  var refferalLink = `${data.strapiConnection.link}/?=${data.strapiBranch.name}-kayak-paddleboard`

  return (
    <React.Fragment>
      <Header />
      {data.strapiConnection?.hero &&
        <a href={refferalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* // TODO: link should have an visual representation */}
          <Hero
            image={data.strapiConnection.hero}
          />
        </a>
      }
      <main>
        <h5>{data.strapiBranch.name} Kayak and Paddleboard Recommends</h5>
        <h1>{data.strapiConnection.name}</h1>
        <p>{data.strapiConnection.excerpt}</p>
        <a href={refferalLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.strapiConnection.link}
        </a>

      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/Connection/">Connection</Link></Breadcrumb>
        <Breadcrumb>{data.strapiConnection.name}</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  );
};

export default ConnectionPage;

export const Head = ({ data }: ConnectionTypes) => {

  return (
    <SEO
      title={`${data.strapiBranch.name} Kayak and Paddleboard recommends ${data.strapiConnection.name}`}
      description={data.strapiConnection.excerpt}
      // TODO: image is this setup properly
      breadcrumbs={[
        { name: "Connection", item: "Connection" },
        { name: data.strapiConnection.name }
      ]}
    />
  )
}