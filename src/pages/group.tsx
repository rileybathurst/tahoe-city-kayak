import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import Phone from "../components/phone";

import Composition from "../components/composition";
import SplitLayout from "../components/split-layout";

type groupTypes = {
  strapiGroup: {
    text: {
      data: {
        text: string;
      }
    }
  }
}
const GroupPage = () => {

  const data: groupTypes = useStaticQuery(graphql`
    query GroupQuery {
      strapiGroup {
        text {
          data {
            text
          }
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Header />
      <SplitLayout content={
        <React.Fragment>
            <h1>Group</h1>

            <div className="react-markdown">
              <ReactMarkdown>
                {data.strapiGroup.text.data.text}
              </ReactMarkdown>
              <Phone />
            </div>

        </React.Fragment>

      }/>

      <Footer />
    </React.Fragment>
  )
}

export default GroupPage

export const Head = () => {
  return (
    <SEO
      title='Group'
      // TODO: description
    />
  )
}
