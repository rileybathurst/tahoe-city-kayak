// I should probably use this as an event when opening dates
import { graphql, useStaticQuery } from "gatsby";

export const useStrapiTopBar = () => {
  const { strapiLocale } = useStaticQuery(graphql`
    query {
      strapiLocale(slug: { eq: "tahoe-city" }) {
        topbar {
          data
        }
      }
    }
  `);

  return strapiLocale.topbar.data;
};
