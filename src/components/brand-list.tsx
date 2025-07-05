import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import SVG from 'react-inlinesvg';

type BrandListProps = {
  sport: string;
}
const BrandList = ({ sport }: BrandListProps) => {

  type brandTypes = {
    id: React.Key;
    name: string;
    slug: string;
    svg: string;
    retail: {
      title: string;
      slug: string;
      sport: {
        slug: string;
      }
    }[]
  }

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
  allStrapiBrand.nodes.map((brand: brandTypes) => {
    brand.retail.map((retail) => {
      if (retail.sport.slug === sport) {
        BrandSet.add(brand);
      }
    })
  });

  const BrandArray = Array.from(BrandSet) as brandTypes[];

  return (
    <ul className='brand_list'>
      {BrandArray.map((brand: brandTypes) => (
        <li key={brand.id}>
          <Link to={`/retail/${sport}/${brand.slug}`}>
            {brand.svg && <SVG src={brand.svg} />}
            {brand.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BrandList
