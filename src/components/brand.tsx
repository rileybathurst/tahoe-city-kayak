import * as React from "react"
import { Link } from "gatsby"

import Danger from "./danger"
import More from "./more";
import Card from "./card";

function Limiter(props) {
  // Im trying to make a set of 4 cards from the props.brand.retail array
  // using foreach to remove the react key issues

  // all the kayaks or sups
  const type = [];

  // only the first 4
  const quad = [];

  props.brand.forEach(retail => {
    if (retail.type === props.type) {
      // console.log(retail.title);
      type.push(retail);
    }
  });

  type.slice(0, 4).forEach(retail => {
    quad.push(retail);
  });

  return (
    <div className='deck'>
      {quad.map((retail) => {
        {/* // * this is weird it needs a nested return */ }
        return (
          <div key={retail.id}>
            <Card retail={retail} />
          </div>
        )
      })}
    </div>
  )
}

const Brand = (props) => {
  return (
    <>
      <section className="passage">
        <div className='brand-logo'>
          <Danger svg={props.brand.svg} />
          <h2 className='capitalize'>
            <Link to={props.brand.slug}>
              {props.brand.name}
            </Link>
          </h2>
        </div>
        <p>{props.brand.tagline}.</p>
        <hr />
      </section>

      {/* // * both below might have react key issues */}
      <Limiter
        brand={props.brand.retail}
        type={props.type}
      />
      <More
        retail={props.brand.retail}
        brand={props.brand.name}
        slug={props.brand.slug}
        type={props.type}
      />
    </>
  )
}

export default Brand