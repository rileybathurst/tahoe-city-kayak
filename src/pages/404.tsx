import * as React from "react"
import { graphql } from "gatsby"
import { SEO } from "../components/seo";


import Header from "../components/header";
import Footer from "../components/footer";

type NotFoundPageTypes = {
  data: {
    strapiError: {
      title: string;
      description: {
        data: {
          description: string;
        };
      };
    };
  };
  location: {
    pathname: string;
  };
};
const NotFoundPage = ({ location, data }: NotFoundPageTypes) => {
  return (
    <React.Fragment>
      <Header />

      <main>
        <h1>404 - {location.pathname}</h1>
        <h2>{data.strapiError.title}</h2>
        <p>{data.strapiError.description.data.description}</p>
      </main>
      <Footer topHR />
    </React.Fragment>
  )
}

export default NotFoundPage

export const Head = ({ location, data }: NotFoundPageTypes) => {

  return (
    <SEO
      title={`${location.pathname} - ${data.strapiError.title}`}
      description={data.strapiError.description.data.description}
    />
  )
}

export const data = graphql`
  query NotFoundPageQuery {
    strapiError {
      ...errorFragment
    }
  }
`