import * as React from "react"
import { Link } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

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
          <Link to="/retail" itemprop="item">
            <span itemprop="name">Retail</span>
            <meta itemprop="position" content="2" />
          </Link>&nbsp;&nbsp;/&nbsp;&nbsp;
        </li>

        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to={`/retail/${props.type}`} itemprop="item">
            <span itemprop="name">{props.type}</span>
            <meta itemprop="position" content="3" />
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
              {props.name}
            </span>
            <meta itemprop="position" content="4" />
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
