import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';
import { SEO } from "../../components/seo";
import TitleTemplate from "../../components/title-template";

import Header from "../../components/header";
import Footer from "../../components/footer";

const FaqPage = () => {
  let title = "Testimonials";
  let parent = "about";

  return (
    <>
      <Header />

      {/*       <Seo
        title={title}
        description="Testimonials from our customers"
      /> */}

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
          <Link to={`/${parent}`} itemProp="item">
            <span itemProp="name">{parent}</span>
            <meta itemProp="position" content="2" />
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
            <meta itemProp="position" content="3" />
          </span>
        </li>
      </ol>

      <main>
        <h1>{title}</h1>

        <StaticQuery
          query={query}
          render={data => (
            <ul>
              {
                data.allStrapiTestimonial.edges.map(testimonial => (
                  <li key={testimonial.node.id} itemProp="review" itemScope itemType="https://schema.org/Review">
                    <h2 itemProp="author">{testimonial.node.customer}</h2>
                    <p itemProp="reviewBody">{testimonial.node.testimonial}</p>
                    <p>{testimonial.node.sign}</p>
                    <p>{testimonial.node.location}</p>
                    <hr />
                  </li>
                ))
              }
            </ul>
          )}
        />
      </main>

      <Footer />
    </>
  )
}

export default FaqPage

export const Head = () => {
  return (
    <SEO
      title={`Testimonials${TitleTemplate}`}
      description="Our mission at Tahoe City Kayak is to provide you with unparalleled customer service. We strive to give you the best in kayak and padddleboard sales, rentals and tours."
    />
  )
}

const query = graphql`
query TestimonialQuery {
  allStrapiTestimonial {
    edges {
      node {
        id
        testimonial
        customer
        sign
        location
      }
    }
  }
}
`