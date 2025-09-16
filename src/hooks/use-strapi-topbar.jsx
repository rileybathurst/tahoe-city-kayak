// I should probably use this as an event when opening dates
import { graphql, useStaticQuery } from "gatsby";

export const useStrapiTopBar = () => {
  const { strapiBranch } = useStaticQuery(graphql`
    query {
      strapiBranch(slug: { eq: "tahoe-city" }) {
        topbar {
          data {
            topbar
          }
        }
      }
    }
  `);

  return strapiBranch.topbar.data.topbar;
};
