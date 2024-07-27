import * as React from "react";
import { Link, graphql } from "gatsby";

export const { strapiTeam } = graphql`
  query TeamViewQuery($slug: String!) {
    strapiTeam(
      slug: { eq: $slug },
      locales: {elemMatch: {slug: {eq: "tahoe-city"}}}
      ) {
      id
      name
    }
  }
`

const TourView = ({ data }) => {

  return (
    <>
      {/* <Header /> */}

      <main className="albatross wrap">
        <h1>{data.strapiTeam.name}</h1>

      </main>
      {/* <Footer /> */}
    </>
  );
};

export default TourView;

/* export const Head = ({ data }) => {
  return (
    <SEO
      title={data.strapiTour.name}
      description={data.strapiTour.excerpt}
    breadcrumbs={[
            { name: "Tours & Lessons", path: "/tours-lessons" },
            { name: data.strapiTour.name, path: `/tours-lessons/${data.strapiTour.slug}` }
          ]}
    />
  );
} */