import * as React from "react"
import { Link } from 'gatsby';

import Header from "../components/header";
import Footer from "../components/footer";
import Seo from "../components/seo";

function Type(props) {
  if (props.type === "kayak") {
    return (
      <>
        <Link to="/retail/kayak">Kayak</Link>&nbsp;/&nbsp;
      </>
    )
  } else if (props.type === "sup") {
    return (
      <>
        <Link to="/retail/sup">SUP</Link>&nbsp;/&nbsp;
      </>
    )
  } else {
    return null;
  }
}


const Brand = (props) => {
  return (
    <>
      <Header />

      <Seo
        title={`${props.name} Kayaks`}
      />

      <div className="breadcrumbs">
        <Link to="/">Home</Link>&nbsp;/&nbsp;
        <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
        <Type type={props.type} />
        &nbsp;&nbsp;{props.name}
      </div>

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
