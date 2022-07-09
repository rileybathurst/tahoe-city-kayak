import * as React from "react";
import { Link } from "gatsby";

import WaterTexture from "../images/watertexture";

// import { MDXProvider } from "@mdx-js/react"
// import { MDXRenderer } from "gatsby-plugin-mdx"
// import { Chart, Pullquote } from "./ui"
// import { Message } from "theme-ui"

import Header from "../components/header"
import Footer from "../components/footer"
import BookNow from "../components/peek/book-now";


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
            <BookNow />
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
          {/* <Test md={retail.features.data.features} /> */}
          {/* {retail.features.data.features} */}
          {/* <MDXProvider>{retail.features.data.features}</MDXProvider> */}
        </div>

      </main>
      <article className="single__description">
        {/* <MDXProvider components={{ List: () => <span style={{ color: 'tomato' }}>Pluto</span> }}>{retail.description.data.description}</MDXProvider> */}
        {retail.description.data.description}
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
