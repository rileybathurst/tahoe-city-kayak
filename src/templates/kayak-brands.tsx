// TODO add the stripes for individual series

import React from "react"
import { Link, graphql, Script } from 'gatsby'
import { SEO } from "../components/seo";
import { useSiteName } from '../hooks/use-site-name';
import { useSiteUrl } from "../hooks/use-site-url";
import scrollTo from 'gatsby-plugin-smoothscroll';

import Header from '../components/header';
import Footer from '../components/footer';
import Store from "../components/locations/store";
import Card from "../components/card";

function Kayak(props) {
  return (
    <div key={props.id}>
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
    mySet1.add(series.series);
  });

  if (props.list === 'true') {
    return (
      <>
        <h2>Series</h2>
        <ul className="series-list feature-list">
          {[...mySet1].map(series => (
            <li key={series}>
              {/* // TODO: why is this a different order than displayed on page */}
              {/* // TODO: make a set and thats the order maybe and add those as flex numbers? */}
              <button
                onClick={() => scrollTo(`#${series}`)}
                className="capitalize"
              >
                {series}</button>
            </li>
          ))}
        </ul >
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

      {/* // TODO: needs to be wider but not let the text get too long */}
      <main className="brand-page">
        <section>
          <div className="logo">
            <div
              dangerouslySetInnerHTML={{ __html: data.brand.svg }}
              className="logo-wrapper"
            />
            {/* // TODO: clean this up with the svg above */}
            <h1 className="capitalize">{data.brand.name}</h1>
          </div>
          <p>{data.brand.tagline}.</p>
          <hr />
          <Next
            series={data.brand.retail}
            list='true'
          />
        </section>

        {/* // * the wrapper is for the background color */}
        {/* // TODO: hover the whole card and give it a shadow when we do */}
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
              data.island.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        <section id='mirage' className="passage">
          <Next series={data.brand.retail} title="mirage" />

          <div className="deck">
            {
              data.mirage.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        <section id='inflatable' className="passage">
          <Next series={data.brand.retail} title="inflatable" />

          <div className="deck">
            {
              data.inflatable.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        <section id='performance' className="passage">
          <Next series={data.brand.retail} title="performance" />

          <div className="deck">
            {
              data.performance.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        <section id='recreational' className="passage">
          <Next series={data.brand.retail} title="recreational" />

          <div className="deck">
            {
              data.recreational.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        <section id='sit-on-top' className="passage">
          <Next series={data.brand.retail} title="sit-on-top" />

          <div className="deck">
            {
              data.sitontop.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
              ))
            }
          </div>
        </section>

        {/* //TODO: there needs to be more of a not in a series */}

        <section className="passage">
          <Next series={data.brand.retail} title="null" />

          <div className="deck">
            {
              data.null.nodes.map(kayak => (
                <div key={kayak.id}>
                  <Kayak
                    retail={kayak}
                  />
                </div>
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
    type
  }
}

  island: allStrapiRetail(
    filter: {
      brand: {slug: {eq: $slug}},
      type: {eq: "kayak"},
      series: {eq: "island"}
    }
  ) {
    
      nodes {
        id
        title
        slug
        excerpt
        length
        width
        capacity

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
  type: {eq: "kayak"},
  series: {eq: "mirage"}
}
) {
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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
  type: {eq: "kayak"},
  series: {eq: "inflatable"}
}
) {
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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

performance: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "performance"}
}
) {
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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

recreational: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "recreational"}
}
) {
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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

sitontop: allStrapiRetail(
filter: {
  brand: {slug: {eq: $slug}},
  type: {eq: "kayak"},
  series: {eq: "sit-on-top"}
}
) {
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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
  
  nodes {
    id
    title
    slug
    excerpt
    length
    width
    capacity

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
