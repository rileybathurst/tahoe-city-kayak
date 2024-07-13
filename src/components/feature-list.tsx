// TODO: this can be prettier with a map of the feature types but its fine for now

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';

interface FeatureListTypes {
  sport: string;
}
const FeatureList = ({ sport }: FeatureListTypes) => {

  const data = useStaticQuery(graphql`
    query FeatureLIstQuery {
      allStrapiAttribute {
        nodes {
          name
          slug
          id
        }
      }

      allStrapiRetail {
        nodes {
          id
          sport {
            slug
          }
          inflatable
          crew
          hullweight
        }
      }
    }
  `)

  const inflatableSet = new Set();
  const rigidSet = new Set();
  const tandemSet = new Set();
  const ultralightSet = new Set();
  const ultralightTandemSet = new Set

  data.allStrapiRetail.nodes.map((retail) => {
    if (retail.inflatable === true && retail.sport.slug === sport) {
      inflatableSet.add({
        id: retail.id,
      });
    } else {
      rigidSet.add({
        id: retail.id,
      });
    }

    // add the variables to strapi
    // 46 is ultralight
    // 70 is ultralight tandem
    if (retail.hullweight > 70 && retail.crew === 'tandem' && retail.sport.slug === sport) {
      ultralightTandemSet.add({
        id: retail.id,
      });
    } else if (retail.hullweight > 46 && retail.crew === 'single' && retail.sport.slug === sport) {
      ultralightSet.add({
        id: retail.id,
      });
    } else if (retail.crew === 'tandem' && retail.sport.slug === sport) {
      tandemSet.add({
        id: retail.id,
      });
    }

  });

  data.allStrapiRetail.nodes.map((retail) => {
    if (retail.inflatable === true && retail.sport.slug === sport) {
      inflatableSet.add({
        id: retail.id,
      });
    } else if (retail.sport.slug === sport) {
      rigidSet.add({
        id: retail.id,
      });
    }
  });

  const FeatureArray = [];

  if (inflatableSet.size > 0) {
    // can you query for the attribute slug here?
    FeatureArray.push('inflatable');
  }

  if (rigidSet.size > 0) {
    // can you query for the attribute slug here?
    FeatureArray.push('rigid');
  }

  if (tandemSet.size > 0) {
    FeatureArray.push('tandem');
  }

  if (ultralightSet.size > 0) {
    FeatureArray.push('ultralight');
  }

  if (ultralightTandemSet.size > 0) {
    FeatureArray.push('ultralight-tandem');
  }

  return (
    <ul className='features'>
      {FeatureArray.map((feature) => (
        data.allStrapiAttribute.nodes
          .filter((attribute) => attribute.slug === feature)
          .map((attribute) => (
            <li key={attribute.id}>
              <Link to={`/retail/attribute/${sport}/${attribute.slug}`}>
                {attribute.name}
              </Link>
            </li>
          ))
      ))}
    </ul>
  )
}

export default FeatureList
