// ! this page is a mess i have a bunch of this stuff I need to import and not repeat

import * as React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

import Header from "../../components/header";
import Footer from "../../components/footer";
import PricingChart from "../../components/pricing-chart";
import Card from "../../components/card";
import Store from "../../components/locations/store";
import Composition from "../../components/composition";
import Phone from "../../components/phone";

// I dont understand this but it works
// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
// * Sets dont think array or objects are unique so we go with the old method
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

function KayakDemoBrands(props) {
  // console.log(props.brand);// brand={kayak.nodes.map(brand => (brand.brand))}
  const dedupedbrands = getUniqueListBy(props.brand, 'name')

  // console.log(dedupedbrands)

  return (
    <>
      {/* // TODO: add the logos here how we normally do the brands */}
      {dedupedbrands.map(brand => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/kayak/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  )
}

function SupDemoBrands(props) {
  const dedupedbrands = getUniqueListBy(props.brand, 'name')

  return (
    <>
      {dedupedbrands.map(brand => (
        <li key={brand.slug} className="capitalize">
          <Link to={`/retail/sup/${brand.slug}`}>{brand.name}</Link>
        </li>
      ))}
    </>
  )
}

const DemosPage = () => {

  const query = useStaticQuery(graphql`
    query DemosQuery {
      kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}, sort: {featured: ASC}) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type
          demo
          inflatable
          brand {
              slug
            }
            

          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }

          brand {
            name
            slug
          }
        }
      }
  
      paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}, sort: {featured: ASC}) {
        nodes {
          id
          title
          slug
          excerpt
          capacity
          length
          width
          type
          demo
          inflatable
          brand {
              slug
            }
            

          cutout {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            alternativeText
          }

          brand {
            name
            slug
          }
        }
      }
    }
  `)

  let kayak = query.kayak;
  let paddleboards = query.paddleboards;

  return (
    <>
      <Header />

      <main>
        <div className="location_card-wrapper">
          <div>
            <h1>Demos</h1>
            {/* // TODO: move to CMS */}
            <p>
              If you&apos;re looking to try out a particular kayak or board that we sell, call the shop and request a demo. We&apos;ll charge you our rental fee, but we will credit that fee if you decide to purchase a boat or board from us in the same season. (Up to two full days rental charge) * Pedal drive is an additional $5 per rental.
            </p>
            <p>
              <Phone />
            </p>
          </div>

          <div className="location_card">
            <Store />
          </div>
        </div>

        <PricingChart book={false} />
        <hr />
      </main>


      <section className="demo__kayak">
        <div className="demo__kayak--header passage">
          <div>
            <h3>Demos</h3>
            <hr />
            <h4>Kayaks from these brands</h4>
            <ul>
              <KayakDemoBrands
                brand={kayak.nodes.map(brand => (brand.brand))}
              />
            </ul>
          </div>

          <Composition sport="kayak" />
        </div>

        <section className="deck">
          {kayak.nodes.map(kayak => (
            <div key={kayak.id}>
              <Card retail={kayak} />
            </div>
          ))}
        </section>
      </section>

      <article className="main__full main__full--tour baseline-spacing">
        <div>
          <h4>Paddleboards from these brands</h4>

          <ul>
            <SupDemoBrands
              brand={paddleboards.nodes.map(brand => (brand.brand))}
            />
          </ul>
        </div>

        <Composition sport="sup" />
      </article>

      <section className="deck">
        {paddleboards.nodes.map(sup => (
          <div key={sup.id}>
            <Card retail={sup} />
          </div>
        ))}
      </section>

      <Footer />
    </>
  )
}

export default DemosPage

export const Head = () => {
  return (
    <SEO
      title={`Demos | ${useSiteMetadata().title}`}
      description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
    />
  )
}

