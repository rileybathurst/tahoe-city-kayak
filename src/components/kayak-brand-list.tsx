// TODO: combine these together with sup-brand-list.tsx
// This is easier now Im using sports
// TODO: do this with a query length check instead of a filter
// I have this on gatsby-node.ts with kayakSet

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

// I dont know how dangerous this dangerously set is as its prebuilt
function Danger(props: { svg: string; }) {
  const svg = (props.svg)
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

const KayakBrandList = () => {

  const { allStrapiBrand } = useStaticQuery(graphql`
    query KayakBrandQuery {
      allStrapiBrand {
        nodes {
          id
          name
          slug
          svg
          retail {
            title
            slug
          }
        }
      }
    }
  `)


  // TODO: retail is the check im working on

  interface KayakBrandListTypes {
    id: React.Key;
    slug: string;
    svg: string;
    name: string;
  }

  return (
    <ul className='brand_list'>
      {allStrapiBrand.nodes.map((kayak: KayakBrandListTypes) => (
        <li key={kayak.id}>
          <Link to={`/retail/kayak/${kayak.slug}`}>
            <Danger svg={kayak.svg} />
            {kayak.name}
            {/* Doubt?! https://caninclude.glitch.me/caninclude?child=p&parent=a */}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default KayakBrandList
