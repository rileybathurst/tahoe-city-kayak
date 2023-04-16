import * as React from "react"
import { Script } from 'gatsby';
import { SEO } from "../../components/seo";
import { useSiteName } from '../../hooks/use-site-name';
import { useSiteUrl } from "../../hooks/use-site-url";
import ParentTitleBreadcrumb from "../../components/parent-title-breadcrumb";
import Header from "../../components/header";
import Footer from "../../components/footer";

const JobsPage = () => {
  let title = "Jobs";
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

        <article>
          // TODO
        </article>

      </main>
      <Footer />
    </>
  )
}

export default JobsPage

export const Head = () => {
  return (
    <SEO
      title={`Jobs | ${useSiteName()}`}
      description="“Are you looking for a job in kayaking or paddleboarding? Look no further than Tahoe City Kayak & Paddleboard! We’re currently hiring for several positions, including kayak rental staff, paddleboard instructors, and more. Apply today and join our team!"
    >
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
              "name": "Jobs"
            }]
          }
        `}
      </Script>
    </SEO>
  )
}
