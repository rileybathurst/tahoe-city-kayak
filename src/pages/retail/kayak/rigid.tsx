// TODO this can be a template
// TODO: these can be split by brand

import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
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
  // console.log(retail.kayak.id);

  return (
    <article
      key={retail.kayak.id}
      className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={retail.kayak.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={retail.kayak.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      {/* // ? does this need a brand */}
      <h4 className="card__title">
        <Link to={`/retail/${retail.kayak.type}/${retail.kayak.slug}`}>
          {retail.kayak.title}
        </Link>
      </h4>
      <hr />
      <p>{retail.kayak.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={retail.kayak.length} /> long by {retail.kayak.width}" wide</h4>
        <h5 className="capitalize">Capacity {retail.kayak.capacity}lbs</h5>
        {/* // TODO: if no capacity */}
      </div>
    </article >
  )
}

const RigidKayakPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query {
      allStrapiRetail(filter: {inflatable: {eq: false}, type: {eq: "kayak"}}) {
        nodes {
          id
          title
          type
          slug
          length
          width
          capacity
          excerpt
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
  `)

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
          <li aria-current="page" key="rigid">Rigid Kayaks</li>
        </ol>
      </nav>

      <main>
        <h1>Rigid Kayaks</h1>
        <p>// TODO: </p>
      </main>

      <section className="deck" key="deck">
        {allStrapiRetail.nodes.map(retail => (
          <Card
            kayak={retail}
          />
        ))
        }
      </section >

      < hr className="passage" />

      <section className="passage" >
        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <Footer />
    </>
  )
}

export default RigidKayakPage

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
              "name": "Rigid Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}