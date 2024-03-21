import { graphql, useStaticQuery } from "gatsby";

export const useStrapiTopBar = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiTopbar {
        markdown {
          data {
            markdown
          }
        }
      }
    }
  `);

  return data.strapiTopbar.markdown.data.markdown;
};
