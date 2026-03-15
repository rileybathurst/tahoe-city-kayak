// ! fix the layout, compostion should be across

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SEO } from "../components/seo";

import Phone from "../components/phone";
import Header from "../components/header";
import Footer from "../components/footer";
import Composition from "../components/composition";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";

const DeliveryPage = () => {

  type deliveryTypes = {
    strapiDelivery: {
      text: {
        data: {
          text: string;
        }
      }
    },
    strapiBranch: {
      email: string;
      phone: number;
    }
  }

  const data: deliveryTypes = useStaticQuery(graphql`
    query DeliveryQuery {
      strapiDelivery {
        text {
          data {
            text
          }
        }
      }

      strapiBranch(slug: {eq: "tahoe-city"}) {
        email
        phone
      }
    }
  `)

  const phoneAndEmailLinks = data.strapiDelivery.text.data.text
    .replaceAll(
      "(phoneLink)",
      `(tel:${data.strapiBranch.phone})`
    )
    .replaceAll(
      "(emailLink)",
      `(mailto:${data.strapiBranch.email})`
    )

  return (
    <React.Fragment>
      <Header />

      <main>
        <article>
          {/* // TODO: move to CMS */}
          <h1>Delivery</h1>
          <div className="react-markdown">
            
            {/* // * by default this pulls phone links out */}
            <ReactMarkdown
              urlTransform={(url) => url.startsWith("tel:") ? url : defaultUrlTransform(url)}
            >
              {phoneAndEmailLinks}
            </ReactMarkdown>
          </div>

          {/* // TODO: multi button */}
          <Phone />
          <a
            href={`mailto:${data.strapiBranch.email}`}
            rel="noreferrer noopener"
            className="button"
          >
            {data.strapiBranch.email}
          </a>
        </article>
        <Composition />
      </main >

      <Footer />
    </React.Fragment>
  )
}

export default DeliveryPage

export const Head = () => {
  return (
    <SEO
      title='Delivery'
      description="Whether you need retail kayaks or paddleboards, or our rental watercraft, we can deliver throughout the Tahoe Region and beyond &#40;Sacramento and Reno areas included&#41;"

    // todo service areas

    />
  )
}
