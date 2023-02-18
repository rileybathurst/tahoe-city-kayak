// TODO this can be a template

import * as React from "react"
import { Link, StaticQuery, graphql, Script } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../../../components/seo";
import { useSiteName } from "../../../hooks/use-site-name";
import { useSiteUrl } from "../../../hooks/use-site-url";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import TextureBackgrounds from "../../../components/texturebackgrounds";
import Remainder from "../../../components/remainder";
import KayakFeatureList from "../../../components/kayak-feature-list";

function Card(retail) {
  // console.log(retail);
  // console.log(retail.kayak.node.id);

  return (
    <article
      key={retail.kayak.node.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={retail.kayak.node.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={retail.kayak.node.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${retail.kayak.node.type}/${retail.kayak.node.slug}`}>
          {retail.kayak.node.title}
        </Link>
      </h4>
      <hr />
      <p>{retail.kayak.node.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={retail.kayak.node.length} /> long by {retail.kayak.node.width}" wide</h4>
        <h5 className="capitalize">Capacity {retail.kayak.node.capacity}lbs</h5>
        {/* // TODO: if no capacity */}
      </div>
    </article >
  )
}

const InflatableKayakPage = () => {
  return (
    <>
      <Header />

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li key="retail">
            <Link to={`/retail`}>Retail</Link>&nbsp;/&nbsp;
          </li>
          <li key="kayak">
            <Link to={`/retail/kayak`}>Kayak</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page" key="inflatable">Inflatable Kayaks</li>
        </ol>
      </nav>

      <main>
        <h1>Inflatable Kayaks</h1>
        <p>// TODO: </p>
      </main>


      <StaticQuery
        query={query}
        render={data => (
          <section className="deck" key="deck">
            {
              data.allStrapiRetail.edges.map(retail => (
                <Card
                  kayak={retail}
                />
              ))
            }
          </section >
        )}
      />

      < hr className="pelican-inline" />

      <section className="pelican-inline" >

        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <Footer />
    </>
  )
}

export default InflatableKayakPage

export const Head = () => {
  return (
    <SEO
      title={`Two Person Kayaks | ${useSiteName()}`}
      description="Our tandem kayaks are the perfect way to explore the water with friends"
    // TODO image
    >
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Retail",
              "item": "${useSiteUrl()}/retail"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Kayak",
              "item": "${useSiteUrl()}/retail/kayak"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Inflatable Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}

const query = graphql`
  query InflatableKayakQuery {
    allStrapiRetail(filter: {inflatable: {eq: true}, type: {eq: "kayak"}}) {
      nodes {
        title
        id
        title
        slug
        excerpt
        capacity
        length
        width
        type

        cutout {
          localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
    }
  }
}
      `

// filter: {inflatable: {eq: true}, type: {eq: "kayak"}}(limit: 4), 
/* allStrapiRetail {
  edges {
    node {
      
    }
  }
} */