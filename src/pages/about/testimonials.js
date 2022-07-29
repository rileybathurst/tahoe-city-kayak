import * as React from "react"
import { Link, StaticQuery, graphql } from 'gatsby';

import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";

const FaqPage = () => {
  let title = "Testimonials";
  let parent = "about";

  return (
    <>
      <Header />

      <Seo
        title={title}
        description="Testimonials from our customers"
      />

      <ol
        aria-label="Breadcrumb"
        className="breadcrumbs"
        itemscope
        itemtype="https://schema.org/BreadcrumbList"
      >
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to="/" itemprop="item">
            <span itemprop="name">Home</span>
            <meta itemprop="position" content="1" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <Link to={`/${parent}`} itemprop="item">
            <span itemprop="name">{parent}</span>
            <meta itemprop="position" content="2" />
          </Link>&nbsp;/&nbsp;
        </li>

        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <span itemprop="item">
            <span
              itemprop="name"
              aria-current="page"
            >
              {title}
            </span>
            <meta itemprop="position" content="3" />
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
                  <li key={testimonial.node.id} itemprop="review" itemscope itemtype="https://schema.org/Review">
                    <h2 itemprop="author">{testimonial.node.customer}</h2>
                    <p itemprop="reviewBody">{testimonial.node.testimonial}</p>
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