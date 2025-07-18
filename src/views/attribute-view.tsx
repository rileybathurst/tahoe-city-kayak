import * as React from "react"
import { Link } from 'gatsby';
import Header from "../components/header"
import Footer from "../components/footer"
import Card from "../components/card"
import FeatureList from "../components/feature-list";
import Sport from "../components/sport";
import type { CardType } from "../types/card";
import ReactMarkdown from 'react-markdown';
import { RetailType } from "../types/retail";
import Purchase from "../components/purchase";

// * SEO isnt here its on the templates
interface AttributeViewTypes {
  allStrapiRetail: {
    title: string;
    description: string;
    nodes: RetailType[];
  };
  strapiAttribute: {
    name: string;
    description: {
      data: {
        description: string;
      };
    };
  };
}
const AttributeView = ({ allStrapiRetail, strapiAttribute }: AttributeViewTypes) => {
  return (
    allStrapiRetail.nodes.length > 0 ?
      <>
        <Header />

        <main>
          <h1 className="capitalize">{strapiAttribute.name} - <Sport sport={allStrapiRetail.nodes[0].sport.slug} />s
          </h1>

          <ReactMarkdown className='react-markdown'>
            {strapiAttribute.description.data.description}
          </ReactMarkdown>
        </main>

        <section className="bag">
          {allStrapiRetail.nodes.map((retail) => (
            <Purchase
              key={retail.id}
              {...retail}
            />
          ))}
        </section>

        <section className="pelican" >
          <hr />
          <h2>Browse {allStrapiRetail.nodes[0].sport.slug}s By Feature</h2>
          <FeatureList sport={allStrapiRetail.nodes[0].sport.slug} />
        </section>

        <Footer />
      </>
      // TODO: move this inside a bit with a 404 but you shouldnt be able to get here
      : null
  )
}

export default AttributeView
