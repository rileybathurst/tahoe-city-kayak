// TODO add the retail content

import React from "react"
import { Link, graphql, Script } from 'gatsby'
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';
import { useSiteUrl } from "../hooks/use-site-url";

import Header from '../components/header';
import Footer from '../components/footer';
import Store from "../components/locations/store";
import Card from "../components/card";
import Danger from "../components/danger";

function Sup(props) {
  return (
    <div key={props.retail.id}>
      <Card retail={props.retail} />
    </div>
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
          data.island.nodes.map(sup => (
            <Sup
              retail={sup}
            />
          ))
        }
      </div>

      {/* // ? why has this got an extra className */}
      <section id='mirage' className="possibly-empty passage">
        <Next series={data.brand.retail} title="mirage" />
      </section>
      <div className="deck">
        {
          data.mirage.nodes.map(sup => (
            <Sup
              retail={sup}
            />
          ))
        }
      </div>

      <section id='inflatable' className="possibly-empty">
        <Next series={data.brand.retail} title="inflatable" />
      </section>
      <div className="deck">
        {
          data.inflatable.nodes.map(sup => (
            <Sup
              retail={sup}
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
          data.null.nodes.map(sup => (
            <Sup
              retail={sup}
            />
          ))
        }
      </div>

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
            "name": "Standup Paddleboard",
            "item": "${useSiteUrl()}/retail/sup"
          },{
            "@type": "ListItem",
            "position": 3,
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
    },
    sort: {featured: ASC}
  ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        hullweight
        capacity
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

  mirage: allStrapiRetail(
  filter: {
    brand: {slug: {eq: $slug}},
    type: {eq: "sup"},
    series: {eq: "mirage"}
  },
  sort: {featured: ASC}
  ) {
    nodes {
      id
      title
      slug
      excerpt
      length
      width
      hullweight
      capacity
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
  
inflatable: allStrapiRetail(
  filter: {
    brand: {slug: {eq: $slug}},
    type: {eq: "sup"},
    series: {eq: "inflatable"}
  },
  sort: {featured: ASC}
  ) {
    nodes {
      id
      title
      slug
      excerpt
      length
      width
      hullweight
      capacity
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

  null: allStrapiRetail(
    filter: {
      brand: {slug: {eq: $slug}},
      type: {eq: "sup"},
      series: {nin: ["island", "mirage", "inflatable"]}
    },
    sort: {featured: ASC}
  ) {
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        hullweight
        capacity
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
  `;
