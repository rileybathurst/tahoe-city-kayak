import * as React from "react"
import { StaticQuery, graphql, Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { TestimoialSEO } from "../../seo/testimonial";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";

const FaqPage = () => {
  let title = "Testimonials";
  let parent = "about";

  return (
    <>
      <Header />

      <ParentTitleBreadcrumb
        parent={parent}
        title={title}
      />

      <main>
        <h1>{title}</h1>

        <StaticQuery
          query={query}
          render={data => (
            <ul className="testimonials">
              {
                data.allStrapiTestimonial.edges.map(testimonial => (
                  <li key={testimonial.node.id} >
                    <h2>{testimonial.node.customer}</h2>
                    <p>{testimonial.node.testimonial}</p>
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
  );
}

export default FaqPage

export const Head = () => {
  return (
    <SEO
      title={`Testimonials - ${useSiteName()}`}
      description="Testimonials from our customers."
    // image={} // TODO
    >
      <TestimoialSEO />
      <Script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "About",
              "item": "${useSiteUrl()}/about"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Testimonials"
            }]
          }
        `}
      </Script>
    </SEO>
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