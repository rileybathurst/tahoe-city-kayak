import * as React from "react"
import { Link, useStaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";
import More from "../../components/more";
import Danger from "../../components/danger";
import SupBrandList from "../../components/sup-brand-list";
import Store from "../../components/locations/store";
import Retail from "../../content/retail";
import PaddleboardFeatureList from "../../components/paddleboard-feature-list";
import Card from "../../components/card";

function Brand(props) {
  return (
    <div key={props.brand.slug}>
      <section className="passage">
        <div className='brand-logo'>
          <Danger svg={props.brand.svg} />
          <h2 className='capitalize'>
            <Link to={props.brand.slug}>
              {props.brand.name}
            </Link>
          </h2>
        </div>
        <p>{props.brand.tagline}.</p>
        <hr />
      </section>
      <Limiter brand={props.brand.retail} />
      <More
        retail={props.brand.retail}
        brand={props.brand.name}
        slug={props.brand.slug}
        type='sup'
      />
    </div>
  )
}

// TODO: ? is this a fancier way than the kayak page does this?
function Limiter(props) {
  // console.log(props);
  // console.log(props.brand);
  // console.log(props.brand.map(retail) => retail.brand);

  const sups = [];
  const quad = [];

  props.brand.map((retail => {
    if (retail.type === 'sup') {

      // create an array and add the things here
      // then do the card thing
      // console.log(retail.title);
      sups.push(retail);
    }
  }));

  // console.log(sups);
  sups.slice(0, 4).map((retail => {
    // console.log(retail.title);
    quad.push(retail);
  }));

  // console.log(quad.length);
  // console.log(quad[0]);

  // get this out enough to return it?

  return (
    <div className='deck'>
      {quad.map((retail) => {
        return (
          <Card retail={retail} />
        )
      })}
    </div>
  )
}

const RetailSupPage = () => {

  const query = useStaticQuery(graphql`
query SupQuery {
  hobie: allStrapiBrand(filter: {name: {eq: "hobie"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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

  bote: allStrapiBrand(filter: {name: {eq: "bote"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
  
  tahe: allStrapiBrand(filter: {name: {eq: "tahe"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
  
  sic: allStrapiBrand(filter: {name: {eq: "sic"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
  
  hala: allStrapiBrand(filter: {name: {eq: "hala"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
  
  boardworks: allStrapiBrand(filter: {name: {eq: "boardworks"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
  
  pauhana: allStrapiBrand(filter: {name: {eq: "pauhana"}}) {

      nodes {
        name
        slug
        tagline
        svg

        retail {
          type
          id
          title
          slug
          excerpt
          capacity
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
`)

  let hobie = query.hobie;
  let bote = query.bote;
  let tahe = query.tahe;
  let sic = query.sic;
  let hala = query.hala;
  let boardworks = query.boardworks;
  let pauhana = query.pauhana;

  // TODO: needs an unkown brand

  let title = "Paddleboard Retail";
  let parent = "retail";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>{title}</h1>
            <Retail />
          </div>
          <div className="location_card">
            <Store />

          </div>
        </div>

        <h2>Browse By Feature</h2>
        <PaddleboardFeatureList />

        <hr />
        <h2>Browse By Brand</h2>
      </main>
      <SupBrandList />

      <div className="brand_blocks">
        {hobie.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

        {bote.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

        {tahe.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

        {sic.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

        {hala.nodes.map(brand => (
          <Brand brand={brand} />
        ))}


        {boardworks.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

        {pauhana.nodes.map(brand => (
          <Brand brand={brand} />
        ))}

      </div>

      <Footer />
    </>
  )
}

export default RetailSupPage

export const Head = () => {
  return (
    <SEO
      title={`Standup Paddleboard | ${useSiteName()}`}
      description="Shop Tahoe City Kayak and Paddleboards’s selection of stand up paddleboards for sale! Our paddleboards are perfect for those looking for a fun and exciting way to explore Lake Tahoe’s crystal clear waters. Our selection includes leading brands of standup paddleboards for sale. The beach is just outside our back door, so you can walk your purchase right out to the sand and launch into the lake for a day’s journey."
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
          }]
        }
      `}
      </Script>

    </SEO>
  )
}
