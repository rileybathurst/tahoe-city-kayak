import * as React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import FeatureList from "../components/feature-list";
import Sport from "../components/sport";
import ReactMarkdown from 'react-markdown';
import type { AttributeViewTypes } from "../types/attribute-view-types";
import { PaddleCard } from "@rileybathurst/paddle";

const AttributeView = ({ allStrapiRetail, strapiAttribute }: AttributeViewTypes) => {
  return (
    allStrapiRetail.nodes.length > 0 ?
      <>
        <Header />

        <main>
          <h1 className="capitalize">
            {strapiAttribute.name} - <Sport sport={allStrapiRetail.nodes[0].sport.slug} />s
          </h1>

          <ReactMarkdown>
            {strapiAttribute.description.data.description}
          </ReactMarkdown>
        </main>

        <section className="deck">
          {allStrapiRetail.nodes.map((retail) => (
            <PaddleCard
              key={retail.id}
              {...retail}
            // ! link
            />
          ))}
        </section>

        <section className="pelican" >
          <hr />
          <h2>Browse {allStrapiRetail.nodes[0].sport.slug}s By Feature</h2>
          <FeatureList sport={allStrapiRetail.nodes[0].sport.slug} />
        </section>

        {/* // TODO: Breadcrumbs */}
        <Footer />
      </>
      // TODO: move this inside a bit with a 404 but you shouldnt be able to get here
      : null
  )
}

export default AttributeView
