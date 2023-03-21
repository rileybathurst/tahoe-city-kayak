import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';

import Header from "../components/header";
import Footer from "../components/footer";

import Composition from "../components/composition";

const DeliveryPage = () => {

  return (
    <>
      <Header />

      <main className="progression">
        <article
        // className="info"
        >
          <h1>Delivery</h1>
          <p>Whether you need retail kayaks or paddleboards, or our rental watercraft, we can deliver throughout the Tahoe Region and beyond &#40;Sacramento and Reno areas included&#41;. We can deliver to your home, vacation property, or to public beaches &#40;where local rules and access allow&#41;.</p>

          <p>
            Since every delivery is different, a <a href="phone:(530) 581-4336" rel="norel norefferer">phone call</a> or <a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer">email</a> is the best way to make a plan that meets your needs. Our delivery fees depend on how far we are traveling, how many employees we need to send, and how straightforward the delivery is &#40;ie. if we have to carry watercraft down flights of stairs, over rocks, etc&#41;. We aren't trying to make a profit from delivery fees, but we do need to cover our costs.
          </p>

          <a href="phone:(530) 581-4336" rel="norel norefferer" className="button">Phone: &#40;530&#41; 581-4336</a>
          <a href="mailto:tahoecitykayak@gmail.com" rel="norel norefferer" className="button">tahoecitykayak@gmail.com</a>
        </article>
        <Composition />
      </main>

      <Footer />
    </>
  )
}

export default DeliveryPage

export const Head = () => {
  return (
    <SEO
      title={`Delivery | ${useSiteName()}`}
      description="Whether you need retail kayaks or paddleboards, or our rental watercraft, we can deliver throughout the Tahoe Region and beyond &#40;Sacramento and Reno areas included&#41;"

    // todo service areas

    />
  )
}