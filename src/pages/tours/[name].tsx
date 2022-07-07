import * as React from "react"
import { Link } from "gatsby"

/* import Header from "../../components/header";
import Footer from "../../components/footer"; */

function TourCatchAll({ params }) {
  return (
    <>
      {/* <Header /> */}
      {/*       <div className="measure">
        <ol className="breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" to="/">
              <span itemProp="name">Home</span>
            </Link>&nbsp;/&nbsp;
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link itemProp="item" to="/area">
              <span itemProp="name">Area</span></Link>&nbsp;/&nbsp;
            <meta itemProp="position" content="2" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{params.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
        <hr />
      </div> */}
      <main className="measure">
        <h2 className="crest">404</h2>
        <h1 className="mixta">Oops! Looks like this page has left the party.</h1>
        <p>Want to brighten up?<br />
          <Link to="/">Head to our home page.</Link>
        </p>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default TourCatchAll
