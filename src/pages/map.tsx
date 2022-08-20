import * as React from "react"
import { Link } from "gatsby"

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";
import Here from "../components/here";
import MapSVG from "../images/map";

const NotFoundPage = () => {
  let title = "Map";

  return (
    <>
      <Header />

      <Seo
        title={title}
      />

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
        <h1>{title}</h1>
      </main>
      <div className="home__here">
        <Here />
        <MapSVG />
      </div>

      <Footer />
    </>
  )
}

export default NotFoundPage
