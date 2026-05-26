import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Header from "../../components/header";
import Footer from "../../components/footer";
import { PaddleCard, type PaddleTourCardTypes } from "@rileybathurst/paddle";
import { SEO } from "../../components/seo";
import ReactMarkdown from "react-markdown";

function TourCatchAll({ params }: { params: { name: string } }) {
  const data = useStaticQuery(graphql`
    query TourCatchAllQuery {
      allStrapiTour(filter: {
        branch: {slug: {eq: "tahoe-city"}}
      },
      sort: {order: ASC},
      ){
        nodes {
          ...CardTourFragment
        }
      }

      strapiBranch(slug: {eq: "tahoe-city"}) {
        peek_tours
        ...BookNowFragment
      }

      strapiError {
        ...errorFragment
      }
    }
  `);

  return (
    <React.Fragment>
      <Header />
      <main>
        <h2>
          <Link to="/tours-lessons">Tours &amp; Lessons</Link> / {params.name}
        </h2>

        <h1>{data.strapiError.title}</h1>
        <ReactMarkdown>
          {data.strapiError.description.data.description}
        </ReactMarkdown>

        <hr />
      </main>

      <section className="deck">
        {data.allStrapiTour.nodes.map((tour: PaddleTourCardTypes) => (
          <PaddleCard
            key={tour.id}
            {...tour}
            link={`/tours-lessons/${tour.link}`}
            paddleBookNow={{
              peek_base: data.strapiBranch.peek_base,
              strapiBranchName: data.strapiBranch.name,
              specificLink: tour.peek,
            }}
          />
        ))}
      </section>

      <Footer topHR />
    </React.Fragment>
  );
}

export default TourCatchAll;

export const Head = () => {
  return (
    <SEO
      title="Tours 404"
    />
  );
}
