import { Brand, Retail } from "./types"; // Import the Brand and Retail types

const path = require("path");
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info("Your Gatsby site has been built!");
};

// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create retail pages dynamically
  const retailPageTemplate = path.resolve("src/templates/retail.tsx");

  // console.log("Creating Retail Pages");

  const retailResult = await graphql(`
    query {
      allStrapiRetail {
        nodes {
          slug
          type

          brand {
            slug
          }
        }
      }
    }
  `);

  for (const retail of retailResult.data.allStrapiRetail.nodes) {
    const { type, slug, brand } = retail;
    createPage({
      path: `/retail/${type}/${brand.slug}/${slug}`,
      component: retailPageTemplate,
      context: {
        slug,
        type,
        brand: brand.slug,
      },
    });
  }

  const BrandsTemplate = path.resolve("src/templates/brands.tsx");
  const brandsResult = await graphql(`
    query {
      allStrapiBrand {
        nodes {
          slug
          retail {
            series
            type
            brand {
              slug
            }
          }
        }
      }
    }
  `);

  const kayakSet = new Set();
  for (const brand of brandsResult.data.allStrapiBrand.nodes) {
    for (const retail of brand.retail) {
      if (retail.type === "kayak") {
        kayakSet.add(retail.brand.slug);
      }
    }
  }

  // this creates the kayak brands
  for (const brand of kayakSet) {
    createPage({
      path: `retail/kayak/${brand}`,
      component: BrandsTemplate,
      context: {
        slug: brand,
        type: "kayak",
      },
    });
  }

  // this creates the sup brands
  const supSet = new Set();
  for (const brand of brandsResult.data.allStrapiBrand.nodes) {
    for (const retail of brand.retail) {
      if (retail.type === "sup") {
        supSet.add(retail.brand.slug);
      }
    }
  }

  // this creates the kayak brands
  // console.log(supSet);

  for (const brand of supSet) {
    createPage({
      path: `/retail/sup/${brand}`,
      component: BrandsTemplate,
      context: {
        slug: brand,
        type: "sup",
      },
    });
  }

  // Create Attributes Dynamically
  // these have to be differnt templates as you can't throw blanks or boths at graphql boolean filters
  const CrewTemplate = path.resolve("src/templates/crew.tsx");
  const InflatableTemplate = path.resolve("src/templates/inflatable.tsx");
  const WeightTemplate = path.resolve("src/templates/weight.tsx");
  const PedalTemplate = path.resolve("src/templates/pedal.tsx");

  const attributeResult = await graphql(`
    query {
      allStrapiAttribute {
        nodes {
          slug
          name
          type
        }
      }
    }
  `);

  for (const attribute of attributeResult.data.allStrapiAttribute.nodes) {
    const { slug, type, name } = attribute;
    if (slug === "tandem") {
      createPage({
        path: `/retail/attribute/${type}/${slug}`,
        component: CrewTemplate,
        context: {
          name,
          type,
          slug,
        },
      });
    }

    if (slug === "inflatable" || slug === "rigid") {
      createPage({
        path: `/retail/attribute/${type}/${slug}`,
        component: InflatableTemplate,
        context: {
          name,
          type,
          inflatable: slug === "inflatable",
        },
      });
    }

    if (slug === "ultralight" || slug === "ultralight-tandem") {
      createPage({
        path: `/retail/attribute/${type}/${slug}`,
        component: WeightTemplate,
        context: {
          slug,
          type,
          weight: slug === "ultralight" ? 46 : 70,
          crew: slug === "ultralight" ? "single" : "tandem",
        },
      });
    }

    if (slug === "pedal") {
      // * this is grabbing the whole hobie brand
      createPage({
        path: `/retail/attribute/${type}/${slug}`,
        component: PedalTemplate,
        context: {
          slug,
          type,
        },
      });
    }
  }

  const getStrapiTour = await graphql(`
    query {
      allStrapiTour(filter: { locale: { slug: { eq: "tahoe-city" } } }) {
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
};
