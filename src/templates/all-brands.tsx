// TODO add the retail content
// TODO add the stripes for individual series
// TODO document why this is different from sup brands and if i should combine them

import React from "react"
import { Link, graphql, useStaticQuery, Script } from 'gatsby'
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

function Kayak(props) {
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
        <Link to={`/retail/kayak/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h5><Remainder inches={props.length} /> long by {props.width}" wide</h5>
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
        <ul className="series-list feature-list">
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

const KayakBrandView = ({ data }) => {
  return (
    <>
      {data.brand.name}

      <Header />

      {/* // https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/ */}
      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs"
      >
        <ol>
          <li>
            <Link to="/retail">Retail</Link>&nbsp;/&nbsp;
          </li>

          <li>
            <Link to="/retail/kayak">Kayak</Link>&nbsp;/&nbsp;
          </li>

          <li aria-current="page">{data.brand.name}</li>
        </ol>
      </nav>

      <main className="location_card-wrapper">
        <div>
          <div className="brand-logo">
            <Danger svg={data.brand.svg} />
            {/* // TODO: clean this up with the svg above */}
            <h1 className="capitalize">{data.brand.name}</h1>
          </div>
          <p>{data.brand.tagline}.</p>
          <hr />
          <Next series={data.brand.retail} list='true' />
        </div>

        <div className="location_card">
          <Store />
        </div>

      </main>

      <section id='island'>
        <Next series={data.brand.retail} list='false' title="island" />
      </section>
      {/* this has to be here */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has */}
      <div className="deck">
        {
          data.island.edges.map(kayak => (
            <Kayak
              key={kayak.node.id}
              title={kayak.node.title}
              slug={kayak.node.slug}
              excerpt={kayak.node.excerpt}
              length={kayak.node.length}
              width={kayak.node.width}
              cutout={kayak.node.cutout}
            />
          ))
        }
      </div>

      <section id='mirage'>
        <Next series={data.brand.retail} title="mirage" />
      </section>
      <div className="deck">
        {
          data.mirage.edges.map(kayak => (
            <Kayak
              key={kayak.node.id}
              title={kayak.node.title}
              slug={kayak.node.slug}
              excerpt={kayak.node.excerpt}
              length={kayak.node.length}
              width={kayak.node.width}
              cutout={kayak.node.cutout}
            />
          ))
        }
      </div>

      <section id='inflatable'>
        <Next series={data.brand.retail} title="inflatable" />
      </section>
      <div className="deck">
        {
          data.inflatable.edges.map(kayak => (
            <Kayak
              key={kayak.node.id}
              title={kayak.node.title}
              slug={kayak.node.slug}
              excerpt={kayak.node.excerpt}
              length={kayak.node.length}
              width={kayak.node.width}
              cutout={kayak.node.cutout}
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
          data.null.edges.map(kayak => (
            <Kayak
              key={kayak.node.id}
              title={kayak.node.title}
              slug={kayak.node.slug}
              excerpt={kayak.node.excerpt}
              length={kayak.node.length}
              width={kayak.node.width}
              cutout={kayak.node.cutout}
            />
          ))
        }
      </div>

      <Footer />
    </>
  );
};

export default KayakBrandView;

export const Head = ({ data }) => {
  return (
    <SEO
      title={`${data.brand.name} Kayaks sold at ${useSiteName()}`}
      description={`${data.brand.name} kayaks ${data.brand.tagline}`}
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
            "name": "Kayak",
            "item": "${useSiteUrl()}/retail/kayak"
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

export const query = graphql`
  query AllBrandsTemplate(
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
      type: {eq: "kayak"},
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
    type: {eq: "kayak"},
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
    type: {eq: "kayak"},
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
      type: {eq: "kayak"},
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
