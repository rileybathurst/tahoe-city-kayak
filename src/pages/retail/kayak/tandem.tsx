// TODO this can be a template

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

function Card(props) {
  // console.log(props.kayak);

  return (
    <article key={props.kayak.id} className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props.kayak.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props.kayak.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.kayak.type}/${props.kayak.slug}`}>
          {props.kayak.title}
        </Link>
      </h4>
      <hr />
      <p>{props.kayak.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.kayak.length} /> long by {props.kayak.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.kayak.capacity}lbs</h5>
      </div>
    </article>
  )
}

const TandemPage = () => {

  const data = useStaticQuery(graphql`
    query TandemQuery {
      allStrapiRetail(filter: {crew: {eq: "tandem"}, type: {eq: "kayak"}}) {
        nodes {
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

      strapiFaq(question: {eq: "Is it best to go in a two-person (tandem) kayak?"}) {
        question
        answer
      }
    }
  `)

  let allStrapiRetail = data.allStrapiRetail.nodes;
  let tandem = data.strapiFaq;

  let title = "Two Person Kayaks";

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
        <h1>Two Person (Tandem) Kayaks</h1>
        <p>Our tandem kayaks are the perfect way to explore the water with friends.</p>
      </main>

      <section
        // className="faq"
        className="stork-inline"
      >

        <h2 className="h3">{tandem.question}</h2>
        {/* // TODO ? is this markdown */}
        <p>{tandem.answer}</p>
        <Link to="/about/faq">Read more of our FAQs</Link>
      </section>

      <section className="deck">
        {allStrapiRetail.map(retail => (
          <Card
            kayak={retail}
          />
        ))}
      </section>

      <hr className="passage" />


      <section className="passage" >

        <h3>Browse More Kayaks by Features</h3>
        <KayakFeatureList />
      </section>

      <Footer />
    </>
  )
}

export default TandemPage

export const Head = () => {
  return (
    <SEO
      title={`Two Person Kayaks | ${useSiteName()}`}
      description="Our tandem kayaks are the perfect way to explore the water with friends"
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
              "name": "Two Person Kayaks"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
