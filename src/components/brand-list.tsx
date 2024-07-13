// TODO: combine these together with sup-brand-list.tsx

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

const BrandList = ({ sport }) => {

  const { allStrapiBrand } = useStaticQuery(graphql`
    query SportBrandQuery {
      allStrapiBrand {
        nodes {
          id
          name
          slug
          svg
          retail {
            title
            slug
            sport {
              slug
            }
          }
        }
      }
    }
  `)

  const BrandSet = new Set();
  allStrapiBrand.nodes.map((brand) => {
    brand.retail.map((retail) => {
      if (retail.sport.slug === sport) {
        BrandSet.add(brand);
      }
    })
  });

  const BrandArray = (Array.from(BrandSet));

  interface BrandListTypes {
    id: React.Key;
    slug: string;
    svg: string;
    name: string;
    retail: {
      title: string;
      slug: string;
      sport: {
        slug: string;
      }
    }[]
  }

  return (
    <ul className='brand_list'>
      {BrandArray.map((brand) => (
        <li key={brand.id}>
          <Link to={`/retail/kayak/${brand.slug}`}>
            {brand.svg ?
              <div
                dangerouslySetInnerHTML={{ __html: brand.svg }}
              />
              : null}
            {brand.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BrandList
