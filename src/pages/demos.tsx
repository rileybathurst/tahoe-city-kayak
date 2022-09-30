import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../components/header";
import Footer from "../components/footer";
import PricingChart from "../components/pricing-chart";
import Seo from "../components/seo";
import TextureBackgrounds from "../components/texturebackgrounds";
import Remainder from "../components/remainder";
import Store from "../components/locations/store";

function Card(props) {
  return (
    <article key={props.id} className="card">
      <div className="card-collage">
        <TextureBackgrounds />
        <GatsbyImage
          image={props.cutout?.localFile?.childImageSharp?.gatsbyImageData}
          alt={props?.cutout?.alternativeText}
          className="cutout"
        />
      </div>
      <h4 className="card__title">
        <Link to={`/retail/${props.type}/${props.slug}`}>
          {props.title}
        </Link>
      </h4>
      <hr />
      <p>{props.excerpt}</p>
      <hr />
      <div className="card__details">
        <h4><Remainder inches={props.length} /> long by {props.width}" wide</h4>
        <h5 className="capitalize">Capacity {props.capacity}lbs</h5>
      </div>
    </article>
  )
}

const DemosPage = () => {
  let title = "Demos";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Enjoy the majesty of Lake Tahoe while kayaking in one of our high-end demo rentals."
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
          <span itemProp="item">
            <span
              itemProp="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemProp="position" content="2" />
          </span>
        </li>
      </ol>

      <main>
        <div className="div__with_location_card">
          <div>
            <h1>{title}</h1>
            <p>If you&rsquo;re looking to try out a particular kayak or board that we sell, call the shop and request a demo.  We&rsquo;ll charge you our rental fee, but we will credit that fee if you decide to purchase a boat or board from us in the same season. &#x28;Up to two full days rental charge&#x29;</p>
            {/* // TODO: this can be by a boolean */}
            <p>* Pedal drive is an additional $5 per rental.</p>
            <p>Phone:&nbsp;
              <a href="phone:(530) 581-4336" rel="norel norefferer" className="book-now">
                (530) 581-4336
              </a>
            </p>
          </div>

          <div className="location_card">
            <Store />
          </div>
        </div>

        <PricingChart />
        <hr />
      </main>

      {
        <StaticQuery
          query={query}
          render={data => (
            <>

              <article>
                <h3>Demos</h3>
                <hr />
                <h4>Kayak</h4>
              </article>

              <section className="deck">
                {
                  data.kayak.edges.map(retail => (
                    <Card
                      id={retail.node.id}
                      slug={retail.node.slug}
                      title={retail.node.title}
                      capacity={retail.node.capacity}
                      length={retail.node.length}
                      width={retail.node.width}
                      excerpt={retail.node.excerpt}
                      cutout={retail.node?.cutout}
                      type={retail.node.type}
                    />
                  ))
                }
              </section>

              <article>
                <h4>Paddleboards</h4>
              </article>

              <section className="deck">
                {
                  data.paddleboards.edges.map(retail => (
                    <Card
                      id={retail.node.id}
                      slug={retail.node.slug}
                      title={retail.node.title}
                      capacity={retail.node.capacity}
                      length={retail.node.length}
                      width={retail.node.width}
                      excerpt={retail.node.excerpt}
                      cutout={retail.node?.cutout}
                      type={retail.node.type}
                    />
                  ))
                }
              </section>
            </>
          )}
        />
      }


      <Footer />
    </>
  )
}

export default DemosPage

const query = graphql`
query DemosQuery {
  kayak: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "kayak"}}) {
    edges {
      node {
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
  }
  
  paddleboards: allStrapiRetail(filter: {demo: {eq: true}, type: {eq: "sup"}}) {
    edges {
      node {
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
  }
}
`