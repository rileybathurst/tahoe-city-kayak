import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

const NotFoundPage = () => {
  let title = "404";

  return (
    <>
      <Header />

      <Seo
        title={title}
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to="/" itemprop="item">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="item">
            <span
              itemprop="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemprop="position" content="2" />
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
