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

function Others(props) {

  // console.log(props.nodes);
  let any = [];

  props.nodes.forEach(element => {

    // console.log(element.retail);
    element.retail.forEach(retail => {
      if (retail.type === 'sup') {
        any.push(retail);

        // console.log(retail);
        // console.log(any)
      };
    });
  });

  // console.log(any);

  if (any.length !== 0) {
    return (
      <div>
        <section className="passage">
          <h2>
            Additional Paddleboards
          </h2>
          <hr />
        </section >
        <div className='deck'>
          {any.map((retail) => {
            return (
              <div key={retail.id}>
                <Card retail={retail} />
              </div>
            )
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function Brand(props) {

  // console.log(props.brand.slug)

  return (
    <>
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

      {/* // * both below might have react key issues */}
      <Limiter brand={props.brand.retail} />
      <More
        retail={props.brand.retail}
        brand={props.brand.name}
        slug={props.brand.slug}
        type='sup'
      />
    </>
  )
}

// TODO: ? is this a fancier way than the kayak page does this?
function Limiter(props) {
  // Im trying to make a set of 4 cards from the props.brand.retail array
  // using foreach to remove the react key issues


  // console.log(props);
  // console.log(props.brand);
  // console.log(props.brand.map(retail) => retail.brand);

  // set a couple of empty arrays
  // all the sups
  const sups = [];

  // only the first 4
  const quad = [];

  // I wonder if this should be a map or a forEach
  /*   props.brand.map((retail => {
      // console.log(retail);
      if (retail.type === 'sup') {
  
        // create an array and add the things here
        // then do the card thing
        // console.log(retail.title);
        sups.push(retail);
      }
    })); */

  props.brand.forEach(retail => {
    if (retail.type === 'sup') {
      // console.log(retail.title);
      sups.push(retail);
    }
  });

  // console.log(sups);
  /*   sups.slice(0, 4).map((retail => {
      // console.log(retail.title);
      quad.push(retail);
    })); */

  sups.slice(0, 4).forEach(retail => {
    quad.push(retail);
  });

  // console.log(quad.length);
  // console.log(quad[0]);

  // get this out enough to return it?

  return (
    <div className='deck'>
      {quad.map((retail) => {
        {/* // * this is weird it needs a nested return */ }
        return (
          <div key={retail.id}>
            <Card retail={retail} />
          </div>
        )
      })}

      {/*       {quad.map((retail) => {
        <Card retail={retail} />
      })} */}
    </div>
  )
}

const RetailSupPage = () => {

  const query = useStaticQuery(graphql`

      # let others = [ "hobie", "bote", "tahe", "sic", "hala", "boardworks", "pau hana" ];


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
  
      pauhana: allStrapiBrand(filter: {name: {eq: "pau hana"}}) {
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

      # let others = [ "hobie", "bote", "tahe", "sic", "hala", "boardworks", "pauhana" ];

      other: allStrapiBrand(filter: {name: {nin: [ "hobie", "bote", "tahe", "sic", "hala", "boardworks", "pau hana" ] }}) {
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
  let other = query.other;

  // TODO: needs an unkown brand

  let title = "Paddleboard Retail";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent="retail"
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
          <div key={brand.slug} >
            {/* // * wrap this for react keys */}
            {/* // {brand.slug} testing */}
            < Brand brand={brand} />
          </div>
        ))}

        {bote.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}

        {tahe.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}


        {sic.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}

        {hala.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}


        {boardworks.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}

        {pauhana.nodes.map(brand => (
          <div key={brand.slug}>
            <Brand brand={brand} />
          </div>
        ))}

        <Others nodes={other.nodes} />

      </div >

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
