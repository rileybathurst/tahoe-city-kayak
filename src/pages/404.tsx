import * as React from "react"
import { graphql } from "gatsby"
import { SEO } from "../components/seo";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

import Header from "../components/header";
import Footer from "../components/footer";

type NotFoundPageTypes = {
  data: {
    strapiError: {
      excerpt: string;
      return: BlocksContent;
    };
  };
  location: {
    pathname: string;
  };
};
const NotFoundPage = ({ location, data }: NotFoundPageTypes) => {
  return (
    <>
      <Header />

      <main className="measure">
        {/* // TODO: add an eyebrow to this */}
        <h2 className="crest">404 - {location.pathname}</h2>

        <h1 className="mixta">{data.strapiError.excerpt}</h1>
        <BlocksRenderer content={data.strapiError.return} />
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

// This might be brittle but its better than not
// Although this doesn't need SEO it still needs a title so this is the best way to do it
export const Head = ({ location, data }: NotFoundPageTypes) => {

  // console.log(data.strapiError.return);
  let cleanText = "";
  data.strapiError.return[0].children.map((child) => {
    if (child.type === 'text') {
      cleanText += child.text;
    }
    if (child.type === 'link') {
      cleanText += child.children.map((linkChild) => linkChild.text).join('');
    }
  });

  // console.log("cleanText", cleanText);

  return (
    <SEO
      title={location.pathname}
      description={`${data.strapiError.excerpt} ${cleanText}`}
    />
  )
}

// * strapi gatsby query is bad but this is the best we can do for now
export const data = graphql`
  query NotFoundPageQuery {
    strapiError {
      excerpt

      return {
        type
        children {
          children {
            text
            type
          }
        text
        type
        url
      }
    }

  }
}
`