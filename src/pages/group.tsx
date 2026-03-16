import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Header from "../components/header";
import Footer from "../components/footer";
import ReactMarkdown from "react-markdown";
import Phone from "../components/phone";

import Composition from "../components/composition";

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
    <>
      <Header />
      <div className="albatross wrap">

        <main>
          <div className="condor">
            <h1>Group</h1>

            <div className="react-markdown">
              <ReactMarkdown>
                {data.strapiGroup.text.data.text}
              </ReactMarkdown>
              <Phone />
            </div>

          </div>

        </main>
          <Composition />
      </div>

      <Footer />
    </>
  )
}

export default GroupPage

export const Head = () => {
  return (
    <SEO
      title='Group'
      // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}
