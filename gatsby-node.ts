// TODO: https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/#gatsby-nodets

// import { Brand, Retail } from "./types"; // Import the Brand and Retail types

import * as path from "node:path";
// Log out information after a build is done
type reporterType = {
  reporter: {
    info: (msg: string) => void;
  };
};

exports.onPostBuild = ({ reporter }: reporterType) => {
  reporter.info("Your Gatsby site has been built!");
};

// Create blog pages dynamically
import type { GatsbyGraphQLQueryFn } from "gatsby";
import type { Actions } from "gatsby";

type createPagesType = {
  // graphql: GraphqlQueryFn;
  graphql: any;
  actions: Actions;
};
exports.createPages = async ({ graphql, actions }: createPagesType) => {
  const { createPage } = actions;

  // Retail Pages
  const retailPageTemplate = path.resolve("src/templates/retail.tsx");
  const retailResult = await graphql(`
    query {
      allStrapiRetail {
        nodes {
          slug
          sport {
            slug
          }

          brand {
            slug
          }
        }
      }
    }
  `);

  for (const retail of retailResult.data.allStrapiRetail.nodes) {
    const { sport, slug, brand } = retail;
    createPage({
      path: `/retail/${sport.slug}/${brand.slug}/${slug}`,
      component: retailPageTemplate,
      context: {
        slug,
        sport: sport.slug,
        brand: brand.slug,
      },
    });
  }

  // Brands
  const BrandsTemplate = path.resolve("src/templates/brands.tsx");
  const brandsResult = await graphql(`
    query {
      allStrapiBrand {
        nodes {
          slug
          retail {
            series

            sport {
              slug
            }

            brand {
              slug
            }
          }
        }
      }

      allStrapiSport {
        nodes {
          slug
        }
      }
    }
  `);

  for (const sport of brandsResult.data.allStrapiSport.nodes) {
    const sportSet = new Set();
    for (const brand of brandsResult.data.allStrapiBrand.nodes) {
      for (const retail of brand.retail) {
        if (retail.sport.slug === sport.slug) {
          sportSet.add(retail.brand.slug);
        }
      }
    }

    for (const brand of sportSet) {
      createPage({
        path: `retail/${sport.slug}/${brand}`,
        component: BrandsTemplate,
        context: {
          slug: brand,
          sport: sport.slug,
        },
      });
    }

    // Create Attributes Dynamically
    // * these have to be differnt templates as you can't throw blanks or boths at graphql boolean filters
    const attributeResult = await graphql(`
      query {
        allStrapiAttribute {
          nodes {
            slug
            name
          }
        }

        allStrapiSport {
          nodes {
            slug
          }
        }
      }
    `);

    for (const sport of attributeResult.data.allStrapiSport.nodes) {
      for (const attribute of attributeResult.data.allStrapiAttribute.nodes) {
        const { slug, name } = attribute;

        if (slug === "tandem") {
          createPage({
            path: `/retail/attribute/${sport.slug}/${slug}`,
            component: path.resolve("src/templates/crew.tsx"),
            context: {
              name,
              crew: slug,
              sport: sport.slug,
            },
          });
        }

        if (slug === "inflatable" || slug === "rigid") {
          createPage({
            path: `/retail/attribute/${sport.slug}/${slug}`,
            component: path.resolve("src/templates/inflatable.tsx"),
            context: {
              name,
              sport: sport.slug,
              // this is a comparison not a set
              inflatable: slug === "inflatable",
            },
          });
        }

        /* if (slug === "ultralight" || slug === "ultralight-tandem") {
          createPage({
            path: `/retail/attribute/${sport.slug}/${slug}`,
            component: path.resolve("src/templates/weight.tsx"),
            context: {
              slug,
              weight: slug === "ultralight" ? 46 : 70,
              crew: slug === "ultralight" ? "single" : "tandem",
              sport: sport.slug,
            },
          });
        } */

        if (slug === "pedal") {
          // * this is grabbing the whole hobie brand
          createPage({
            path: `/retail/attribute/${sport.slug}/${slug}`,
            component: path.resolve("src/templates/pedal.tsx"),
            context: {
              slug,
              sport: sport.slug,
            },
          });
        }
      }
    }
  }

  const getStrapiTour = await graphql(`
    query {
      allStrapiTour(filter: { local: { slug: { eq: "tahoe-city" } } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  for (const { node } of getStrapiTour.data.allStrapiTour.edges) {
    createPage({
      path: `/tours-lessons/${node.slug}`,
      component: path.resolve("src/views/tour-view.tsx"),
      context: {
        slug: node.slug,
      },
    });
  }

  const getStrapiTeam = await graphql(`
    query {
      allStrapiTeam(
        filter: { local: { elemMatch: { slug: { eq: "tahoe-city" } } } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  for (const { node } of getStrapiTeam.data.allStrapiTeam.edges) {
    createPage({
      path: `/about/team/${node.slug}`,
      component: path.resolve("src/views/team-view.tsx"),
      context: {
        slug: node.slug,
      },
    });
  }
};
