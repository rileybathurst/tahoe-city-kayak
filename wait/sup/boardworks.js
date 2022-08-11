import * as React from "react"
import { StaticQuery, graphql } from 'gatsby';

import Brand from "../../../views/brand";
import SupBrandCard from "../../../components/sup-brand-card";

const BoardworksPage = () => {
  return (
    <Brand
      name="Boardworks"
      type="sup"
    >

      {<StaticQuery
        query={query}
        render={data => (
          <>
            {
              <section className="deck">
                {
                  data.allStrapiRetail.edges.map(retail => (
                    <SupBrandCard
                      id={retail.node.id}
                      slug={retail.node.slug}
                      title={retail.node.title}
                      capacity={retail.node.capacity}
                      length={retail.node.length}
                      width={retail.node.width}
                      excerpt={retail.node.excerpt}
                      cutout={retail.node?.cutout}
                    />
                  ))
                }
              </section>
            }
          </>
        )}
      />}

    </Brand>
  )
}

export default BoardworksPage

const query = graphql`
query BoardworksSupQuery {
  allStrapiRetail(
    filter: {type: {eq: "sup"},
    brand: {eq: "boardworks"}}
    ) {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
}
`
