import * as React from "react"
import { Link } from "gatsby"
import { SEO } from "../components/seo";
import TitleTemplate from "../components/title-template";

import Header from "../components/header";
import Footer from "../components/footer";

const NotFoundPage = () => {
  let title = "404";

  return (
    <>
      <Header />

      {/*       <Seo
        title={title}
      /> */}

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <h1>Page not found</h1>
        <p>
          Sorry we couldn’t find what you were looking for.
          <br />
          <Link to="/">Go home</Link>.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head = () => {
  return (
    <SEO
      title={`404${TitleTemplate}`}
    // description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}