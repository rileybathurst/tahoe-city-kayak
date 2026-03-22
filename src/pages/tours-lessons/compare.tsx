import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { SEO } from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Breadcrumbs, Breadcrumb } from "react-aria-components";

import { PaddleCompare } from "@rileybathurst/paddle";

const ComparePage = () => {
  const data = useStaticQuery(graphql`
    query TourCompareQuery {
      allStrapiTour(
        filter: {branch: {slug: {eq: "tahoe-city"}}}
        sort: {order: ASC}
      ) {
      nodes {
        id
        fitness
        slug
        start
        sport
        peek
        price
        name
        minimum
        finish
        excerpt
        duration

        compositionImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 400
              )
            }
          }
        }

        branch {
          name
        }
      }
    }

    strapiBranch(slug: {eq: "tahoe-city"}) {
      name
      peek_base
    }
  }
`);

  return (
    <>
      <Header />

      <main className="pelican">
        <h1>Compare</h1>
        <PaddleCompare
          tours={data.allStrapiTour.nodes}
          breadcrumb="tours-lessons"
          strapiBranchName={data.strapiBranch.name}
          peek_base={data.strapiBranch.peek_base}
        />
      </main>

      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/tours-lessons/">Tours &amp; Lessons</Link>
        </Breadcrumb>
        <Breadcrumb>Compare</Breadcrumb>
      </Breadcrumbs>

      <Footer />
    </>
  );
};

export default ComparePage;

export const Head = () => {
  return (
    <SEO
      title="Compare Tours"
      // TODO description and image
      breadcrumbs={[
        { name: "Tours & Lessons", item: "tours-lessons" },
        { name: "Compare", item: "tours-lessons/compare" },
      ]}
    />
  );
};
