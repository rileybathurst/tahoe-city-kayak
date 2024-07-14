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

        <section className="deck">
          {allStrapiRetail.nodes.map((retail) => (
            <Card
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

        {/* <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>
          <li>
            <Link to={`/retail/${sport.slug}`}>
              <Sport sport={sport.slug} />
            </Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav> */}

        <Footer />
      </>
      : null
  )
}

export default AttributeView
