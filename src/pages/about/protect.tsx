import * as React from "react"
import { Link, graphql, } from 'gatsby';
import type { PaddleGatsbyImageType } from "@rileybathurst/paddle";
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from 'react-aria-components';
import ReactMarkdown from 'react-markdown';
import Hero from "../../components/hero";

type ProtectPageTypes = {
  data: {
    strapiProtect: {
      title: string,
      details: {
        data: {
          details: string
        }
      },
      hero: PaddleGatsbyImageType;
      excerpt: string
    }
  }
}
const ProtectPage = ({ data }: ProtectPageTypes) => {

  return (
    <React.Fragment>
      <Header />

      <Hero
        image={data.strapiProtect.hero}
      />

      <main className="pelican">
        <h1>{data.strapiProtect.title}</h1>
        <ReactMarkdown>
          {data.strapiProtect.details.data.details}
        </ReactMarkdown>
      </main>

      <Breadcrumbs>
        <Breadcrumb><Link to="/about/">About</Link></Breadcrumb>
        <Breadcrumb>Protect Lake Tahoe</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </React.Fragment>
  )
}

export default ProtectPage

export const Head = ({ data }: ProtectPageTypes) => {

  return (
    <SEO
      title='Protect Lake Tahoe'
      description={data.strapiProtect.excerpt}
      breadcrumbs={[
        {
          name: "About",
          item: "about"
        },
        {
          name: 'Protect Lake Tahoe',
          item: 'about/protect'
        }
      ]}
    />
  )
}

export const query = graphql`
  query ProtectQuery {
    strapiProtect {
      title
      details {
        data {
          details
        }
      }
      hero {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        alternativeText
      }
      excerpt
    }
  }
`