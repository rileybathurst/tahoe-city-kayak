import * as React from "react";
import { Link, StaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
// import { Chart, Pullquote } from "./ui"
// import { Message } from "theme-ui"

import Header from "../components/header"
import Footer from "../components/footer"

function Test(props) {
  console.log(props.md);
  return null;
}

function WaterTexture(props) {
  return <StaticImage
    src="https://tahoe-city-kayak.s3.us-west-1.amazonaws.com/textures/jason-leung-Oc81QL8Crtg-unsplash-hd.jpg"
    alt="water texture"
    className={`img__wrapped ${props.className}`}
  // breakpoints={[300, 600, 900]}
  // width={650}
  />
}

function Capacity(props) {
  if (props.spec) {
    return (
      <div className="spec">
        <h3>{props.spec} Lbs</h3>
        <h4>Capacity</h4>
      </div>
    )
  } else {
    return null;
  }
}

const RetailView = ({ retail, other }) => {
  return (
    <>
      <Header />
      {/* // TODO: Breadcrumbs */}
      <main className="main__full">
        <div>
          <hgroup className="hgroup__retail">
            <h1 className="h_title">{retail.title}</h1>
            <h2 className="h_brand">{retail.brand}</h2>
            {/* <h3 className="h_type">{retail.type}</h3> */}
          </hgroup>
          <div>
            <button>${/* // TODO */} Book Now</button>
            <p>* Prices based on a
              {/* // TODO */} person minimum</p>
          </div>

          <Capacity spec={retail.capacity} />

        </div>
        <div>
          <WaterTexture />
          {/* <MDXRenderer components={{ List: () => <span style={{ color: 'tomato' }}>Pluto</span> }}>{retail.features.data.features}</MDXRenderer> */}
          {/* <MDXRenderer>{retail.features.data.features}</MDXRenderer> */}
          {/* <MDXRenderer>{retail.features}</MDXRenderer> */}
          {/* <MDXRenderer>{retail.features.data.internal.content}</MDXRenderer> */}
          {/* <MDXProvider><MDXRenderer>{retail.features.data.internal.content}</MDXRenderer></MDXProvider> */}
          {/* <MDXRenderer>{retail.features.data.features}</MDXRenderer> */}

          {/* test */}
          <Test md={retail.features.data.features} />
          {retail.features.data.features}
          {/* <MDXProvider>{retail.features.data.features}</MDXProvider> */}
        </div>

      </main>
      <article className="single__description">
        <MDXProvider components={{ List: () => <span style={{ color: 'tomato' }}>Pluto</span> }}>{retail.description.data.description}</MDXProvider>
      </article>
      <div className="single__book">
        <button>$ {/* // TODO */} Buy Now</button>
      </div>

      <div className="single__other">
        <h3>Other Kayaks &amp; SUPs</h3>
        <section className="deck">
          {other.nodes.map(retail => (
            <article className="card">
              <WaterTexture className="card__placeholder" />
              <h4 className="card__title">
                <Link to={`/tours/${retail.slug}`}>
                  {retail.title}
                </Link>
              </h4>
            </article>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RetailView;
