import * as React from "react"
import { Link } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";


const Brand = (props) => {
  return (
    <>
      <Header />

      <Seo
        title={`${props.name} ${props.type}s`}
        description={`Tahoe City Kayaks retail page for ${props.name} ${props.type}s`}
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
          <Link to="/retail" itemProp="item">
            <span itemProp="name">Retail</span>
            <meta itemProp="position" content="2" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to={`/retail/${props.type}`} itemProp="item">
            <span itemProp="name">{props.type}</span>
            <meta itemProp="position" content="3" />
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
              {props.name}
            </span>
            <meta itemProp="position" content="4" />
          </span>
        </li>
      </ol>

      <main>
        <hgroup className="brand__hgroup">
          <h1 className="capitalize">{props.name}</h1>
          <h2><span className="uppercase">{props.type}</span>s</h2>
        </hgroup>
      </main>

      {props.children}

      <Footer />
    </>
  )
}

export default Brand
