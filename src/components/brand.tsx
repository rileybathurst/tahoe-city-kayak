// TODO: cardtype in here seems kinda a mess

import * as React from "react"
import { Link } from "gatsby"
import Purchase from "./purchase";
import type { CardType } from "../types/card";
import Sport from "./sport";
import SVG from 'react-inlinesvg';

// TODO: just dont query for these on kayak.tsx and sup.tsx
// needs a second graphql with a filter but better than querying too much and then cutting down
function Limiter(props: {
  brand: {
    svg: string;
    slug: string;
    name: string;
    tagline: string;
    retail: CardType[];
  };
  type: "kayak" | "sup";
}) {
  // Im trying to make a set of 4 cards from the props.brand.retail array
  // using foreach to remove the react key issues

  // all the kayaks or sups
  const type: CardType[] = [];

  // only the first 4
  const quad: CardType[] = [];

  props.brand.forEach((retail: { type: CardType[]; }) => {
    if (retail.type === props.type) {
      // console.log(retail.title);
      type.push(retail);
    }
  });

  type.slice(0, 4).forEach(retail => {
    quad.push(retail);
  });

  return (
    <div className='bag'>
      {quad.map((retail) => {
        {/* // * this is weird it needs a nested return */ }
        return (
          <Purchase
            key={retail.id}
            {...retail}
          />
        )
      })}
    </div>
  )
}

interface BrandTypes {
  svg: string;
  slug: string;
  name: string;
  tagline: string;
  retail: CardType[];
  type: "kayak" | "sup";
}
const Brand = ({ svg, slug, name, tagline, retail, type }: BrandTypes) => {

  // console.log(retail);

  return (
    <>
      <section className="condor">
        <div className='brand-logo'>
          <SVG src={svg} />
          <h2 className='capitalize'>
            <Link to={`/retail/${type}/${slug}`}>
              {name}
            </Link>
          </h2>
        </div>
        <p>{tagline}</p>
        <hr />
      </section>

      {/* // TODO: fix this */}
      <Limiter
        brand={retail}
        type={type}
      />

      {retail.length > 4 ?
        <section className="condor">
          <h3 className='capitalize'>
            <Link to={slug}>
              All {retail.length} {name} <Sport sport={`${type}s`} />
            </Link>
          </h3>
          <hr />
        </section>
        : null}

    </>
  )
}

export default Brand