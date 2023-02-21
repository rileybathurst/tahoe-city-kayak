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
import Ultralight from "../../../components/ultralight";

function Card(props) {

  // console.log(props);
  // console.log(props.cutout);
  // console.log(props.cutout?.localFile?.childImageSharp?.gatsbyImageData);

  return (
    <article key={props.id} className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.type}/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.length} /> long by {props.width}" wide</h4>
        <h5 className="capitalize">Hull Weight {props.hullweight}lbs</h5>
      </div>
    </article>
  )
}

const UltralightPage = () => {

  const { allStrapiRetail } = useStaticQuery(graphql`
    query UltraLightQuery {
      allStrapiRetail(
        filter: {
          type: {eq: "kayak"},
          hullweight: {lt: 46},
          crew: {eq: "single"}
        }
        sort: {hullweight: ASC}
      ) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type
          hullweight
          
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

  let title = "Ultralight Kayaks";

  return (
    <>
      <Header />

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to={`/retail`}>Retail</Link>&nbsp;/&nbsp;
          </li>
          <li>
            <Link to={`/retail/kayak`}>Kayak</Link>&nbsp;/&nbsp;
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>

      <main>
        <h1>{title}</h1>
        <Ultralight />
      </main>


      <section className="deck">
        {/* // TODO: I can just send the whole lot and deal with it up the top */}
        {allStrapiRetail.nodes.map(retail => (
          <Card
            id={retail.id}
            slug={retail.slug}
            title={retail.title}
            hullweight={retail.hullweight}
            length={retail.length}
            width={retail.width}
            excerpt={retail.excerpt}
            cutout={retail.cutout}
            type={retail.type}
          />
        ))}
      </section>
      <hr className="pelican-inline" />


      <section className="pelican-inline">
        <h3>Browse Kayaks by Feature</h3>
        <KayakFeatureList />
      </section>


      <Footer />
    </>
  )
}

export default UltralightPage

export const Head = () => {
  return (
    <SEO
      title={`Ultralight Kayaks | ${useSiteName()}`}
      description="Our ultralight kayaks are Single kayaks under 46 pounds"
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
            "name": "Ultralight Two Person Kayaks"
          }]
        }
      `}
      </Script>
    </SEO>
  )
}
