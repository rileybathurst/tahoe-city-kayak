// TODO add the retail content

import React, { useState, useEffect } from "react"
import { Link, graphql, Script } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';
import { useSiteUrl } from "../hooks/use-site-url";

import Header from '../components/header';
import Footer from '../components/footer';
import Store from "../components/locations/store";

import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";
import Danger from "../components/danger";

function Sup(props) {
  return (
    <article className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
          objectFit="contain"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/sup/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5><Remainder inches={props.length} /> long by {props.width}" wide</h5>
        <h5>Hull weight: {props.hullweight} lbs</h5>
      </div>
    </article>
  )
}

function Title(props) {
  let title = props.title

  if (props.set.has(title)) {
    return (
      <>
        <h2 className="capitalize">{props.title}&nbsp;
          <span className='typography__secondary'>Series</span>
        </h2>
        <hr />
      </>
    )
  }
  return null
}

function Next(props) {
  const mySet1 = new Set();

  props.series.forEach(series => {

    if (series.type === 'sup') {
      mySet1.add(series.series);
    }
  });

  // console.log(mySet1);

  if (props.list === 'true' && mySet1.size > 1) {
    return (
      <>
        <h2>Series</h2>
        <ul className="series-list">
          {[...mySet1].map(series => (
            <li className="capitalize"><Link to={`#${series}`}>{series}</Link></li>
          ))}
        </ul>
      </>
    );
  } else if (props.title === 'null') {
    return null;
  } else {
    return (
      <>
        <Title title={props.title} set={mySet1} />
      </>
    );
  }
}

const supBrandView = ({ data }) => {
  return (
    <>
      <Header />

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>

          <li>
            <Link to="/retail/sup">Standup Paddleboard</Link>&nbsp;/&nbsp;
          </li>

          <li aria-current="page">{data.brand.name}</li>
        </ol>
      </nav>

      <main className="location_card-wrapper">
        <div>
          <Danger svg={data.brand.svg} />
          {/* // TODO: clean this up with the svg above */}
          <h1 className="capitalize">{data.brand.name}</h1>
          <p>{data.brand.tagline}.</p>
          <hr />

          <Next series={data.brand.retail} list='true' />
        </div>

        <div className="location_card">
          <Store />
        </div>
      </main>

      <section id='island' className="possibly-empty">
        <Next series={data.brand.retail} list='false' title="island" />
      </section>
      {/* this has to be here */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has */}
      <div className="deck">
        {
          data.island.edges.map(sup => (
            <Sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
              hullweight={sup.node.hullweight}
            />
          ))
        }
      </div>

      <section id='mirage' className="possibly-empty passage">
        <Next series={data.brand.retail} title="mirage" />
      </section>
      <div className="deck">
        {
          data.mirage.edges.map(sup => (
            <Sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
              hullweight={sup.node.hullweight}
            />
          ))
        }
      </div>

      <section id='inflatable' className="possibly-empty">
        <Next series={data.brand.retail} title="inflatable" />
      </section>
      <div className="deck">
        {
          data.inflatable.edges.map(sup => (
            <Sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
              hullweight={sup.node.hullweight}
            />
          ))
        }
      </div>

      {/* //TODO: there needs to be more of a not in a series */}

      <section className="possibly-empty">
        <Next series={data.brand.retail} title="null" />
      </section>
      <div className="deck">
        {
          data.null.edges.map(sup => (
            <Sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
              hullweight={sup.node.hullweight}
            />
          ))
        }
      </div>

      <Footer />
    </>
  );
};

export default supBrandView;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.brand.name} standup paddleboards sold at ${useSiteName()}`}
      description={`${data.brand.name} standup paddleboards ${data.brand.tagline}`}
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
            "name": "Retail",
            "item": "${useSiteUrl()}/retail"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "Standup Paddleboard",
            "item": "${useSiteUrl()}/retail/sup"
          },{
            "@type": "ListItem",
            "position": 4,
            "name": "${data.brand.name}"
          }]
        }
      `}
      </Script>

    </SEO>
  )
}

// ? // TODO: add type into here

export const query = graphql`
  query SupBrandsTemplate(
    $slug: String!,
  ) {
    brand: strapiBrand(slug: {eq: $slug}) {
    id
    name
    tagline
    svg
    retail {
      series
      title
      type
    }
  }

  island: allStrapiRetail(
    filter: {
      brand: {slug: {eq: $slug}},
      type: {eq: "sup"},
      series: {eq: "island"}
    }
  ) {
    edges {
      node {
        title
        slug
        excerpt
        length
        width
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

  mirage: allStrapiRetail(
  filter: {
    brand: {slug: {eq: $slug}},
    type: {eq: "sup"},
    series: {eq: "mirage"}
  }
  ) {
    edges {
    node {
      title
      slug
      excerpt
      length
      width
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
  
inflatable: allStrapiRetail(
  filter: {
    brand: {slug: {eq: $slug}},
    type: {eq: "sup"},
    series: {eq: "inflatable"}
  }
  ) {
    edges {
    node {
      title
      slug
      excerpt
      length
      width
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

  null: allStrapiRetail(
    filter: {
      brand: {slug: {eq: $slug}},
      type: {eq: "sup"},
      series: {nin: ["island", "mirage", "inflatable"]}
    }
  ) {
    edges {
      node {
        title
        slug
        excerpt
        length
        width
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



}
  `;
