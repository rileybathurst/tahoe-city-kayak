// TODO add the stripes for individual series

import React from "react"
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

function Kayak(props) {
  return (
    <article className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <Link to={`/retail/kayak/${props.slug}`} className="image-link">
          <GatsbyImage
            image={props?.cutout?.localFile?.childImageSharp?.gatsbyImageData}
            alt={props?.cutout?.alternativeText}
            objectFit="contain"
            className="cutout"
          />
        </Link>
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

  // hobie has a series of inflatable, mirage, performance, island
  // eddyline has a series of performance, recreational, sit-on-top

  return (
    <>
      <Header />

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

      <div className="series">
        {/* // TODO moving the query up would be nicer to be able to stripe things */}
        {/* im sure i saw something about this using hidden as a base prop maybe on codepen */}
        <section id='island' className="passage">
          <Next series={data.brand.retail} list='false' title="island" />

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
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        <section id='mirage' className="passage">
          <Next series={data.brand.retail} title="mirage" />

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
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        <section id='inflatable' className="passage">
          <Next series={data.brand.retail} title="inflatable" />

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
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        <section id='performance' className="passage">
          <Next series={data.brand.retail} title="performance" />

          <div className="deck">
            {
              data.performance.edges.map(kayak => (
                <Kayak
                  key={kayak.node.id}
                  title={kayak.node.title}
                  slug={kayak.node.slug}
                  excerpt={kayak.node.excerpt}
                  length={kayak.node.length}
                  width={kayak.node.width}
                  cutout={kayak.node.cutout}
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        <section id='recreational' className="passage">
          <Next series={data.brand.retail} title="recreational" />

          <div className="deck">
            {
              data.recreational.edges.map(kayak => (
                <Kayak
                  key={kayak.node.id}
                  title={kayak.node.title}
                  slug={kayak.node.slug}
                  excerpt={kayak.node.excerpt}
                  length={kayak.node.length}
                  width={kayak.node.width}
                  cutout={kayak.node.cutout}
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        <section id='sit-on-top' className="passage">
          <Next series={data.brand.retail} title="sit-on-top" />

          <div className="deck">
            {
              data.sitontop.edges.map(kayak => (
                <Kayak
                  key={kayak.node.id}
                  title={kayak.node.title}
                  slug={kayak.node.slug}
                  excerpt={kayak.node.excerpt}
                  length={kayak.node.length}
                  width={kayak.node.width}
                  cutout={kayak.node.cutout}
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>

        {/* //TODO: there needs to be more of a not in a series */}

        <section className="passage">
          <Next series={data.brand.retail} title="null" />

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
                  hullweight={kayak.node.hullweight}
                />
              ))
            }
          </div>
        </section>
      </div>

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


      <Footer />
    </>
  );
};

export default KayakBrandView;


export const query = graphql`
query (
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

performance: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "performance"}
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

recreational: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "recreational"}
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

sitontop: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "sit-on-top"}
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
    type: {eq: "kayak"},
    series: {nin: [
      "island",
      "mirage",
      "inflatable",
      "performance",
      "recreational",
      "sit-on-top"
      ]}
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
