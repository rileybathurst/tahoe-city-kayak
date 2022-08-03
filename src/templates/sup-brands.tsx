import React, { useState, useEffect } from "react"
import { Link, graphql, StaticQuery, useStaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

import Header from '../components/header';
import Footer from '../components/footer';
import Seo from "../components/seo";

import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";
import Danger from "../components/danger";

function Null(props) {
  // console.log(props.check);
  return null;
}

function sup(props) {
  return (
    <article className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5><Remainder inches={props.length} /> tall by {props.width}" wide</h5>
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
    mySet1.add(series.series);
  });

  if (props.list === 'true') {
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
      <Seo
        title={`Tahoe City sup sells ${data.brand.name} sups`}
        description={`${data.brand.name} sups ${data.brand.tagline}`}
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/" itemProp="item">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>


        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/retail" itemProp="item">
            <span itemProp="name">Retail</span>
            <meta itemProp="position" content="2" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link to="/retail/sup" itemProp="item">
            <span itemProp="name">SUP</span>
            <meta itemProp="position" content="3" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {data.brand.name}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <Danger svg={data.brand.svg} />
        {/* // TODO: clean this up with the svg above */}
        <h1 className="capitalize">{data.brand.name}</h1>
        <p>{data.brand.tagline}.</p>
        <hr />

        <Next series={data.brand.retail} list='true' />
      </main>

      <section id='island'>
        <Next series={data.brand.retail} list='false' title="island" />
      </section>
      {/* this has to be here */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has */}
      <div className="deck">
        {
          data.island.edges.map(sup => (
            <sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
            />
          ))
        }
      </div>

      <section id='mirage'>
        <Next series={data.brand.retail} title="mirage" />
      </section>
      <div className="deck">
        {
          data.mirage.edges.map(sup => (
            <sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
            />
          ))
        }
      </div>

      <section id='inflatable'>
        <Next series={data.brand.retail} title="inflatable" />
      </section>
      <div className="deck">
        {
          data.inflatable.edges.map(sup => (
            <sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
            />
          ))
        }
      </div>

      {/* //TODO: there needs to be more of a not in a series */}

      <section>
        <Next series={data.brand.retail} title="null" />
      </section>
      <div className="deck">
        {
          data.null.edges.map(sup => (
            <>
            <Null check={sup} />
            <sup
              key={sup.node.id}
              title={sup.node.title}
              slug={sup.node.slug}
              excerpt={sup.node.excerpt}
              length={sup.node.length}
              width={sup.node.width}
              cutout={sup.node.cutout}
            />
            </>
          ))
        }
      </div>

      <Footer />
    </>
  );
};

export default supBrandView;

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
